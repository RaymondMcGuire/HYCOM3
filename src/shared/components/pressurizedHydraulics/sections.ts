import {
  DynamicCKJBDParams,
  DynamicCKMCRangeParams,
  DynamicCSKLRMQParams,
  DynamicCSKLRSKNumberParams,
  DynamicDMTKParams,
  DynamicDMTSParams,
  DynamicDSDParams,
  DynamicHXGZMParams,
  DynamicJKDParams,
  DynamicJKJBDParams,
  DynamicJKLWSSelectParams,
  DynamicJKMCRangeParams,
  DynamicJSKSelectParams,
  DynamicJXBYXJSGNumberParams,
  DynamicPBMParams,
  DynamicYXBJXJSGNumberParams,
  DynamicYXHWGParams,
  DynamicYXJKDParams,
  DynamicYXJSDParams,
  DynamicYXJWGParams
} from './index';
import { markRaw, type Component } from 'vue';

export interface PressurizedHydraulicItemSchema {
  title: string;
  refName: string;
  component: Component;
  props?: Record<string, any>;
}

export interface PressurizedHydraulicSectionSchema {
  title: string;
  items: PressurizedHydraulicItemSchema[];
}

function withRawComponents(
  items: PressurizedHydraulicItemSchema[]
): PressurizedHydraulicItemSchema[] {
  return items.map((item) => ({
    ...item,
    component: markRaw(item.component)
  }));
}

function withRawSections(
  sections: PressurizedHydraulicSectionSchema[]
): PressurizedHydraulicSectionSchema[] {
  return markRaw(
    sections.map((section) => ({
      ...section,
      items: withRawComponents(section.items)
    }))
  );
}

function withFixedDynamicButton(
  items: PressurizedHydraulicItemSchema[]
): PressurizedHydraulicItemSchema[] {
  return withRawComponents(
    items.map((item) => ({
      ...item,
      props: {
        dynamicBtn: false,
        ...(item.props ?? {})
      }
    }))
  );
}

export const pressurizedTunnelLossSections: PressurizedHydraulicSectionSchema[] = withRawSections([
  {
    title: '计算局部能量损失：',
    items: [
      { title: '部位1:进水口', refName: 'jsk', component: DynamicJSKSelectParams },
      { title: '部位2:进口拦污栅', refName: 'jklws', component: DynamicJKLWSSelectParams },
      {
        title: '部位3:进口门槽',
        refName: 'jkmc',
        component: DynamicJKMCRangeParams,
        props: { minValue: 0.05, maxValue: 0.2, stepValue: 0.01 }
      },
      {
        title: '部位4:矩形变圆形渐缩管',
        refName: 'jxbyxjsg',
        component: DynamicJXBYXJSGNumberParams,
        props: { defaultValue: 0.05, readOnly: true }
      },
      { title: '部位5:圆形渐扩段', refName: 'yxjkd', component: DynamicYXJKDParams },
      { title: '部位6:圆形渐缩段', refName: 'yxjsd', component: DynamicYXJSDParams },
      { title: '部位7:断面突扩', refName: 'dmtk', component: DynamicDMTKParams },
      { title: '部位8:断面突缩', refName: 'dmts', component: DynamicDMTSParams },
      { title: '部位9:圆形缓弯管', refName: 'yxhwg', component: DynamicYXHWGParams },
      { title: '部位10:圆形急弯管', refName: 'yxjwg', component: DynamicYXJWGParams },
      {
        title: '部位11:圆形变矩形渐缩管',
        refName: 'yxbjxjsg',
        component: DynamicYXBJXJSGNumberParams,
        props: { defaultValue: 0.1, readOnly: true }
      },
      {
        title: '部位12:出口门槽',
        refName: 'ckmc',
        component: DynamicCKMCRangeParams,
        props: { minValue: 0.05, maxValue: 0.2, stepValue: 0.01 }
      },
      { title: '部位13:弧形工作门', refName: 'hxgzm', component: DynamicHXGZMParams },
      { title: '部位14:平板门', refName: 'pbm', component: DynamicPBMParams },
      {
        title: '部位15:出水口流入水库',
        refName: 'csklrsk',
        component: DynamicCSKLRSKNumberParams,
        props: { defaultValue: 1.0, readOnly: true }
      },
      { title: '部位16:出水口流入明渠', refName: 'csklrmq', component: DynamicCSKLRMQParams }
    ]
  },
  {
    title: '4.2.1.2 计算沿程能量损失：',
    items: [
      { title: '进口段', refName: 'jkd', component: DynamicJKDParams },
      { title: '进口渐变段', refName: 'jkjbd', component: DynamicJKJBDParams },
      { title: '洞身段', refName: 'dsd', component: DynamicDSDParams },
      { title: '出口渐变段', refName: 'ckjbd', component: DynamicCKJBDParams }
    ]
  }
]);

