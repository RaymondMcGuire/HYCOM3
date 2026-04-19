import { defineComponent } from 'vue'
import {
  crossSectionShapeType,
  curveDoorStatusType
} from '@/hycom_lib/common'
import graph412_1 from '@/assets/images/graph/412-1.png'
import graph412_2 from '@/assets/images/graph/412-2.png'
import graph412_3 from '@/assets/images/graph/412-3.png'
import graph412_4 from '@/assets/images/graph/412-4.png'
import graph412_5 from '@/assets/images/graph/412-5.png'
import graph412_6 from '@/assets/images/graph/412-6.png'
import graph412_7 from '@/assets/images/graph/412-7.png'

type DynamicItem = Record<string, any>;
type DynamicComponentContext = Record<string, any>;

type DynamicParamsComponentConfig = {
  name: string;
  createEmptyItem: (ctx: DynamicComponentContext) => DynamicItem;
  addFieldKeys?: string[];
  extraData?: Record<string, unknown> | (() => Record<string, unknown>);
};

function resolveExtraData(
  extraData?: Record<string, unknown> | (() => Record<string, unknown>)
): Record<string, unknown> {
  if (!extraData) {
    return {};
  }

  return typeof extraData === 'function' ? extraData() : extraData;
}

export function createDynamicParamsComponent(
  config: DynamicParamsComponentConfig
) {
  return defineComponent({
    name: config.name,
    props: {
      explainText: {
        type: String,
        default: ''
      },
      dynamicBtn: {
        type: Boolean,
        default: true
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      defaultValue: {
        type: Number,
        default: 0
      },
      maxValue: {
        type: Number,
        default: 1
      },
      minValue: {
        type: Number,
        default: 0
      },
      stepValue: {
        type: Number,
        default: 0.1
      }
    },
    data() {
      return {
        params: [] as DynamicItem[],
        ...resolveExtraData(config.extraData)
      };
    },
    methods: {
      addField() {
        this.params.push(config.createEmptyItem(this as DynamicComponentContext));
      },
      addFieldWithData(...values: Array<string | number>) {
        const item = config.createEmptyItem(this as DynamicComponentContext);

        (config.addFieldKeys || []).forEach((key, index) => {
          item[key] = values[index] ?? item[key];
        });

        this.params.push(item);
      },
      removeField(index: number) {
        this.params.splice(index, 1);
      },
      removeAllField() {
        this.params.splice(0, this.params.length);
      },
      onParamsDataChange() {
        this.$emit('updateParamsData', this.params);
      }
    }
  });
}

export const crossSectionShapeOptions = [
  {
    id: 0,
    label: '矩形断面',
    value: crossSectionShapeType.RECTANGLE
  },
  {
    id: 1,
    label: '圆形断面',
    value: crossSectionShapeType.CIRCLE
  }
];

export const inletShapeOptions = [
  {
    id: 0,
    label: '无',
    value: 0
  },
  {
    id: 1,
    label: '直角',
    value: 0.5
  },
  {
    id: 2,
    label: '切角',
    value: 0.25
  },
  {
    id: 3,
    label: '角稍加修圆',
    value: 0.2
  },
  {
    id: 4,
    label: '喇叭形',
    value: 0.1
  },
  {
    id: 5,
    label: '流线形',
    value: 0.055
  }
];

export const trashRackShapeOptions = [
  {
    id: 1,
    label: '栅条形状1',
    value: 2.42,
    img: graph412_1
  },
  {
    id: 2,
    label: '栅条形状2',
    value: 1.83,
    img: graph412_2
  },
  {
    id: 3,
    label: '栅条形状3',
    value: 1.67,
    img: graph412_3
  },
  {
    id: 4,
    label: '栅条形状4',
    value: 1.035,
    img: graph412_4
  },
  {
    id: 5,
    label: '栅条形状5',
    value: 0.92,
    img: graph412_5
  },
  {
    id: 6,
    label: '栅条形状6',
    value: 0.76,
    img: graph412_6
  },
  {
    id: 7,
    label: '栅条形状7',
    value: 1.79,
    img: graph412_7
  }
];

export const curveDoorStatusOptions = [
  {
    id: 0,
    label: '弧门全开',
    value: curveDoorStatusType.AOPEN
  },
  {
    id: 1,
    label: '弧门局开',
    value: curveDoorStatusType.POPEN
  }
];
