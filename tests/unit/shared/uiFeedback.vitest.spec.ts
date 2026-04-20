import { describe, expect, it, vi } from 'vitest'

const { ElMessage, confirm } = vi.hoisted(() => ({
  ElMessage: vi.fn(),
  confirm: vi.fn()
}))

vi.mock('element-plus', () => ({
  ElMessage,
  ElMessageBox: {
    confirm
  }
}))

import { uiFeedback } from '@/shared/ui/uiFeedback'

describe('shared/uiFeedback', () => {
  it('delegates toast messages to Element Plus message service', () => {
    uiFeedback.success('done')
    uiFeedback.warning('warn')
    uiFeedback.error('fail')

    expect(ElMessage).toHaveBeenNthCalledWith(1, {
      message: 'done',
      type: 'success'
    })
    expect(ElMessage).toHaveBeenNthCalledWith(2, {
      message: 'warn',
      type: 'warning'
    })
    expect(ElMessage).toHaveBeenNthCalledWith(3, {
      message: 'fail',
      type: 'error'
    })
  })

  it('delegates confirm dialogs to Element Plus message box service', async () => {
    confirm.mockResolvedValue({ value: 'ok', action: 'confirm' })

    await uiFeedback.confirm('确定继续？')

    expect(confirm).toHaveBeenCalledWith('确定继续？', '确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
  })
})
