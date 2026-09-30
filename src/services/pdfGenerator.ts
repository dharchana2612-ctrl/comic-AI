import { jsPDF } from 'jspdf';
import { ComicStory } from '../types/comic';

async function rasterizeImage(imageUrl: string, width = 800, height = 500): Promise<string> {
  return new Promise((resolve) => {
    // If it's already a png/jpeg data url, return it directly
    if (imageUrl.startsWith('data:image/png') || imageUrl.startsWith('data:image/jpeg')) {
      return resolve(imageUrl);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(imageUrl);
        }
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.warn('Could not rasterize image to canvas, using original url:', err);
        resolve(imageUrl);
      }
    };
    img.onerror = () => {
      resolve(imageUrl);
    };
    img.src = imageUrl;
  });
}

export async function generateComicPdf(comic: ComicStory): Promise<{ blob: Blob; filename: string; url: string }> {
  // Create jsPDF document: A4 portrait (210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Helper for timestamped filename
  const now = new Date();
  const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  const filename = `comic_${comic.character_name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${timestamp}.pdf`;

  // --- PAGE 1: TITLE & COVER ---
  // Dark comic themed cover
  doc.setFillColor(17, 24, 39); // #111827
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative border
  doc.setDrawColor(124, 58, 237); // Purple #7C3AED
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
  doc.setDrawColor(250, 204, 21); // Yellow #FACC15
  doc.setLineWidth(1);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26, 'S');

  // Top ComicCraft Banner
  doc.setFillColor(124, 58, 237);
  doc.roundedRect(margin + 15, 25, contentWidth - 30, 14, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('COMICCRAFT  *  AI COMIC CREATOR', pageWidth / 2, 34, { align: 'center' });

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(250, 204, 21);
  const titleLines = doc.splitTextToSize(comic.title.toUpperCase(), contentWidth - 20);
  doc.text(titleLines, pageWidth / 2, 58, { align: 'center' });

  // Cover Feature Image (Panel 1 rasterized)
  const firstPanelImage = await rasterizeImage(comic.panels[0]?.image_url || '');
  const coverImgWidth = contentWidth - 10;
  const coverImgHeight = (coverImgWidth * 500) / 800;
  const coverImgX = margin + 5;
  const coverImgY = 82;

  try {
    doc.addImage(firstPanelImage, 'PNG', coverImgX, coverImgY, coverImgWidth, coverImgHeight);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.5);
    doc.rect(coverImgX, coverImgY, coverImgWidth, coverImgHeight, 'S');
  } catch (e) {
    console.error('Failed to add cover image:', e);
  }

  // Metadata Card on Cover
  const metaY = coverImgY + coverImgHeight + 12;
  doc.setFillColor(31, 41, 55); // #1F2937
  doc.roundedRect(margin + 5, metaY, contentWidth - 10, 42, 3, 3, 'F');
  doc.setDrawColor(124, 58, 237);
  doc.setLineWidth(1);
  doc.roundedRect(margin + 5, metaY, contentWidth - 10, 42, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(244, 114, 182); // Pink
  doc.text(`MAIN HERO:  ${comic.character_name.toUpperCase()}`, margin + 12, metaY + 10);
  doc.setTextColor(147, 197, 253); // Blue
  doc.text(`SETTING:  ${comic.setting.toUpperCase()}`, margin + 12, metaY + 18);
  doc.setTextColor(253, 224, 71); // Yellow
  doc.text(`TONE:  ${comic.tone.toUpperCase()}    |    ART STYLE:  ${comic.art_style.toUpperCase()}`, margin + 12, metaY + 26);
  doc.setTextColor(209, 213, 219);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  const promptLines = doc.splitTextToSize(`" ${comic.prompt} "`, contentWidth - 24);
  doc.text(promptLines, margin + 12, metaY + 34);

  // Footer Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(156, 163, 175);
  doc.text('5-PANEL FULL STORY EDITION  *  EXPORTED WITH COMICCRAFT', pageWidth / 2, pageHeight - 16, { align: 'center' });


  // --- PANELS (1 PANEL PER PAGE) ---
  for (let i = 0; i < comic.panels.length; i++) {
    const panel = comic.panels[i];
    doc.addPage('a4', 'portrait');

    // Page Background
    doc.setFillColor(15, 23, 42); // #0F172A
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Comic Border
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');

    // Header strip
    doc.setFillColor(124, 58, 237);
    doc.roundedRect(margin, 16, 45, 9, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`PANEL ${panel.panel_number} OF 5`, margin + 22.5, 22, { align: 'center' });

    // Panel Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(250, 204, 21);
    doc.text(panel.title, margin + 50, 23);

    // Comic Panel Illustration
    const panelImgWidth = contentWidth;
    const panelImgHeight = (panelImgWidth * 500) / 800; // ~112.5mm
    const panelImgY = 30;

    const rasterImg = await rasterizeImage(panel.image_url);
    try {
      doc.addImage(rasterImg, 'PNG', margin, panelImgY, panelImgWidth, panelImgHeight);
      doc.setDrawColor(250, 204, 21);
      doc.setLineWidth(1.5);
      doc.rect(margin, panelImgY, panelImgWidth, panelImgHeight, 'S');
    } catch (e) {
      console.error(`Failed to add image for panel ${panel.panel_number}:`, e);
    }

    let currentY = panelImgY + panelImgHeight + 8;

    // Scene Description Box
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(margin, currentY, contentWidth, 16, 2, 2, 'F');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    doc.setTextColor(226, 232, 240);
    const sceneLines = doc.splitTextToSize(`Scene: ${panel.scene_description}`, contentWidth - 10);
    doc.text(sceneLines, margin + 5, currentY + 6);
    currentY += 21;

    // Comic Caption / Narration Box
    if (panel.narration || panel.caption) {
      const narrationText = panel.narration || panel.caption;
      doc.setFillColor(254, 240, 138); // Yellowish comic caption box
      doc.setDrawColor(202, 138, 4);
      doc.setLineWidth(1);
      
      const narrationLines = doc.splitTextToSize(`"${narrationText}"`, contentWidth - 14);
      const boxHeight = Math.max(16, (narrationLines.length * 5) + 8);
      
      doc.roundedRect(margin, currentY, contentWidth, boxHeight, 2, 2, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(17, 24, 39);
      doc.text(narrationLines, margin + 7, currentY + 7);
      currentY += boxHeight + 6;
    }

    // Dialogue Bubbles
    if (panel.dialogue && panel.dialogue.length > 0) {
      for (const diag of panel.dialogue) {
        if (currentY > pageHeight - 35) break;

        const isThought = diag.type === 'thought';
        const isShout = diag.type === 'shout';

        // Dialogue container
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(isShout ? 220 : 17, isShout ? 38 : 24, isShout ? 38 : 39);
        doc.setLineWidth(1.2);

        const speakerPrefix = `${diag.speaker.toUpperCase()}: `;
        const diagLines = doc.splitTextToSize(`"${diag.text}"`, contentWidth - 28);
        const bubbleHeight = Math.max(14, (diagLines.length * 5) + 12);

        doc.roundedRect(margin + 6, currentY, contentWidth - 12, bubbleHeight, 3, 3, 'FD');

        // Speaker Badge
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(isShout ? 220 : 109, isShout ? 38 : 40, isShout ? 38 : 217);
        doc.text(`${speakerPrefix} ${isThought ? '(Thinking)' : isShout ? '(Shouting!)' : ''}`, margin + 11, currentY + 6);

        // Dialogue Text
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(17, 24, 39);
        doc.text(diagLines, margin + 11, currentY + 12);

        currentY += bubbleHeight + 4;
      }
    }

    // Page Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`ComicCraft AI  *  ${comic.title}  *  Page ${i + 2} of 6`, pageWidth / 2, pageHeight - 14, { align: 'center' });
  }

  // Generate Blob and Object URL
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return {
    blob: pdfBlob,
    filename,
    url: pdfUrl
  };
}
