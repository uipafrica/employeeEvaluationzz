const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Evaluation = require('../models/Evaluation');
const crypto = require('crypto');
const { sendEvaluationEmail } = require('../utils/emailService');

// Generate unique reference number
function generateReferenceNumber() {
  const prefix = 'EVAL';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// Generate secure token
function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Create evaluation
router.post('/create', [
  body('employeeName').trim().notEmpty().withMessage('Employee name is required'),
  body('jobTitle').trim().notEmpty().withMessage('Job title is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('supervisorName').trim().notEmpty().withMessage('Supervisor name is required'),
  body('reviewPeriodFrom').isISO8601().withMessage('Valid review period from date is required'),
  body('reviewPeriodTo').isISO8601().withMessage('Valid review period to date is required'),
  body('employeeEmail').isEmail().withMessage('Valid employee email is required'),
  body('performanceRatings.qualityOfWork').isInt({ min: 1, max: 5 }).withMessage('Quality of Work rating must be between 1 and 5'),
  body('performanceRatings.attendancePunctuality').isInt({ min: 1, max: 5 }).withMessage('Attendance & Punctuality rating must be between 1 and 5'),
  body('performanceRatings.reliability').isInt({ min: 1, max: 5 }).withMessage('Reliability rating must be between 1 and 5'),
  body('performanceRatings.communicationSkills').isInt({ min: 1, max: 5 }).withMessage('Communication Skills rating must be between 1 and 5'),
  body('performanceRatings.decisionMaking').isInt({ min: 1, max: 5 }).withMessage('Decision Making rating must be between 1 and 5'),
  body('performanceRatings.initiativeFlexibility').isInt({ min: 1, max: 5 }).withMessage('Initiative & Flexibility rating must be between 1 and 5'),
  body('performanceRatings.cooperationTeamwork').isInt({ min: 1, max: 5 }).withMessage('Cooperation & Teamwork rating must be between 1 and 5'),
  body('performanceRatings.knowledgeOfPosition').isInt({ min: 1, max: 5 }).withMessage('Knowledge of Position rating must be between 1 and 5'),
  body('performanceRatings.technicalSkills').isInt({ min: 1, max: 5 }).withMessage('Technical Skills rating must be between 1 and 5'),
  body('performanceRatings.innovation').isInt({ min: 1, max: 5 }).withMessage('Innovation rating must be between 1 and 5'),
  body('performanceRatings.trainingDevelopment').isInt({ min: 1, max: 5 }).withMessage('Training & Development rating must be between 1 and 5'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const referenceNumber = generateReferenceNumber();
    const token = generateSecureToken();

    const evaluation = new Evaluation({
      ...req.body,
      referenceNumber,
      token,
      reviewPeriodFrom: new Date(req.body.reviewPeriodFrom),
      reviewPeriodTo: new Date(req.body.reviewPeriodTo)
    });

    await evaluation.save();


    // Send email to employee
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const evaluationLink = `${frontendUrl}/evaluation/${token}`;

    try {
      await sendEvaluationEmail(req.body.employeeEmail, evaluationLink, referenceNumber);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - evaluation is saved
    }

    res.status(201).json({
      success: true,
      message: 'Evaluation created successfully',
      data: {
        referenceNumber: evaluation.referenceNumber,
        id: evaluation._id
      }
    });
  } catch (error) {
    console.error('Error creating evaluation:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating evaluation',
      error: error.message
    });
  }
});

// Get evaluation by token (for employee view)
router.get('/token/:token', async (req, res) => {
  try {
    const evaluation = await Evaluation.findOne({ token: req.params.token });

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: 'Evaluation not found'
      });
    }

    res.json({
      success: true,
      data: evaluation
    });
  } catch (error) {
    console.error('Error fetching evaluation:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching evaluation',
      error: error.message
    });
  }
});

// Employee acknowledgment
router.post('/acknowledge/:token', [
  body('employeeComments').optional().isString(),
  body('signatureName').trim().notEmpty().withMessage('Signature name is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const evaluation = await Evaluation.findOne({ token: req.params.token });

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: 'Evaluation not found'
      });
    }

    if (evaluation.acknowledged) {
      return res.status(400).json({
        success: false,
        message: 'Evaluation has already been acknowledged'
      });
    }

    evaluation.employeeComments = req.body.employeeComments || '';
    evaluation.signatureName = req.body.signatureName;
    evaluation.signatureTimestamp = new Date();
    evaluation.acknowledged = true;
    evaluation.updatedAt = new Date();

    await evaluation.save();

    res.json({
      success: true,
      message: 'Evaluation acknowledged successfully',
      data: evaluation
    });
  } catch (error) {
    console.error('Error acknowledging evaluation:', error);
    res.status(500).json({
      success: false,
      message: 'Error acknowledging evaluation',
      error: error.message
    });
  }
});

module.exports = router;

