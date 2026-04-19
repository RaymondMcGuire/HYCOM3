import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AuthShell from '@/shared/components/auth/AuthShell.vue'

describe('components/AuthShell', () => {
  it('renders auth metadata and slot content', () => {
    const wrapper = mount(AuthShell, {
      props: {
        title: 'HYCOM3',
        subtitle: '水力学计算程序',
        versionText: 'v0.3.0',
        panelHeight: '480px'
      },
      slots: {
        default: '<form class="auth-form"><div class="auth-form-item">slot-body</div></form>'
      }
    })

    expect(wrapper.text()).toContain('HYCOM3')
    expect(wrapper.text()).toContain('水力学计算程序')
    expect(wrapper.text()).toContain('v0.3.0')
    expect(wrapper.find('.auth-form').exists()).toBe(true)
    expect(wrapper.find('.auth-shell__panel').attributes('style')).toContain('--auth-shell-panel-height: 480px;')
  })
})
