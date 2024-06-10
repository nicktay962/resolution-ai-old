const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  isRepetitive: { type: Boolean, required: true },
  frequencyUnit: { type: String, required: false },
  frequencyValue: { type: Number, required: false },
  specificDays: { type: [String], required: false },
  isSequential: { type: Boolean, required: true },
  order: { type: Number, required: false }
}, {
  timestamps: true,
});

const programSchema = new Schema({
  goal: { type: String, required: true },
  price: { type: Number, required: true },
  timeToComplete: { type: Number, required: true },
  timeUnit: { type: String, required: true },
  activities: [activitySchema]
}, {
  timestamps: true,
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
