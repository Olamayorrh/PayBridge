export const transactionStatuses = {
  INVOICE_CREATED: 'Invoice Created',
  PAYMENT_PENDING: 'Payment Pending',
  PAYMENT_COMPLETED: 'Payment Completed',
  FUNDS_IN_ESCROW: 'Funds in Escrow',
  IN_TRANSIT: 'In Transit',
  DELIVERED_PENDING_CONFIRMATION: 'Awaiting Confirmation',
  DELIVERED_VERIFIED: 'Delivery Verified',
  FUNDS_RELEASED: 'Funds Released',
  DISPUTED: 'Disputed',
  REFUNDED: 'Refunded',
  CANCELLED: 'Cancelled',
};

export const disputeStatuses = {
  OPEN: 'Open',
  UNDER_REVIEW: 'Under Review',
  MORE_EVIDENCE_NEEDED: 'More Evidence Needed',
  RESOLVED: 'Resolved',
  REFUNDED: 'Refunded',
  RELEASED_TO_SELLER: 'Released to Seller',
};

export function formatNaira(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

const baseTimeline = [
  {
    label: 'Invoice Created',
    description: 'The seller created a PayBridge invoice.',
    timestamp: '20 Jun, 10:32 AM',
    state: 'completed',
  },
  {
    label: 'Payment Completed',
    description: 'Your card payment was confirmed.',
    timestamp: '20 Jun, 10:45 AM',
    state: 'completed',
  },
  {
    label: 'Funds in Escrow',
    description: 'PayBridge is holding the funds until delivery is confirmed.',
    timestamp: '20 Jun, 10:46 AM',
    state: 'completed',
  },
  {
    label: 'In Transit',
    description: 'The seller marked the item as dispatched.',
    timestamp: '21 Jun, 3:20 PM',
    state: 'active',
  },
  {
    label: 'Delivered',
    description: 'Delivery proof and buyer confirmation are pending.',
    timestamp: 'Pending',
    state: 'pending',
  },
  {
    label: 'Delivery Verified',
    description: 'Buyer confirms that the item was received and checked.',
    timestamp: 'Pending',
    state: 'pending',
  },
  {
    label: 'Funds Released',
    description: 'Funds are released to the seller after confirmation.',
    timestamp: 'Pending',
    state: 'pending',
  },
];

export const buyerTransactions = [
  {
    id: 'PB-INV-20491',
    title: 'iPhone 13 Pro',
    seller: 'Daniel Stores',
    amount: 420000,
    escrowFee: 10500,
    totalPaid: 430500,
    status: 'IN_TRANSIT',
    dateCreated: '20 Jun 2026',
    nextStep: 'Track delivery proof',
    paymentMethod: 'Card',
    deliveryMethod: 'Dispatch Rider',
    feeModel: 'Buyer pays fee',
    sellerReceives: 420000,
    platformFee: 10500,
    timeline: baseTimeline,
    proof: {
      deliveryPhoto: 'Uploaded',
      note: 'Item dispatched through GIG Logistics.',
      timestamp: '21 Jun, 3:20 PM',
      otpStatus: 'Pending',
      gpsLocation: 'Ikeja, Lagos',
      signature: 'Not signed yet',
    },
    sellerInfo: {
      verification: 'Verified Seller',
      completedTransactions: 82,
      trustScore: '92%',
      responseRate: 'Fast',
    },
  },
  {
    id: 'PB-INV-20931',
    title: 'Nike Sneakers',
    seller: 'Kicks Plug',
    amount: 85000,
    escrowFee: 2100,
    totalPaid: 87100,
    status: 'DISPUTED',
    dateCreated: '22 Jun 2026',
    nextStep: 'Waiting for admin review',
    paymentMethod: 'Bank Transfer',
    deliveryMethod: 'Courier Pickup',
    feeModel: 'Split fee',
    sellerReceives: 83950,
    platformFee: 2100,
    timeline: baseTimeline.map((item, index) =>
      index < 4 ? { ...item, state: 'completed' } : { ...item, state: 'pending' }
    ),
    proof: {
      deliveryPhoto: 'Not uploaded',
      note: 'Buyer reported that delivery proof is incorrect.',
      timestamp: 'Pending',
      otpStatus: 'Not verified',
      gpsLocation: 'Unavailable',
      signature: 'Unavailable',
    },
    sellerInfo: {
      verification: 'Verified Seller',
      completedTransactions: 41,
      trustScore: '84%',
      responseRate: 'Average',
    },
  },
  {
    id: 'PB-INV-21004',
    title: 'Office Chair',
    seller: 'StyleHub NG',
    amount: 65000,
    escrowFee: 1600,
    totalPaid: 66600,
    status: 'DELIVERED_PENDING_CONFIRMATION',
    dateCreated: '24 Jun 2026',
    nextStep: 'Confirm delivery',
    paymentMethod: 'Card',
    deliveryMethod: 'Doorstep Delivery',
    feeModel: 'Seller pays fee',
    sellerReceives: 63400,
    platformFee: 1600,
    timeline: baseTimeline.map((item, index) =>
      index < 5 ? { ...item, state: 'completed' } : { ...item, state: index === 5 ? 'active' : 'pending' }
    ),
    proof: {
      deliveryPhoto: 'Uploaded',
      note: 'Delivered by internal dispatch team.',
      timestamp: '25 Jun, 12:05 PM',
      otpStatus: 'Pending',
      gpsLocation: 'Lekki Phase 1, Lagos',
      signature: 'Uploaded',
    },
    sellerInfo: {
      verification: 'Verified Seller',
      completedTransactions: 120,
      trustScore: '96%',
      responseRate: 'Fast',
    },
  },
  {
    id: 'PB-INV-21112',
    title: 'MacBook Pro 2020',
    seller: 'TechHub Lagos',
    amount: 760000,
    escrowFee: 19000,
    totalPaid: 779000,
    status: 'PAYMENT_PENDING',
    dateCreated: '25 Jun 2026',
    nextStep: 'Pay invoice',
    paymentMethod: 'Pending',
    deliveryMethod: 'Pickup',
    feeModel: 'Buyer pays fee',
    sellerReceives: 760000,
    platformFee: 19000,
    timeline: baseTimeline.map((item, index) =>
      index === 0 ? { ...item, state: 'completed' } : { ...item, state: index === 1 ? 'active' : 'pending' }
    ),
    proof: {
      deliveryPhoto: 'Pending',
      note: 'Delivery starts after payment confirmation.',
      timestamp: 'Pending',
      otpStatus: 'Pending',
      gpsLocation: 'Pending',
      signature: 'Pending',
    },
    sellerInfo: {
      verification: 'Verified Seller',
      completedTransactions: 66,
      trustScore: '90%',
      responseRate: 'Fast',
    },
  },
  {
    id: 'PB-INV-21225',
    title: 'Generator Repair Service',
    seller: 'Gadget Arena',
    amount: 95000,
    escrowFee: 2400,
    totalPaid: 97400,
    status: 'FUNDS_RELEASED',
    dateCreated: '12 Jun 2026',
    nextStep: 'Download receipt',
    paymentMethod: 'Card',
    deliveryMethod: 'Service Visit',
    feeModel: 'Buyer pays fee',
    sellerReceives: 95000,
    platformFee: 2400,
    timeline: baseTimeline.map((item) => ({ ...item, state: 'completed' })),
    proof: {
      deliveryPhoto: 'Uploaded',
      note: 'Service completed and verified by buyer.',
      timestamp: '13 Jun, 4:10 PM',
      otpStatus: 'Verified',
      gpsLocation: 'Yaba, Lagos',
      signature: 'Uploaded',
    },
    sellerInfo: {
      verification: 'Verified Seller',
      completedTransactions: 38,
      trustScore: '88%',
      responseRate: 'Average',
    },
  },
];

export const buyerDisputes = [
  {
    id: 'DSP-1029',
    title: 'Item not delivered',
    transactionId: 'PB-INV-20931',
    transactionTitle: 'Nike Sneakers',
    seller: 'Kicks Plug',
    amount: 85000,
    reason: 'Item not delivered',
    status: 'UNDER_REVIEW',
    dateOpened: '22 Jun 2026',
    lastUpdated: '24 Jun 2026',
    nextAction: 'Waiting for admin review',
    preferredResolution: 'Refund me',
    adminDecision: 'Pending Review',
    explanation: 'The seller uploaded a delivery proof that does not match my address.',
    timeline: [
      { label: 'Dispute Created', description: 'Buyer opened a dispute.', timestamp: '22 Jun, 5:30 PM', state: 'completed' },
      { label: 'Evidence Submitted', description: 'Screenshots and chat receipts were added.', timestamp: '22 Jun, 5:44 PM', state: 'completed' },
      { label: 'Seller Response Received', description: 'Seller replied with courier receipt.', timestamp: '23 Jun, 9:12 AM', state: 'completed' },
      { label: 'Admin Review Started', description: 'PayBridge support is reviewing both sides.', timestamp: '24 Jun, 11:00 AM', state: 'active' },
      { label: 'Decision Made', description: 'Final decision will appear here.', timestamp: 'Pending', state: 'pending' },
    ],
    evidence: {
      buyer: ['Chat screenshot', 'Payment receipt', 'Address confirmation'],
      seller: ['Courier receipt'],
      admin: 'Review in progress',
    },
  },
  {
    id: 'DSP-1030',
    title: 'Wrong item received',
    transactionId: 'PB-INV-21004',
    transactionTitle: 'Office Chair',
    seller: 'StyleHub NG',
    amount: 65000,
    reason: 'Wrong item received',
    status: 'MORE_EVIDENCE_NEEDED',
    dateOpened: '25 Jun 2026',
    lastUpdated: '26 Jun 2026',
    nextAction: 'Add photo evidence',
    preferredResolution: 'Replace item',
    adminDecision: 'More Evidence Required',
    explanation: 'The delivered chair color and size are different from the invoice.',
    timeline: [
      { label: 'Dispute Created', description: 'Buyer opened a dispute.', timestamp: '25 Jun, 1:05 PM', state: 'completed' },
      { label: 'Evidence Submitted', description: 'Buyer added initial complaint details.', timestamp: '25 Jun, 1:18 PM', state: 'completed' },
      { label: 'Admin Review Started', description: 'Support requested clearer product photos.', timestamp: '26 Jun, 10:15 AM', state: 'active' },
      { label: 'Decision Made', description: 'Final decision will appear here.', timestamp: 'Pending', state: 'pending' },
    ],
    evidence: {
      buyer: ['Invoice screenshot'],
      seller: ['Dispatch note'],
      admin: 'Upload product photos and packaging image.',
    },
  },
  {
    id: 'DSP-1017',
    title: 'Refund approved',
    transactionId: 'PB-INV-19824',
    transactionTitle: 'Bluetooth Speaker',
    seller: 'Gadget Arena',
    amount: 42000,
    reason: 'Item damaged',
    status: 'REFUNDED',
    dateOpened: '03 Jun 2026',
    lastUpdated: '07 Jun 2026',
    nextAction: 'Refund processed',
    preferredResolution: 'Refund me',
    adminDecision: 'Refund Approved',
    explanation: 'Item arrived damaged and seller accepted the return.',
    timeline: [
      { label: 'Dispute Created', description: 'Buyer opened a dispute.', timestamp: '03 Jun, 9:30 AM', state: 'completed' },
      { label: 'Evidence Submitted', description: 'Damage photos uploaded.', timestamp: '03 Jun, 9:45 AM', state: 'completed' },
      { label: 'Admin Review Started', description: 'Support reviewed the evidence.', timestamp: '04 Jun, 2:00 PM', state: 'completed' },
      { label: 'Decision Made', description: 'Refund was approved.', timestamp: '06 Jun, 4:20 PM', state: 'completed' },
      { label: 'Refund Processed', description: 'Refund sent to original payment method.', timestamp: '07 Jun, 12:10 PM', state: 'completed' },
    ],
    evidence: {
      buyer: ['Damage photo', 'Receipt'],
      seller: ['Return approval'],
      admin: 'Refund approved and processed.',
    },
  },
];

export const buyerSettings = {
  profile: {
    fullName: 'Stephanie Obi',
    email: 'example52@gmail.com',
    phone: '+234 812 345 6789',
    defaultLocation: 'Lagos, Nigeria',
  },
  verification: [
    {
      title: 'Email Verification',
      status: 'Verified',
      description: 'Your email address has been confirmed.',
      action: 'Manage',
    },
    {
      title: 'Phone Verification',
      status: 'Verified',
      description: 'Your phone number is available for payment alerts.',
      action: 'Manage',
    },
    {
      title: 'Identity Verification',
      status: 'Not Started',
      description: 'Identity verification will increase account trust limits.',
      action: 'Start',
    },
  ],
  notifications: [
    { label: 'Payment updates', email: true, sms: true, push: true },
    { label: 'Delivery updates', email: true, sms: false, push: true },
    { label: 'Dispute updates', email: true, sms: true, push: true },
    { label: 'Security alerts', email: true, sms: true, push: false },
    { label: 'Promotional updates', email: false, sms: false, push: false },
  ],
};

export function getBuyerTransactions() {
  return buyerTransactions;
}

export function getBuyerTransactionById(id) {
  return buyerTransactions.find((transaction) => transaction.id === id);
}

export function getBuyerDisputes() {
  return buyerDisputes;
}

export function getBuyerDisputeById(id) {
  return buyerDisputes.find((dispute) => dispute.id === id);
}

export function getBuyerSettings() {
  return buyerSettings;
}
