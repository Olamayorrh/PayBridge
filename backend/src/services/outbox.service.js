// src/services/outbox.service.js
'use strict';

// Transactional Outbox pattern.
//
// PROBLEM: writing to the DB and then calling kafka.produce() are two
// separate operations. If the process crashes between them, or Kafka
// is briefly unreachable, you either lose the event or (if you retry
// blindly) publish it twice with no way to tell.
//
// FIX: write the event as a row in the SAME database transaction as
// the business change (escrow funded, transaction settled, etc). A
// separate, small poller/worker (see outbox.worker.js) reads PENDING
// rows and publishes them to Kafka, marking each PUBLISHED once acked.
// This guarantees "at least once" delivery without ever losing events.

/**
 * @param {import('@prisma/client').Prisma.TransactionClient} tx - must be
 *   the transaction client passed into prisma.$transaction(async (tx) => {})
 * @param {{ aggregateType: string, aggregateId: string, eventType: string, payload: object }} event
 */
async function recordEvent(tx, { aggregateType, aggregateId, eventType, payload }) {
  return tx.outboxEvent.create({
    data: { aggregateType, aggregateId, eventType, payload },
  });
}

module.exports = { recordEvent };