export const pressureLineSections: PressurizedHydraulicSectionSchema[] = withRawSections([
  {
    title: '计算局部能量损失：',
    items: withFixedDynamicButton([
      { title: '部位:进水口', refName: 'jsk', component: DynamicJSKSelectParams },
      {
        title: '部位:进口门槽',
        refName: 'jkmc',
        component: DynamicJKMCRangeParams,
        props: { minValue: 0.05, maxValue: 0.2, stepValue: 0.01 }
      },
      {
        title: '部位:矩形变圆形渐缩管',
        refName: 'jxbyxjsg',
        component: DynamicJXBYXJSGNumberParams,
        props: { defaultValue: 0.05, readOnly: true }
      },
      { title: '部位:圆形缓弯管', refName: 'yxhwg', component: DynamicYXHWGParams },
      {
        title: '部位:圆形变矩形渐缩管',
        refName: 'yxbjxjsg',
        component: DynamicYXBJXJSGNumberParams,
        props: { defaultValue: 0.1, readOnly: true }
      },
      { title: '部位:弧形工作门', refName: 'hxgzm', component: DynamicHXGZMParams }
    ])
  },
  {
    title: '4.2.1.2 计算沿程能量损失：',
    items: withFixedDynamicButton([
      { title: '进口段', refName: 'jkd', component: DynamicJKDParams },
      { title: '进口渐变段', refName: 'jkjbd', component: DynamicJKJBDParams },
      { title: '洞身段', refName: 'dsd', component: DynamicDSDParams },
      { title: '出口渐变段', refName: 'ckjbd', component: DynamicCKJBDParams }
    ])
  }
]);

export const shortPipeSections: PressurizedHydraulicSectionSchema[] = withRawSections([
  {
    title: '计算局部水头损失：',
    items: [
      { title: '部位1:进水口', refName: 'jsk', component: DynamicJSKSelectParams },
      { title: '部位2:进口拦污栅', refName: 'jklws', component: DynamicJKLWSSelectParams },
      {
        title: '部位3:进口门槽',
        refName: 'jkmc',
        component: DynamicJKMCRangeParams,
        props: { minValue: 0.05, maxValue: 0.2, stepValue: 0.01 }
      },
      {
        title: '部位4:矩形变圆形渐缩管',
        refName: 'jxbyxjsg',
        component: DynamicJXBYXJSGNumberParams,
        props: { defaultValue: 0.05, readOnly: true }
      },
      { title: '部位5:圆形渐扩段', refName: 'yxjkd', component: DynamicYXJKDParams },
      { title: '部位6:圆形渐缩段', refName: 'yxjsd', component: DynamicYXJSDParams },
      { title: '部位7:断面突扩', refName: 'dmtk', component: DynamicDMTKParams },
      { title: '部位8:断面突缩', refName: 'dmts', component: DynamicDMTSParams },
      { title: '部位9:圆形缓弯管', refName: 'yxhwg', component: DynamicYXHWGParams },
      { title: '部位10:圆形急弯管', refName: 'yxjwg', component: DynamicYXJWGParams },
      {
        title: '部位11:圆形变矩形渐缩管',
        refName: 'yxbjxjsg',
        component: DynamicYXBJXJSGNumberParams,
        props: { defaultValue: 0.1, readOnly: true }
      },
      {
        title: '部位12:出口门槽',
        refName: 'ckmc',
        component: DynamicCKMCRangeParams,
        props: { minValue: 0.05, maxValue: 0.2, stepValue: 0.01 }
      },
      { title: '部位13:弧形工作门', refName: 'hxgzm', component: DynamicHXGZMParams },
      { title: '部位14:平板门', refName: 'pbm', component: DynamicPBMParams },
      {
        title: '部位15:出水口流入水库',
        refName: 'csklrsk',
        component: DynamicCSKLRSKNumberParams,
        props: { defaultValue: 1.0, readOnly: true }
      },
      { title: '部位16:出水口流入明渠', refName: 'csklrmq', component: DynamicCSKLRMQParams }
    ]
  }
]);
