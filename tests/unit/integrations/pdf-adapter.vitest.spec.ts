import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
  renderByMathjax,
  html2canvasMock,
  addImage,
  addPage,
  save,
  getWidth,
  getHeight
} = vi.hoisted(() => ({
  renderByMathjax: vi.fn(() => Promise.resolve()),
  html2canvasMock: vi.fn(),
  addImage: vi.fn(),
  addPage: vi.fn(),
  save: vi.fn(),
  getWidth: vi.fn(() => 595.28),
  getHeight: vi.fn(() => 841.89)
}))

vi.mock('@/plugins/mathjax', () => ({
  renderByMathjax
}))

vi.mock('html2canvas', () => ({
  default: html2canvasMock
}))

vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth,
        getHeight
      }
    },
    addImage,
    addPage,
    save
  }))
}))

describe('integrations/pdf/adapter', () => {
  beforeEach(() => {
    renderByMathjax.mockClear()
    html2canvasMock.mockClear()
    addImage.mockClear()
    addPage.mockClear()
    save.mockClear()
    getWidth.mockClear()
    getHeight.mockClear()
    getWidth.mockReturnValue(595.28)
    getHeight.mockReturnValue(841.89)
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: vi.fn()
    } as unknown as CanvasRenderingContext2D)
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock')
  })

  it('renders math content and saves a pdf with the provided filename', async () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 1000
    html2canvasMock.mockResolvedValue(canvas)

    const { browserPdfExportAdapter } = await import('@/integrations/pdf/adapter')
    await browserPdfExportAdapter.generatePdf('<p>pdf $x$</p>', {
      filename: '工程计算书'
    })

    expect(renderByMathjax).toHaveBeenCalled()
    expect(html2canvasMock).toHaveBeenCalled()
    expect(addImage).toHaveBeenCalled()
    expect(save).toHaveBeenCalledWith('工程计算书.pdf')
  })
})
