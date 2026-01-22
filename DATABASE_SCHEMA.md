# MongoDB Database Schema

## Evaluation Collection

### Document Structure

```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated ID
  referenceNumber: String,           // Unique reference number (e.g., "EVAL-XXXXX-XXXX")
  token: String,                     // Secure random token for employee access
  employeeName: String,              // Required
  jobTitle: String,                  // Required
  department: String,                // Required
  supervisorName: String,            // Required
  reviewPeriodFrom: Date,            // Required
  reviewPeriodTo: Date,              // Required
  employeeEmail: String,             // Required, validated as email
  performanceRatings: {
    qualityOfWork: Number,           // 1-5, required
    attendancePunctuality: Number,   // 1-5, required
    reliability: Number,             // 1-5, required
    communicationSkills: Number,      // 1-5, required
    decisionMaking: Number,          // 1-5, required
    initiativeFlexibility: Number,    // 1-5, required
    cooperationTeamwork: Number,     // 1-5, required
    knowledgeOfPosition: Number,     // 1-5, required
    technicalSkills: Number,         // 1-5, required
    innovation: Number,              // 1-5, required
    trainingDevelopment: Number      // 1-5, required
  },
  overallPerformanceComments: String,  // Optional
  supervisorComments: String,          // Optional
  employeeComments: String,            // Optional, added by employee
  acknowledged: Boolean,               // Default: false
  signatureName: String,               // Employee's name for acknowledgment
  signatureTimestamp: Date,            // Timestamp when acknowledged
  createdAt: Date,                     // Auto-generated on creation
  updatedAt: Date                      // Auto-updated on modification
}
```

### Indexes

1. **referenceNumber**: Unique index for fast lookup by reference number
2. **token**: Unique index for secure employee access
3. **Text Index**: On `employeeName` and `department` fields for search functionality

### Validation Rules

- All performance ratings must be integers between 1 and 5
- `referenceNumber` and `token` must be unique
- `employeeEmail` must be a valid email format
- `reviewPeriodFrom` must be before or equal to `reviewPeriodTo`
- Once `acknowledged` is true, the evaluation cannot be modified

### Example Document

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  referenceNumber: "EVAL-LXK9M2-A3B7",
  token: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
  employeeName: "John Doe",
  jobTitle: "Software Engineer",
  department: "IT",
  supervisorName: "Jane Smith",
  reviewPeriodFrom: ISODate("2024-01-01T00:00:00Z"),
  reviewPeriodTo: ISODate("2024-12-31T23:59:59Z"),
  employeeEmail: "john.doe@company.com",
  performanceRatings: {
    qualityOfWork: 4,
    attendancePunctuality: 5,
    reliability: 4,
    communicationSkills: 4,
    decisionMaking: 3,
    initiativeFlexibility: 4,
    cooperationTeamwork: 5,
    knowledgeOfPosition: 4,
    technicalSkills: 5,
    innovation: 3,
    trainingDevelopment: 4
  },
  overallPerformanceComments: "Excellent performance throughout the year.",
  supervisorComments: "John has shown great improvement in technical skills.",
  employeeComments: "Thank you for the feedback. I will continue to improve.",
  acknowledged: true,
  signatureName: "John Doe",
  signatureTimestamp: ISODate("2024-12-15T10:30:00Z"),
  createdAt: ISODate("2024-12-10T08:00:00Z"),
  updatedAt: ISODate("2024-12-15T10:30:00Z")
}
```

