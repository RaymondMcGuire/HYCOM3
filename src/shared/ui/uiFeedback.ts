import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import {
  type ElMessageBoxOptions,
  ElMessage,
  ElMessageBox
} from 'element-plus'
import type {
  Action,
  MessageBoxData,
  MessageHandler,
  MessageParams
} from 'element-plus'

type FeedbackMessageType = 'success' | 'warning' | 'info' | 'error'
type FeedbackMessageOptions = Partial<Omit<MessageParams, 'message' | 'type'>>
type FeedbackConfirmOptions = Partial<ElMessageBoxOptions>

function showMessage(
  type: FeedbackMessageType,
  message: string,
  options: FeedbackMessageOptions = {}
): MessageHandler {
  return ElMessage({
    ...options,
    message,
    type
  })
}

export const uiFeedback = {
  success(message: string, options: FeedbackMessageOptions = {}) {
    return showMessage('success', message, options)
  },
  warning(message: string, options: FeedbackMessageOptions = {}) {
    return showMessage('warning', message, options)
  },
  info(message: string, options: FeedbackMessageOptions = {}) {
    return showMessage('info', message, options)
  },
  error(message: string, options: FeedbackMessageOptions = {}) {
    return showMessage('error', message, options)
  },
  confirm(
    message: string,
    title = '确认',
    options: FeedbackConfirmOptions = {}
  ): Promise<MessageBoxData>
    | Promise<{ value: string; action: Action }> {
    return ElMessageBox.confirm(message, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      ...options
    })
  }
}
