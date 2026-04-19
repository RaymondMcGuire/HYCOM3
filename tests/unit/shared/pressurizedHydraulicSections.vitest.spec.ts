import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, markRaw } from 'vue'
import PressurizedHydraulicSections from '@/shared/components/pressurizedHydraulics/SectionsRenderer.vue'

const DummyDynamic = markRaw({
  name: 'DummyDynamic',
  render() {
    return h('div')
  }
})

describe('shared/components/pressurizedHydraulics/SectionsRenderer', () => {
  it('renders section labels and forwards dynamic updates', async () => {
    const wrapper = mount(PressurizedHydraulicSections, {
      props: {
        explainText: '参数',
        sections: [
          {
            title: '测试分组',
            items: [
              {
                title: '测试部位',
                refName: 'sample',
                component: DummyDynamic,
                props: {
                  readOnly: true
                }
              }
            ]
          }
        ]
      }
    })

    expect(wrapper.text()).toContain('测试分组')
    expect(wrapper.text()).toContain('测试部位')

    wrapper.findComponent(DummyDynamic).vm.$emit('updateParamsData', [{ value: 1 }])
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update-params')?.[0]).toEqual(['sample', [{ value: 1 }]])
  })
})
