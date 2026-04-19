import { crossSectionShapeType } from '@/hycom_lib/common'

export interface DynamicDemoStep {
  refName: string;
  args: Array<string | number>;
  triggerChange?: boolean;
}

export interface DynamicParamGroupSchema<TItem = Record<string, any>, TSerialized = unknown> {
  refName: string;
  createDefaultItem: () => TItem;
  toArgs: (item: TItem) => Array<string | number>;
  demoItems?: TItem[];
  serialize?: (items: TItem[]) => TSerialized;
}

type DynamicRefLike = {
  addFieldWithData?: (...args: Array<string | number>) => void;
  removeAllField?: () => void;
  onParamsDataChange?: () => void;
};

type DynamicRefContainer = Record<string, DynamicRefLike | DynamicRefLike[] | undefined>;

export type DynamicParamDataStore = Record<string, any[]>;

export interface DynamicParamController {
  data: DynamicParamDataStore;
  update: (refName: string, paramData: any[]) => void;
  reset: (refs: DynamicRefContainer) => void;
  applyDemo: (refs: DynamicRefContainer) => void;
}

export function applyDynamicParamGroupDemo<TItem>(
  refs: DynamicRefContainer,
  schema: DynamicParamGroupSchema<TItem>
): void {
  resetDynamicRefs(refs, [schema.refName])

  ;(schema.demoItems || []).forEach((item) => {
    getDynamicRefs(refs, schema.refName).forEach((ref) => {
      ref.addFieldWithData?.(...schema.toArgs(item))
      ref.onParamsDataChange?.()
    })
  })
}

export function serializeDynamicParamGroup<TItem, TSerialized = TItem[]>(
  schema: DynamicParamGroupSchema<TItem, TSerialized>,
  items: TItem[]
): TSerialized {
  if (schema.serialize) {
    return schema.serialize(items)
  }

  return items as unknown as TSerialized
}

function getDynamicRefs(refs: DynamicRefContainer, refName: string): DynamicRefLike[] {
  const ref = refs[refName];
  if (!ref) {
    return [];
  }

  return Array.isArray(ref) ? ref : [ref];
}

export function resetDynamicRefs(
  refs: DynamicRefContainer,
  refNames: string[]
): void {
  refNames.forEach((refName) => {
    getDynamicRefs(refs, refName).forEach((ref) => {
      ref.removeAllField?.();
    });
  });
}

export function applyDynamicDemo(
  refs: DynamicRefContainer,
  steps: DynamicDemoStep[]
): void {
  steps.forEach((step) => {
    getDynamicRefs(refs, step.refName).forEach((ref) => {
      ref.addFieldWithData?.(...step.args);
      if (step.triggerChange !== false) {
        ref.onParamsDataChange?.();
      }
    });
  });
}

function createDynamicParamDataStore(refNames: string[]): DynamicParamDataStore {
  return refNames.reduce<DynamicParamDataStore>((store, refName) => {
    store[refName] = [];
    return store;
  }, {});
}

export function createDynamicParamController(
  refNames: string[],
  demoSteps: DynamicDemoStep[]
): DynamicParamController {
  const data = createDynamicParamDataStore(refNames);

  const clearData = () => {
    refNames.forEach((refName) => {
      data[refName] = [];
    });
  };

  return {
    data,
    update(refName: string, paramData: any[]) {
      data[refName] = paramData;
    },
    reset(refs: DynamicRefContainer) {
      clearData();
      resetDynamicRefs(refs, refNames);
    },
    applyDemo(refs: DynamicRefContainer) {
      clearData();
      resetDynamicRefs(refs, refNames);
      applyDynamicDemo(refs, demoSteps);
    }
  };
}

export const pressurizedTunnelLossRefNames = [
  'jsk',
  'jklws',
  'jkmc',
  'jxbyxjsg',
  'yxjkd',
  'yxjsd',
  'dmtk',
  'dmts',
  'yxhwg',
  'yxjwg',
  'yxbjxjsg',
  'ckmc',
  'hxgzm',
  'pbm',
  'csklrsk',
  'csklrmq',
  'jkd',
  'jkjbd',
  'dsd',
  'ckjbd'
];

