const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  questionid: { type: Number, ref: 'Question', required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sharesReceived: { type: Map, of: String, default: {} },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Request', requestSchema);
