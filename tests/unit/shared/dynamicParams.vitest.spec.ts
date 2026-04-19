import { describe, expect, it, vi } from 'vitest'
import {
  applyDynamicDemo,
  applyDynamicParamGroupDemo,
  createDynamicParamController,
  resetDynamicRefs,
  serializeDynamicParamGroup
} from '@/shared/calculations'

describe('shared/calculations/dynamicParams', () => {
  it('resets all configured refs', () => {
    const first = { removeAllField: vi.fn() }
    const second = { removeAllField: vi.fn() }

    resetDynamicRefs(
      {
        first,
        second
      },
      ['first', 'second']
    )

    expect(first.removeAllField).toHaveBeenCalledTimes(1)
    expect(second.removeAllField).toHaveBeenCalledTimes(1)
  })

  it('applies demo values and triggers change notifications', () => {
    const addFieldWithData = vi.fn()
    const onParamsDataChange = vi.fn()

    applyDynamicDemo(
      {
        sample: {
          addFieldWithData,
          onParamsDataChange
        }
      },
      [
        {
          refName: 'sample',
          args: [1, 2, 3]
        }
      ]
    )

    expect(addFieldWithData).toHaveBeenCalledWith(1, 2, 3)
    expect(onParamsDataChange).toHaveBeenCalledTimes(1)
  })

  it('tracks dynamic param data and clears it during reset and demo replay', () => {
    const controller = createDynamicParamController(
      ['sample'],
      [
        {
          refName: 'sample',
          args: [7, 8, 9]
        }
      ]
    )

    const removeAllField = vi.fn()
    const addFieldWithData = vi.fn()
    const onParamsDataChange = vi.fn()

    controller.update('sample', [{ value: 1 }])
    expect(controller.data.sample).toEqual([{ value: 1 }])

    controller.reset({
      sample: {
        removeAllField
      }
    })

    expect(controller.data.sample).toEqual([])
    expect(removeAllField).toHaveBeenCalledTimes(1)

    controller.update('sample', [{ value: 2 }])
    controller.applyDemo({
      sample: {
        removeAllField,
        addFieldWithData,
        onParamsDataChange
      }
    })

    expect(controller.data.sample).toEqual([])
    expect(removeAllField).toHaveBeenCalledTimes(2)
    expect(addFieldWithData).toHaveBeenCalledWith(7, 8, 9)
    expect(onParamsDataChange).toHaveBeenCalledTimes(1)
  })

  it('replays demo rows from a dynamic param schema', () => {
    const ref = {
      removeAllField: vi.fn(),
      addFieldWithData: vi.fn(),
      onParamsDataChange: vi.fn()
    }

    applyDynamicParamGroupDemo(
      { rows: ref },
      {
        refName: 'rows',
        createDefaultItem: () => ({ length: 0, width: 0 }),
        toArgs: (item) => [item.length, item.width],
        demoItems: [
          { length: 2, width: 4 },
          { length: 3, width: 6 }
        ]
      }
    )

    expect(ref.removeAllField).toHaveBeenCalledTimes(1)
    expect(ref.addFieldWithData).toHaveBeenNthCalledWith(1, 2, 4)
    expect(ref.addFieldWithData).toHaveBeenNthCalledWith(2, 3, 6)
    expect(ref.onParamsDataChange).toHaveBeenCalledTimes(2)
  })

  it('serializes dynamic param rows through the schema adapter', () => {
    const serialized = serializeDynamicParamGroup(
      {
        refName: 'rows',
        createDefaultItem: () => ({ length: 0 }),
        toArgs: (item) => [item.length],
        serialize: (items) => items.map((item) => item.length).join('|')
      },
      [
        { length: 4 },
        { length: 8 }
      ]
    )

    expect(serialized).toBe('4|8')
  })
})
