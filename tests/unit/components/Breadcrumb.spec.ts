import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    children: [{
      path: 'dashboard',
      name: 'dashboard'
    }]
  },
  {
    path: '/menu',
    name: 'menu',
    children: [{
      path: 'menu1',
      name: 'menu1',
      meta: { title: 'menu1' },
      children: [{
        path: 'menu1-1',
        name: 'menu1-1',
        meta: { title: 'menu1-1' }
      },
      {
        path: 'menu1-2',
        name: 'menu1-2',
        redirect: 'noredirect',
        meta: { title: 'menu1-2' },
        children: [{
          path: 'menu1-2-1',
          name: 'menu1-2-1',
          meta: { title: 'menu1-2-1' }
        },
        {
          path: 'menu1-2-2',
          name: 'menu1-2-2'
        }]
      }]
    }]
  }]

async function mountWithRoute(path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes
  })

  router.push(path)
  await router.isReady()

  const wrapper = mount(Breadcrumb, {
    global: {
      plugins: [router]
    }
  })

  await nextTick()

  return wrapper
}

describe('Breadcrumb.vue', () => {
  it('dashboard', async () => {
    const wrapper = await mountWithRoute('/dashboard')
    const len = wrapper.findAll('.el-breadcrumb__inner').length
    expect(len).toBe(1)
  })

  it('normal route', async () => {
    const wrapper = await mountWithRoute('/menu/menu1')
    const len = wrapper.findAll('.el-breadcrumb__inner').length
    expect(len).toBe(2)
  })

  it('nested route', async () => {
    const wrapper = await mountWithRoute('/menu/menu1/menu1-2/menu1-2-1')
    const len = wrapper.findAll('.el-breadcrumb__inner').length
    expect(len).toBe(4)
  })

  it('no meta.title', async () => {
    const wrapper = await mountWithRoute('/menu/menu1/menu1-2/menu1-2-2')
    const len = wrapper.findAll('.el-breadcrumb__inner').length
    expect(len).toBe(3)
  })

  it('click link', async () => {
    const wrapper = await mountWithRoute('/menu/menu1/menu1-2/menu1-2-2')
    const breadcrumbArray = wrapper.findAll('.el-breadcrumb__inner')
    const second = breadcrumbArray.at(1)!
    const href = second.find('a').text()
    expect(href).toBe('menu1')
  })

  it('noredirect', async () => {
    const wrapper = await mountWithRoute('/menu/menu1/menu1-2/menu1-2-1')
    const breadcrumbArray = wrapper.findAll('.el-breadcrumb__inner')
    const redirectBreadcrumb = breadcrumbArray.at(2)!
    expect(redirectBreadcrumb.contains('a')).toBe(false)
  })

  it('last breadcrumb', async () => {
    const wrapper = await mountWithRoute('/menu/menu1/menu1-2/menu1-2-1')
    const breadcrumbArray = wrapper.findAll('.el-breadcrumb__inner')
    const redirectBreadcrumb = breadcrumbArray.at(3)!
    expect(redirectBreadcrumb.contains('a')).toBe(false)
  })
})
