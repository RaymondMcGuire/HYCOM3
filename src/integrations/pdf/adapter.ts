import { renderByMathjax } from '@/plugins/mathjax'

export interface PdfExportConfig {
  filename?: string;
  preview?: boolean;
  download?: boolean;
}

export interface PdfExportAdapter {
  generatePdf: (htmlContent: string, config?: PdfExportConfig) => Promise<void>;
}

function createPrintableDocument(title: string, htmlContent: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      body {
        margin: 0;
        padding: 32px;
        color: #303133;
        background: #ffffff;
        font-family: "Helvetica Neue", Arial, sans-serif;
      }

      img {
        max-width: 100%;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      .pdf-content {
        width: 100%;
      }
    </style>
  </head>
  <body>
    <section class="pdf-content">${htmlContent}</section>
  </body>
</html>`
}

export const browserPdfExportAdapter: PdfExportAdapter = {
  async generatePdf(htmlContent: string, config: PdfExportConfig = {}) {
    const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=1200,height=900')
    if (!printWindow) {
      throw new Error('无法打开 PDF 导出窗口')
    }

    const title = config.filename || 'report'
    printWindow.document.open()
    printWindow.document.write(createPrintableDocument(title, htmlContent))
    printWindow.document.close()

    await new Promise<void>((resolve) => {
      printWindow.setTimeout(() => resolve(), 80)
    })

    try {
      await renderByMathjax(printWindow.document.body)
    } catch (error) {
      console.warn('[PdfExportAdapter]', error)
    }

    printWindow.focus()
    printWindow.print()

    if (config.preview === false) {
      printWindow.close()
    }
  }
}
