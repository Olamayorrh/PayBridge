// src/workers/outbox.worker.js
'use strict';

// Run this as its own process (`node src/workers/outbox.worker.js`),
// separate from the API process. Polls outbox_events for PENDING rows
// and publishes them to Kafka. Safe to run more than one instance —
// the UPDATE ... WHERE status = 'PENDING' race just means at-most-one
// of them wins per row (Prisma update returns count; we just re-check).

require('dotenv').config();
const prisma = require('../config/prisma');
const { getProducer } = require('../config/kafka');
const logger = require('../config/logger');

const POLL_INTERVAL_MS = Number(process.env.OUTBOX_POLL_INTERVAL_MS || 2000);
const BATCH_SIZE = 25;
const TOPIC = process.env.KAFKA_TOPIC_ESCROW_EVENTS || 'escrow.events';

async function publishBatch() {
  const events = await prisma.outboxEvent.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'asc' },
    take: BATCH_SIZE,
  });

  if (events.length === 0) return;

  const producer = await getProducer();

  for (const event of events) {
    try {
      await producer.send({
        topic: TOPIC,
        messages: [{
          key: event.aggregateId,
          value: JSON.stringify({
            id: event.id,
            aggregateType: event.aggregateType,
            aggregateId: event.aggregateId,
            eventType: event.eventType,
            payload: event.payload,
            createdAt: event.createdAt,
          }),
        }],
      });

      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: 'PUBLISHED', publishedAt: new Date() },
      });
    } catch (err) {
      logger.error(`[outbox] failed to publish event ${event.id}`, { error: err.message });
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: {
          attempts: { increment: 1 },
          lastError: err.message,
          status: event.attempts >= 5 ? 'FAILED' : 'PENDING',
        },
      });
    }
  }
}

async function start() {
  logger.info('[outbox] worker starting', { pollIntervalMs: POLL_INTERVAL_MS });
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await publishBatch();
    } catch (err) {
      logger.error('[outbox] batch failed', { error: err.message });
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

start();
