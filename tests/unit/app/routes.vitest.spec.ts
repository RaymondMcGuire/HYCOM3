import { describe, expect, it } from 'vitest'
import { routes } from '@/app/router/routes'

describe('app/router/routes', () => {
  it('preserves top-level route order and fallback placement', () => {
    expect(routes.map((route) => route.path)).toEqual([
      '/login',
      '/register',
      '/404',
      '/',
      '/section1',
      '/section2/2.2',
      '/section3',
      '/section4',
      '/section5',
      '/section6',
      '/section7',
      '/section8',
      '/:pathMatch(.*)*'
    ])
  })

  it('keeps the shell route and auth-related pages stable', () => {
    const rootRoute = routes.find((route) => route.path === '/')

    expect(rootRoute?.redirect).toBe('/dashboard')
    expect(rootRoute?.meta?.hidden).toBe(true)
    expect(rootRoute?.children?.map((route) => route.path)).toEqual([
      'dashboard',
      'contact',
      'guide',
      'admin_panel'
    ])
  })

  it('keeps section navigation metadata intact', () => {
    const section2Route = routes.find((route) => route.path === '/section2/2.2')
    const section8Route = routes.find((route) => route.path === '/section8')

    expect(section2Route?.meta?.title).toBe('侧槽溢洪道水力学计算')
    expect(section8Route?.meta?.title).toBe('城镇供水长距离输水管（渠）道水力学计算')
    expect(section8Route?.children?.map((route) => route.path)).toEqual([
      '8.1',
      '8.2',
      '8.3',
      '8.4',
      '8.5'
    ])
  })
})
