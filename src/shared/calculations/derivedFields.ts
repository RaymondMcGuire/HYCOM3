import { DerivedFieldRule } from '@/shared/calculations/types'

export function applyDerivedFieldRules<TState extends Record<string, any>>(
  state: TState,
  rules: Array<DerivedFieldRule<TState>> = []
): boolean {
  let changed = false

  rules.forEach((rule) => {
    const patch = rule.apply(state)

    rule.targets.forEach((target) => {
      if (!Object.prototype.hasOwnProperty.call(patch, target)) {
        return
      }

      const nextValue = patch[target as keyof TState]
      if (state[target as keyof TState] === nextValue) {
        return
      }

      state[target as keyof TState] = nextValue as TState[keyof TState]
      changed = true
    })
  })

  return changed
}
