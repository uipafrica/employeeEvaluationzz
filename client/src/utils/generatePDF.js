import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import logoImage from '../assets/logo.png';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#800020',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
  },
  value: {
    width: '60%',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderBottomStyle: 'solid',
  },
  ratingLabel: {
    width: '70%',
  },
  ratingValue: {
    width: '30%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  comments: {
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    minHeight: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#800020',
  },
  logo: {
    width: 80,
    height: 60,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#800020',
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#666',
  },
});

// PDF Document Component
const EvaluationPDF = ({ evaluation }) => {
  const performanceCriteria = [
    { key: 'qualityOfWork', label: 'Quality of Work' },
    { key: 'attendancePunctuality', label: 'Attendance & Punctuality' },
    { key: 'reliability', label: 'Reliability' },
    { key: 'communicationSkills', label: 'Communication Skills' },
    { key: 'decisionMaking', label: 'Decision Making' },
    { key: 'initiativeFlexibility', label: 'Initiative & Flexibility' },
    { key: 'cooperationTeamwork', label: 'Cooperation & Teamwork' },
    { key: 'knowledgeOfPosition', label: 'Knowledge of Position' },
    { key: 'technicalSkills', label: 'Technical Skills' },
    { key: 'innovation', label: 'Innovation' },
    { key: 'trainingDevelopment', label: 'Training & Development' },
  ];

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src={logoImage}
          />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              Urban Infrastructure Projects Africa
            </Text>
            <Text style={styles.headerSubtitle}>
              UIPA-QA-R-ADM-4-024 Employee Evaluation Form
            </Text>
          </View>
        </View>

        {/* Employee Information */}
        <Text style={styles.sectionTitle}>Employee Information</Text>
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Employee Name:</Text>
            <Text style={styles.value}>{evaluation.employeeName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Job Title:</Text>
            <Text style={styles.value}>{evaluation.jobTitle}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.value}>{evaluation.department}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Supervisor Name:</Text>
            <Text style={styles.value}>{evaluation.supervisorName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Review Period:</Text>
            <Text style={styles.value}>
              {formatDate(evaluation.reviewPeriodFrom)} to{' '}
              {formatDate(evaluation.reviewPeriodTo)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Employee Email:</Text>
            <Text style={styles.value}>{evaluation.employeeEmail}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reference Number:</Text>
            <Text style={styles.value}>{evaluation.referenceNumber}</Text>
          </View>
        </View>

        {/* Performance Ratings */}
        <Text style={styles.sectionTitle}>Performance Ratings (1-5 Scale)</Text>
        <View>
          {performanceCriteria.map((criterion) => (
            <View key={criterion.key} style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>{criterion.label}:</Text>
              <Text style={styles.ratingValue}>
                {evaluation.performanceRatings[criterion.key]}
              </Text>
            </View>
          ))}
        </View>

        {/* Comments */}
        <Text style={styles.sectionTitle}>Comments</Text>
        
        {(evaluation.overallPerformanceComments || evaluation.supervisorComments || evaluation.employeeComments) ? (
          <>
            {evaluation.overallPerformanceComments && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                  Overall Performance Comments:
                </Text>
                <View style={styles.comments}>
                  <Text>{evaluation.overallPerformanceComments}</Text>
                </View>
              </View>
            )}

            {evaluation.supervisorComments && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                  Supervisor Comments:
                </Text>
                <View style={styles.comments}>
                  <Text>{evaluation.supervisorComments}</Text>
                </View>
              </View>
            )}

            {evaluation.employeeComments && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                  Employee Comments:
                </Text>
                <View style={styles.comments}>
                  <Text>{evaluation.employeeComments}</Text>
                </View>
              </View>
            )}
          </>
        ) : (
          <Text style={{ fontStyle: 'italic', color: '#666' }}>No comments provided.</Text>
        )}

        {/* Acknowledgment */}
        <Text style={styles.sectionTitle}>Acknowledgment</Text>
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Acknowledged:</Text>
            <Text style={styles.value}>
              {evaluation.acknowledged ? 'Yes' : 'No'}
            </Text>
          </View>
          {evaluation.acknowledged && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Signature Name:</Text>
                <Text style={styles.value}>{evaluation.signatureName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Signature Date:</Text>
                <Text style={styles.value}>
                  {formatDateTime(evaluation.signatureTimestamp)}
                </Text>
              </View>
            </>
          )}
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

// Function to generate and download PDF
export const generateEvaluationPDF = async (evaluation) => {
  try {
    // Generate PDF with logo
    const blob = await pdf(<EvaluationPDF evaluation={evaluation} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evaluation-${evaluation.referenceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

