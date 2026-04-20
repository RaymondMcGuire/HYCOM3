import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

const { renderByMathjax, generatePdf } = vi.hoisted(() => ({
  renderByMathjax: vi.fn(() => Promise.resolve()),
  generatePdf: vi.fn(() => Promise.resolve())
}))

vi.mock('@/plugins/mathjax', () => ({
  renderByMathjax
}))

vi.mock('@/integrations/pdf/adapter', () => ({
  browserPdfExportAdapter: {
    generatePdf
  }
}))

import MavEditor from '@/components/MavEditor/MavEditor.vue'

describe('components/MavEditor', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    renderByMathjax.mockClear()
    generatePdf.mockClear()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('toggles between edit and preview while keeping content in sync', async () => {
    const config = {
      subfield: false,
      defaultOpen: 'preview',
      editable: false,
      toolbarsFlag: false,
      scrollStyle: true,
      html: true,
      value: '<p>initial $x$</p>',
      filename: 'report',
      download: true,
      preview: true
    }

    const wrapper = mount(MavEditor, {
      props: { config }
    })

    await wrapper.vm.$nextTick()
    vi.runAllTimers()
    await Promise.resolve()

    expect(wrapper.find('.preview-panel').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(false)

    await wrapper.findAll('button').at(0)!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(config.subfield).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)

    const textarea = wrapper.find('textarea')
    expect((textarea.element as HTMLTextAreaElement).value).toBe('<p>initial $x$</p>')
    await textarea.setValue('<p>updated $y$</p>')

    expect(config.value).toBe('<p>updated $y$</p>')

    await wrapper.findAll('button').at(1)!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(config.defaultOpen).toBe('preview')
    expect(config.subfield).toBe(false)
  })

  it('delegates pdf export to the adapter', async () => {
    const config = {
      subfield: false,
      defaultOpen: 'preview',
      editable: false,
      toolbarsFlag: false,
      scrollStyle: true,
      html: true,
      value: '<p>pdf $x$</p>',
      filename: 'report',
      download: true,
      preview: true
    }

    const wrapper = mount(MavEditor, {
      props: { config }
    })

    await wrapper.findAll('button').at(0)!.trigger('click')
    await wrapper.vm.$nextTick()

    const textarea = wrapper.find('textarea')
    await textarea.setValue('<p>pdf $y$</p><p>手动追加</p>')

    await wrapper.findAll('button').at(2)!.trigger('click')
    await Promise.resolve()

    expect(generatePdf).toHaveBeenCalledWith('<p>pdf $y$</p><p>手动追加</p>', config)
  })
})
