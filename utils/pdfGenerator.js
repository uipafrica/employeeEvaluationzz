const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generatePDF(evaluation) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]); // US Letter size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let yPosition = 750;
  const leftMargin = 50;
  const rightMargin = 562;
  const lineHeight = 20;
  const sectionSpacing = 15;

  // Helper function to add text
  const addText = (text, x, y, size = 10, isBold = false, targetPage = null) => {
    const currentPage = targetPage || page;
    currentPage.drawText(text, {
      x,
      y,
      size,
      font: isBold ? boldFont : font,
    });
  };

  // Helper function to add wrapped text
  const addWrappedText = (text, x, y, maxWidth, size = 10, targetPage = null) => {
    if (!text || text.trim().length === 0) {
      return y;
    }

    const words = text.split(' ');
    let line = '';
    let currentY = y;
    const currentPage = targetPage || page;

    for (const word of words) {
      const testLine = line + word + ' ';
      const width = font.widthOfTextAtSize(testLine, size);

      if (width > maxWidth && line.length > 0) {
        addText(line.trim(), x, currentY, size, false, currentPage);
        line = word + ' ';
        currentY -= lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line.trim().length > 0) {
      addText(line.trim(), x, currentY, size, false, currentPage);
    }
    return currentY - lineHeight;
  };

  // Title
  addText('UIPA-QA-R-ADM-4-024 Employee Evaluation Form', leftMargin, yPosition, 16, true);
  yPosition -= 30;

  // Employee Information Section
  addText('Employee Information', leftMargin, yPosition, 12, true);
  yPosition -= lineHeight;

  addText(`Employee Name: ${evaluation.employeeName}`, leftMargin, yPosition);
  yPosition -= lineHeight;

  addText(`Job Title: ${evaluation.jobTitle}`, leftMargin, yPosition);
  yPosition -= lineHeight;

  addText(`Department: ${evaluation.department}`, leftMargin, yPosition);
  yPosition -= lineHeight;

  addText(`Supervisor Name: ${evaluation.supervisorName}`, leftMargin, yPosition);
  yPosition -= lineHeight;

  const fromDate = new Date(evaluation.reviewPeriodFrom).toLocaleDateString();
  const toDate = new Date(evaluation.reviewPeriodTo).toLocaleDateString();
  addText(`Review Period: ${fromDate} to ${toDate}`, leftMargin, yPosition);
  yPosition -= lineHeight;

  addText(`Employee Email: ${evaluation.employeeEmail}`, leftMargin, yPosition);
  yPosition -= lineHeight;

  addText(`Reference Number: ${evaluation.referenceNumber}`, leftMargin, yPosition);
  yPosition -= sectionSpacing * 2;

  // Performance Ratings Section
  addText('Performance Ratings (1-5 Scale)', leftMargin, yPosition, 12, true);
  yPosition -= lineHeight;

  const ratings = [
    { label: 'Quality of Work', value: evaluation.performanceRatings.qualityOfWork },
    { label: 'Attendance & Punctuality', value: evaluation.performanceRatings.attendancePunctuality },
    { label: 'Reliability', value: evaluation.performanceRatings.reliability },
    { label: 'Communication Skills', value: evaluation.performanceRatings.communicationSkills },
    { label: 'Decision Making', value: evaluation.performanceRatings.decisionMaking },
    { label: 'Initiative & Flexibility', value: evaluation.performanceRatings.initiativeFlexibility },
    { label: 'Cooperation & Teamwork', value: evaluation.performanceRatings.cooperationTeamwork },
    { label: 'Knowledge of Position', value: evaluation.performanceRatings.knowledgeOfPosition },
    { label: 'Technical Skills', value: evaluation.performanceRatings.technicalSkills },
    { label: 'Innovation', value: evaluation.performanceRatings.innovation },
    { label: 'Training & Development', value: evaluation.performanceRatings.trainingDevelopment },
  ];

  ratings.forEach(rating => {
    if (yPosition < 100) {
      // Add new page if needed
      page = pdfDoc.addPage([612, 792]);
      yPosition = 750;
    }
    addText(`${rating.label}:`, leftMargin, yPosition);
    addText(rating.value.toString(), rightMargin - 20, yPosition);
    yPosition -= lineHeight;
  });

  yPosition -= sectionSpacing;

  // Comments Section
  if (yPosition < 200) {
    page = pdfDoc.addPage([612, 792]);
    yPosition = 750;
  }

  addText('Overall Performance Comments', leftMargin, yPosition, 12, true);
  yPosition -= lineHeight;

  if (evaluation.overallPerformanceComments) {
    yPosition = addWrappedText(evaluation.overallPerformanceComments, leftMargin, yPosition, 500, 10);
    yPosition -= sectionSpacing;
  } else {
    yPosition -= lineHeight;
  }

  addText('Supervisor Comments', leftMargin, yPosition, 12, true);
  yPosition -= lineHeight;

  if (evaluation.supervisorComments) {
    yPosition = addWrappedText(evaluation.supervisorComments, leftMargin, yPosition, 500, 10);
    yPosition -= sectionSpacing;
  } else {
    yPosition -= lineHeight;
  }

  addText('Employee Comments', leftMargin, yPosition, 12, true);
  yPosition -= lineHeight;

  if (evaluation.employeeComments) {
    yPosition = addWrappedText(evaluation.employeeComments, leftMargin, yPosition, 500, 10);
    yPosition -= sectionSpacing;
  } else {
    yPosition -= lineHeight;
  }

  // Acknowledgment Section
  if (yPosition < 150) {
    page = pdfDoc.addPage([612, 792]);
    yPosition = 750;
  }

  addText('Acknowledgment', leftMargin, yPosition, 12, true);
  yPosition -= lineHeight;

  if (evaluation.acknowledged) {
    const sigDate = evaluation.signatureTimestamp
      ? new Date(evaluation.signatureTimestamp).toLocaleString()
      : 'N/A';
    addText(`Acknowledged: Yes`, leftMargin, yPosition);
    yPosition -= lineHeight;
    addText(`Signature Name: ${evaluation.signatureName}`, leftMargin, yPosition);
    yPosition -= lineHeight;
    addText(`Signature Date: ${sigDate}`, leftMargin, yPosition);
  } else {
    addText('Acknowledged: No', leftMargin, yPosition);
  }

  // Footer
  const pages = pdfDoc.getPages();
  pages.forEach((pdfPage, index) => {
    addText(
      `Page ${index + 1} of ${pages.length}`,
      leftMargin,
      30,
      8,
      false,
      pdfPage
    );
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

module.exports = { generatePDF };

