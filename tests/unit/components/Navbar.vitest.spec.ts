import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

const { toggleSideBar, logout, clearLocalSession } = vi.hoisted(() => ({
  toggleSideBar: vi.fn(),
  logout: vi.fn(),
  clearLocalSession: vi.fn()
}))

vi.mock('@/app/state', () => ({
  useLayoutState: () => ({
    sidebar: {
      opened: true
    },
    toggleSideBar
  }),
  useSessionState: () => ({
    avatar: 'avatar.png',
    name: '开发者',
    roles: ['developer'],
    logout,
    clearLocalSession
  })
}))

import Navbar from '@/views/layout/components/Navbar.vue'

describe('components/Navbar', () => {
  beforeEach(() => {
    toggleSideBar.mockReset()
    logout.mockReset()
    clearLocalSession.mockReset()
  })

  it('routes dropdown commands through the shared handler', async () => {
    const push = vi.fn().mockResolvedValue(undefined)
    const replace = vi.fn().mockResolvedValue(undefined)
    const wrapper = shallowMount(Navbar, {
      global: {
        stubs: {
          Breadcrumb: true,
          Hamburger: true,
          ElDropdown: {
            template: '<div><slot /><slot name="dropdown" /></div>'
          },
          ElDropdownMenu: {
            template: '<div><slot /></div>'
          },
          ElDropdownItem: {
            props: ['command', 'divided'],
            template: '<button><slot /></button>'
          }
        },
        mocks: {
          $router: {
            push,
            replace
          }
        }
      }
    })

    await (wrapper.vm as any).handleCommand('contact')

    expect(push).toHaveBeenCalledWith({ path: '/contact' })
    expect(replace).not.toHaveBeenCalled()
  })

  it('falls back to local session clear when remote logout rejects', async () => {
    logout.mockRejectedValueOnce(new Error('expired token'))
    const replace = vi.fn().mockResolvedValue(undefined)
    const wrapper = shallowMount(Navbar, {
      global: {
        stubs: {
          Breadcrumb: true,
          Hamburger: true,
          ElDropdown: {
            template: '<div><slot /><slot name="dropdown" /></div>'
          },
          ElDropdownMenu: {
            template: '<div><slot /></div>'
          },
          ElDropdownItem: {
            props: ['command', 'divided'],
            template: '<button><slot /></button>'
          }
        },
        mocks: {
          $router: {
            push: vi.fn(),
            replace
          }
        }
      }
    })

    await (wrapper.vm as any).handleCommand('logout')

    expect(logout).toHaveBeenCalledTimes(1)
    expect(clearLocalSession).toHaveBeenCalledTimes(1)
    expect(replace).toHaveBeenCalledWith({ path: '/login' })
  })
})
