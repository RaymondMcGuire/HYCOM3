import { describe, expect, it } from 'vitest'
import { applyDerivedFieldRules, DerivedFieldRule } from '@/shared/calculations'

describe('shared/calculations/derivedFields', () => {
  it('applies derived values to configured targets', () => {
    const state = {
      discharge: 10,
      width: 2,
      velocity: 0
    }

    const rules: Array<DerivedFieldRule<typeof state>> = [
      {
        deps: ['discharge', 'width'],
        targets: ['velocity'],
        apply(currentState) {
          return {
            velocity: currentState.discharge / currentState.width
          }
        }
      }
    ]

    const changed = applyDerivedFieldRules(state, rules)

    expect(changed).toBe(true)
    expect(state.velocity).toBe(5)
  })

  it('returns false when derived targets stay unchanged', () => {
    const state = {
      epsilon: 0.92
    }

    const changed = applyDerivedFieldRules(state, [
      {
        deps: ['epsilon'],
        targets: ['epsilon'],
        apply() {
          return {
            epsilon: 0.92
          }
        }
      }
    ])

    expect(changed).toBe(false)
    expect(state.epsilon).toBe(0.92)
  })
})
