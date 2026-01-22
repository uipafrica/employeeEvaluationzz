const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  referenceNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  employeeName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  supervisorName: {
    type: String,
    required: true
  },
  reviewPeriodFrom: {
    type: Date,
    required: true
  },
  reviewPeriodTo: {
    type: Date,
    required: true
  },
  employeeEmail: {
    type: String,
    required: true
  },
  performanceRatings: {
    qualityOfWork: { type: Number, required: true, min: 1, max: 5 },
    attendancePunctuality: { type: Number, required: true, min: 1, max: 5 },
    reliability: { type: Number, required: true, min: 1, max: 5 },
    communicationSkills: { type: Number, required: true, min: 1, max: 5 },
    decisionMaking: { type: Number, required: true, min: 1, max: 5 },
    initiativeFlexibility: { type: Number, required: true, min: 1, max: 5 },
    cooperationTeamwork: { type: Number, required: true, min: 1, max: 5 },
    knowledgeOfPosition: { type: Number, required: true, min: 1, max: 5 },
    technicalSkills: { type: Number, required: true, min: 1, max: 5 },
    innovation: { type: Number, required: true, min: 1, max: 5 },
    trainingDevelopment: { type: Number, required: true, min: 1, max: 5 }
  },
  overallPerformanceComments: {
    type: String,
    default: ''
  },
  supervisorComments: {
    type: String,
    default: ''
  },
  employeeComments: {
    type: String,
    default: ''
  },
  acknowledged: {
    type: Boolean,
    default: false
  },
  signatureName: {
    type: String,
    default: ''
  },
  signatureTimestamp: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

evaluationSchema.index({ employeeName: 'text', department: 'text' });

module.exports = mongoose.model('Evaluation', evaluationSchema);

