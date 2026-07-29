// src/services/auditLog.service.js
'use strict';

/**
 * Record "who changed what" for any entity. Always call inside the
 * same prisma.$transaction as the change itself so the audit trail
 * can never drift from reality.
 *
 * @param {import('@prisma/client').Prisma.TransactionClient} tx
 */
async function record(tx, { actorId, action, entityType, entityId, before, after, ipAddress, userAgent }) {
  return tx.auditLog.create({
    data: { actorId, action, entityType, entityId, before, after, ipAddress, userAgent },
  });
}

module.exports = { record };
