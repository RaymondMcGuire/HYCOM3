import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HycomForm from '@/components/HycomForm/index.vue'
import { CalculationDefinition, createCalculationState } from '@/shared/calculations'

describe('components/HycomForm', () => {
  it('applies demo values and executes schema-based calculations', async () => {
    const definition: CalculationDefinition = {
      title: 'Test Calculator',
      fields: [
        { key: 'a', latex: 'a', type: 'number' },
        { key: 'b', latex: 'b', type: 'number' }
      ],
      formulas: {
        0: 'a+b'
      },
      demoCase: {
        values: {
          a: 2,
          b: 3
        },
        description: 'demo',
        expectedResult: 'sum=5'
      },
      execute: ({ input }) => `sum=${Number(input.a) + Number(input.b)}`
    }

    const state = createCalculationState(definition.fields)
    const wrapper = mount(HycomForm, {
      propsData: {
        definition,
        state
      },
      stubs: {
        MathJax: {
          props: ['latex'],
          template: '<span>{{ latex }}</span>'
        },
        ParamExplain: {
          props: ['formulas'],
          template: '<div class="formula-stub">{{ Object.keys(formulas || {}).length }}</div>'
        }
      }
    })

    ;(wrapper.vm as any).onDemo()
    await wrapper.vm.$nextTick()

    expect(state.a).toBe(2)
    expect(state.b).toBe(3)

    ;(wrapper.vm as any).onCalculate()
    await Promise.resolve()
    await wrapper.vm.$nextTick()

    expect((wrapper.vm as any).form.result).toBe('sum=5')
  })
})
