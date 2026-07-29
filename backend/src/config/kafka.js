// src/config/kafka.js
'use strict';

const { Kafka, logLevel } = require('kafkajs');
const logger = require('./logger');

const kafka = new Kafka({
  clientId: 'escrow-api',
  brokers: (process.env.KAFKA_BROKER || 'localhost:9092').split(','),
  logLevel: logLevel.ERROR,
  retry: { initialRetryTime: 300, retries: 8 },
});

const producer = kafka.producer();
let isConnected = false;

async function getProducer() {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    logger.info('[kafka] producer connected');
  }
  return producer;
}

module.exports = { kafka, getProducer };
