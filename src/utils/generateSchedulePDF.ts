import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { DaySchedule } from './useSchedule';

/**
 * Generates a professional PDF of the full conference schedule.
 * Each day is rendered as a styled table with time, title, and speaker columns.
 */
export const generateSchedulePDF = (schedule: DaySchedule[]) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- Header ---
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 0, pageWidth, 36, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('SPiCE 2 Conference', pageWidth / 2, 16, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Simulating Physics in Celestial Ecosystems', pageWidth / 2, 23, { align: 'center' });

  doc.setFontSize(10);
  doc.text('March 16–20, 2026  •  ENS de Lyon, France', pageWidth / 2, 30, { align: 'center' });

  let yPos = 44;

  // --- Schedule Tables (one per day) ---
  schedule.forEach((day, dayIndex) => {
    // Check if we need a new page (leave room for header + at least a few rows)
    if (yPos > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      yPos = 16;
    }

    // Day header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(79, 70, 229);
    doc.text(day.day, 14, yPos);
    yPos += 2;

    // Build table data
    const tableBody = day.events.map(event => {
      const isTalk = event.type === 'talk';
      const title = event.title || '';
      const speaker = isTalk && event.speaker ? event.speaker : '';
      return [event.time, title, speaker];
    });

    autoTable(doc, {
      startY: yPos,
      head: [['Time', 'Session', 'Speaker']],
      body: tableBody,
      margin: { left: 14, right: 14 },
      theme: 'grid',
      headStyles: {
        fillColor: [79, 70, 229],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 8.5,
        cellPadding: 2.5,
        textColor: [30, 41, 59], // slate-800
      },
      columnStyles: {
        0: { cellWidth: 30, fontStyle: 'bold', textColor: [100, 116, 139] }, // slate-500, monospace feel
        1: { cellWidth: 'auto' },
        2: { cellWidth: 45, textColor: [100, 116, 139] },
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252], // slate-50
      },
      // Highlight fixed events (lunch, coffee, etc.)
      didParseCell: (data) => {
        if (data.section === 'body') {
          const event = day.events[data.row.index];
          if (event?.highlight) {
            data.cell.styles.fillColor = [254, 252, 232]; // amber-50
            data.cell.styles.fontStyle = 'bold';
          }
          if (event?.type === 'fixed' && !event?.highlight) {
            data.cell.styles.fontStyle = 'italic';
            data.cell.styles.textColor = [148, 163, 184]; // slate-400
          }
        }
      },
    });

    // Update yPos for next day
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yPos = (doc as any).lastAutoTable.finalY + (dayIndex < schedule.length - 1 ? 10 : 0);
  });

  // --- Footer on each page ---
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    const footerY = doc.internal.pageSize.getHeight() - 8;
    doc.text('SPiCE 2 Conference — https://spice-workshop.github.io', 14, footerY);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 14, footerY, { align: 'right' });
  }

  doc.save('SPiCE2_Schedule.pdf');
};
