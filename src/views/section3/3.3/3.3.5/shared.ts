import { DynamicParamGroupSchema } from '@/shared/calculations'

export type ThreeFieldAerationItem = {
  hi: string | number;
  bi: string | number;
  vi: string | number;
}

export type TwoFieldAerationItem = {
  hi: string | number;
  vi: string | number;
}

export const threeFieldSectionFields = [
  { key: 'hi', latex: 'h', placeholder: '未掺气水流的水深hi' },
  { key: 'vi', latex: 'v', placeholder: '未掺气水流的流速vi' },
  { key: 'bi', latex: 'b', placeholder: '明流隧洞底宽bi' }
]

export const twoFieldSectionFields = [
  { key: 'hi', latex: 'h', placeholder: '未掺气水流的水深hi' },
  { key: 'vi', latex: 'v', placeholder: '未掺气水流的流速vi' }
]

const aerationThreeFieldDemoItems: ThreeFieldAerationItem[] = [
  { hi: 10.054, bi: 8, vi: 28.72 },
  { hi: 6.515, bi: 10, vi: 35.4566 },
  { hi: 7, bi: 10, vi: 33 },
  { hi: 7.92, bi: 10, vi: 29.1667 }
]

const aerationTwoFieldDemoItems: TwoFieldAerationItem[] = [
  { hi: 10.054, vi: 28.72 },
  { hi: 6.515, vi: 35.4566 },
  { hi: 7, vi: 33 },
  { hi: 7.92, vi: 29.1667 }
]

export const threeFieldAerationGroupSchema: DynamicParamGroupSchema<
ThreeFieldAerationItem,
{ hiList: number[]; biList: number[]; viList: number[] }
> = {
  refName: 'params',
  createDefaultItem: () => ({ hi: '', bi: '', vi: '' }),
  toArgs: (item) => [item.hi, item.vi, item.bi],
  demoItems: aerationThreeFieldDemoItems,
  serialize: (items) => ({
    hiList: items.map((item) => Number(item.hi)),
    biList: items.map((item) => Number(item.bi)),
    viList: items.map((item) => Number(item.vi))
  })
}

export const twoFieldAerationGroupSchema: DynamicParamGroupSchema<
TwoFieldAerationItem,
{ hiList: number[]; viList: number[] }
> = {
  refName: 'params',
  createDefaultItem: () => ({ hi: '', vi: '' }),
  toArgs: (item) => [item.hi, item.vi],
  demoItems: aerationTwoFieldDemoItems,
  serialize: (items) => ({
    hiList: items.map((item) => Number(item.hi)),
    viList: items.map((item) => Number(item.vi))
  })
}
