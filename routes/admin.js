const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation');

// Get all evaluations with optional search
router.get('/evaluations', async (req, res) => {
  try {
    const { employeeName, department, reviewPeriodFrom, reviewPeriodTo, search } = req.query;
    
    let query = {};

    // Search by employee name
    if (employeeName) {
      query.employeeName = { $regex: employeeName, $options: 'i' };
    }

    // Search by department
    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }

    // Search by review period
    if (reviewPeriodFrom || reviewPeriodTo) {
      if (reviewPeriodFrom) {
        query.reviewPeriodFrom = { $gte: new Date(reviewPeriodFrom) };
      }
      if (reviewPeriodTo) {
        query.reviewPeriodTo = { $lte: new Date(reviewPeriodTo) };
      }
    }

    // General text search
    if (search) {
      query.$or = [
        { employeeName: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { referenceNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const evaluations = await Evaluation.find(query)
      .sort({ createdAt: -1 })
      .select('-token'); // Don't send token to admin

    res.json({
      success: true,
      count: evaluations.length,
      data: evaluations
    });
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching evaluations',
      error: error.message 
    });
  }
});

// Get single evaluation by ID
router.get('/evaluations/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id).select('-token');
    
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

// Note: PDF generation is now handled on the client side using react-pdf
// This endpoint is kept for backward compatibility but is no longer used

module.exports = router;

