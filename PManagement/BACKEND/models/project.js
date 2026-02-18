const mongoose = require('mongoose');

// You named it 'projectSchema' (lowercase p)
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// So you MUST use 'projectSchema' here as well (lowercase p)
module.exports = mongoose.model('Project', projectSchema);