export const pressurizedTunnelLossDemoSteps: DynamicDemoStep[] = [
  {
    refName: 'jsk',
    args: [0.1, 4.8, 8, 0, 2, crossSectionShapeType.RECTANGLE]
  },
  {
    refName: 'jkmc',
    args: [0.15, 4.8, 8, 0, 2, crossSectionShapeType.RECTANGLE]
  },
  {
    refName: 'jxbyxjsg',
    args: [0.05, 12.4, 8, 9]
  },
  {
    refName: 'yxhwg',
    args: [9, 50, 22]
  },
  {
    refName: 'yxhwg',
    args: [9, 50, 22]
  },
  {
    refName: 'yxbjxjsg',
    args: [0.1, 8, 6.8, 9]
  },
  {
    refName: 'hxgzm',
    args: ['', '', '', '', 0]
  },
  {
    refName: 'jkd',
    args: [13.5, 12.4, 8, 0, crossSectionShapeType.RECTANGLE]
  },
  {
    refName: 'jkjbd',
    args: [20.0, 12.4, 8.0, 9.0]
  },
  {
    refName: 'ckjbd',
    args: [22.0, 8.0, 6.8, 9.0]
  },
  {
    refName: 'dsd',
    args: [331.2, 0, 0, 9.0, crossSectionShapeType.CIRCLE]
  }
];

export const pressureLineRefNames = [
  'jsk',
  'jkmc',
  'jxbyxjsg',
  'yxhwg',
  'yxbjxjsg',
  'hxgzm',
  'jkd',
  'jkjbd',
  'dsd',
  'ckjbd'
];

export const pressureLineDemoSteps: DynamicDemoStep[] = [
  {
    refName: 'jsk',
    args: [0.1, 4.8, 8, 0, 2, crossSectionShapeType.RECTANGLE]
  },
  {
    refName: 'jkmc',
    args: [0.15, 4.8, 8, 0, 2, crossSectionShapeType.RECTANGLE]
  },
  {
    refName: 'jxbyxjsg',
    args: [0.05, 12.4, 8, 9]
  },
  {
    refName: 'yxhwg',
    args: [9, 50, 22]
  },
  {
    refName: 'yxhwg',
    args: [9, 50, 22]
  },
  {
    refName: 'yxbjxjsg',
    args: [0.1, 8, 6.8, 9]
  },
  {
    refName: 'hxgzm',
    args: ['', '', '', '', 0]
  },
  {
    refName: 'jkd',
    args: [13.5, 12.4, 8, 0, crossSectionShapeType.RECTANGLE]
  },
  {
    refName: 'jkjbd',
    args: [20.0, 12.4, 8.0, 9.0]
  },
  {
    refName: 'ckjbd',
    args: [22.0, 8.0, 6.8, 9.0]
  },
  {
    refName: 'dsd',
    args: [34.2, 0, 0, 9.0, crossSectionShapeType.CIRCLE]
  },
  {
    refName: 'dsd',
    args: [163.73, 0, 0, 9.0, crossSectionShapeType.CIRCLE]
  },
  {
    refName: 'dsd',
    args: [133.27, 0, 0, 9.0, crossSectionShapeType.CIRCLE]
  }
];

export const shortPipeRefNames = [
  'jsk',
  'jklws',
  'jkmc',
  'ckmc',
  'jxbyxjsg',
  'yxbjxjsg',
  'hxgzm',
  'yxhwg',
  'yxjwg',
  'csklrsk',
  'csklrmq',
  'yxjkd',
  'yxjsd',
  'dmtk',
  'dmts',
  'pbm'
];

export const shortPipeDemoSteps: DynamicDemoStep[] = [
  {
    refName: 'jsk',
    args: [0.1, 8, 17.118, 0, 1, crossSectionShapeType.RECTANGLE]
  },
  {
    refName: 'jkmc',
    args: [0.1, 8, 13.6, 0, 1, crossSectionShapeType.RECTANGLE]
  },
  {
    refName: 'jkmc',
    args: [0.1, 8, 11, 0, 1, crossSectionShapeType.RECTANGLE]
  }
];
