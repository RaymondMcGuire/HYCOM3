import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { renderByMathjax } from '@/plugins/mathjax'

export interface PdfExportConfig {
  filename?: string;
  preview?: boolean;
  download?: boolean;
}

export interface PdfExportAdapter {
  generatePdf: (htmlContent: string, config?: PdfExportConfig) => Promise<void>;
}

const EXPORT_SURFACE_WIDTH = 794
const EXPORT_SURFACE_PADDING = 32

function ensurePdfFilename(filename?: string): string {
  const normalized = (filename || 'report').trim() || 'report'
  return normalized.toLowerCase().endsWith('.pdf') ? normalized : `${normalized}.pdf`
}

function createExportSurface(htmlContent: string): HTMLDivElement {
  const container = document.createElement('div')
  container.setAttribute('aria-hidden', 'true')
  container.style.position = 'fixed'
  container.style.left = '-10000px'
  container.style.top = '0'
  container.style.width = `${EXPORT_SURFACE_WIDTH}px`
  container.style.padding = `${EXPORT_SURFACE_PADDING}px`
  container.style.boxSizing = 'border-box'
  container.style.color = '#303133'
  container.style.background = '#ffffff'
  container.style.fontFamily = '"Helvetica Neue", Arial, sans-serif'
  container.style.zIndex = '-1'
  container.style.pointerEvents = 'none'
  container.innerHTML = `
    <style>
      .pdf-content {
        width: 100%;
        overflow-wrap: break-word;
        word-break: break-word;
      }

      .pdf-content img {
        max-width: 100%;
      }

      .pdf-content table {
        width: 100%;
        border-collapse: collapse;
      }

      .pdf-content p {
        line-height: 1.8;
      }
    </style>
    <section class="pdf-content">${htmlContent}</section>
  `

  document.body.appendChild(container)
  return container
}

async function waitForFonts(): Promise<void> {
  if (!('fonts' in document)) {
    return
  }

  try {
    await document.fonts.ready
  } catch {
    // Ignore font readiness failures and continue with export.
  }
}

function buildPdfFromCanvas(canvas: HTMLCanvasElement, filename: string): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
    compress: true
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const scale = pageWidth / canvas.width
  const pageCanvasHeight = Math.max(1, Math.floor(pageHeight / scale))

  for (let offsetY = 0, pageIndex = 0; offsetY < canvas.height; offsetY += pageCanvasHeight, pageIndex += 1) {
    const sliceHeight = Math.min(pageCanvasHeight, canvas.height - offsetY)
    const pageCanvas = document.createElement('canvas')
    pageCanvas.width = canvas.width
    pageCanvas.height = sliceHeight

    const context = pageCanvas.getContext('2d')
    if (!context) {
      throw new Error('无法创建 PDF 页面画布')
    }

    context.drawImage(
      canvas,
      0,
      offsetY,
      canvas.width,
      sliceHeight,
      0,
      0,
      canvas.width,
      sliceHeight
    )

    if (pageIndex > 0) {
      pdf.addPage()
    }

    const renderedHeight = sliceHeight * scale
    pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, pageWidth, renderedHeight, undefined, 'FAST')
  }

  pdf.save(filename)
}

export const browserPdfExportAdapter: PdfExportAdapter = {
  async generatePdf(htmlContent: string, config: PdfExportConfig = {}) {
    const trimmedContent = htmlContent.trim()
    if (!trimmedContent) {
      throw new Error('计算书内容为空，无法导出 PDF')
    }

    const exportSurface = createExportSurface(trimmedContent)

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(() => resolve(), 80)
      })

      await waitForFonts()

      try {
        await renderByMathjax(exportSurface)
      } catch (error) {
        console.warn('[PdfExportAdapter]', error)
      }

      const canvas = await html2canvas(exportSurface, {
        backgroundColor: '#ffffff',
        logging: false,
        scale: Math.max(window.devicePixelRatio || 1, 2),
        useCORS: true
      })

      buildPdfFromCanvas(canvas, ensurePdfFilename(config.filename))
    } finally {
      exportSurface.remove()
    }
  }
}
