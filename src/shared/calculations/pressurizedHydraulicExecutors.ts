import {
  g,
  Table2DLerp,
  TABLE413_DATA,
  TABLE413_HORIZON,
  TABLE413_VERTICAL,
  TABLE414_DATA,
  TABLE414_HORIZON,
  TABLE414_VERTICAL,
  TABLE415_DATA,
  TABLE415_HORIZON,
  TABLE415_VERTICAL,
  TABLE416_DATA,
  TABLE416_HORIZON,
  TABLE416_VERTICAL
} from '@/hycom_lib/common';
import type { DynamicParamDataStore } from '@/shared/calculations/dynamicParams';

export interface PressurizedTunnelLossInput {
  A_k: number | string;
  n_z: number | string;
}

export interface PressureLineInput {
  T_0: number | string;
  n_z: number | string;
  Q: number | string;
}

export interface ShortPipeInput {
  B: number | string;
  a: number | string;
  l_a: number | string;
  '\\phi': number | string;
  '\\varepsilon': number | string;
  n_z: number | string;
}

interface HydraulicExecutionContext<TInput> {
  input: TInput;
  params: DynamicParamDataStore;
}

interface HydraulicCollectors {
  area: number[];
  radius: number[];
  chezy: number[];
  zeta: number[];
}

const tableLerp = new Table2DLerp();

function getParamList(params: DynamicParamDataStore, refName: string): any[] {
  return params[refName] ?? [];
}

function getCircleArea(diameter: number): number {
  return Math.PI * diameter * diameter / 4;
}

function getAreaByShape(
  elem: any,
  options: { includeCount?: boolean; diameterKey?: string } = {}
): number {
  const { includeCount = false, diameterKey = 'd' } = options;

  if (elem.shape === 0) {
    return elem.H * elem.B * (includeCount ? elem.n : 1);
  }

  if (elem.shape === 1) {
    return getCircleArea(elem[diameterKey]);
  }

  return 0;
}

function getPerimeterByShape(
  elem: any,
  options: { includeCount?: boolean; diameterKey?: string } = {}
): number {
  const { includeCount = false, diameterKey = 'd' } = options;

  if (elem.shape === 0) {
    return 2 * (elem.H + elem.B) * (includeCount ? elem.n : 1);
  }

  if (elem.shape === 1) {
    return Math.PI * elem[diameterKey];
  }

  return 0;
}

function getTransitionArea(elem: any): number {
  return (elem.H * elem.B + getCircleArea(elem.d)) / 2;
}

function getTransitionPerimeter(elem: any): number {
  return (2 * (elem.H + elem.B) + Math.PI * elem.d) / 2;
}

function getRadius(area: number, perimeter: number): number {
  return area / perimeter;
}

function getChezy(radius: number, roughness: number): number {
  return Math.pow(radius, 1 / 6) / roughness;
}

function getRoundedBendZeta(elem: any): number {
  return (0.131 + 0.1632 * Math.pow(elem.D / elem.R, 3.5)) * Math.sqrt(elem.Theta / 90);
}

function getSharpBendZeta(elem: any): number {
  const sinVal = Math.sin(elem.Theta / 2 / 180 * Math.PI);
  return 0.946 * sinVal * sinVal + 2.05 * Math.pow(sinVal, 4);
}

function pushHydraulicCollector(
  collectors: HydraulicCollectors,
  area: number,
  perimeter: number,
  zeta: number,
  roughness: number
): void {
  const radius = getRadius(area, perimeter);
  collectors.area.push(area);
  collectors.radius.push(radius);
  collectors.chezy.push(getChezy(radius, roughness));
  collectors.zeta.push(zeta);
}

export function calculatePressurizedTunnelLoss(
  context: HydraulicExecutionContext<PressurizedTunnelLossInput>
): string {
  const { input, params } = context;
  const ak = Number(input.A_k);
  const nz = Number(input.n_z);

  let localEnergy = 0;
  let regionEnergy = 0;

  getParamList(params, 'jsk').forEach((elem: any) => {
    const area = getAreaByShape(elem, { includeCount: true });
    const prop = ak / area;
    localEnergy += prop * prop * elem.value;
  });

  getParamList(params, 'jklws').forEach((elem: any) => {
    const area = getAreaByShape(elem);
    const prop = ak / area;
    const zeta = elem.beta * Math.pow(elem.s / elem.b, 4 / 3) * Math.sin(elem.alpha / 180 * Math.PI);
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'jkmc').forEach((elem: any) => {
    const area = getAreaByShape(elem, { includeCount: true });
    const prop = ak / area;
    localEnergy += prop * prop * elem.value;
  });

  getParamList(params, 'jxbyxjsg').forEach((elem: any) => {
    const area = getTransitionArea(elem);
    const prop = ak / area;
    localEnergy += prop * prop * elem.value;
  });

  getParamList(params, 'yxjkd').forEach((elem: any) => {
    const area = getCircleArea(elem.d);
    const prop = ak / area;
    const k = tableLerp.arr(TABLE413_VERTICAL, TABLE413_HORIZON, TABLE413_DATA, 0, elem.alpha);
    const zeta = k * Math.pow(elem.omega2 / elem.omega1 - 1, 2);
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'yxjsd').forEach((elem: any) => {
    const area = getCircleArea(elem.d);
    const prop = ak / area;
    const k1 = tableLerp.arr(TABLE414_VERTICAL, TABLE414_HORIZON, TABLE414_DATA, 0, elem.alpha);
    const k2 = tableLerp.arr(TABLE415_VERTICAL, TABLE415_HORIZON, TABLE415_DATA, 0, elem.omega2 / elem.omega1);
    const zeta = k1 * k2;
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'dmtk').forEach((elem: any) => {
    const area = getAreaByShape(elem);
    const prop = ak / area;
    const zeta = Math.pow(1 - elem.omega1 / elem.omega2, 2);
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'dmts').forEach((elem: any) => {
    const area = getAreaByShape(elem);
    const prop = ak / area;
    const zeta = 0.5 * (1 - elem.omega2 / elem.omega1);
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'yxhwg').forEach((elem: any) => {
    const zeta = getRoundedBendZeta(elem);
    const area = getCircleArea(elem.D);
    const prop = ak / area;
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'yxjwg').forEach((elem: any) => {
    const area = getCircleArea(elem.D);
    const prop = ak / area;
    const zeta = getSharpBendZeta(elem);
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'yxbjxjsg').forEach((elem: any) => {
    const area = getTransitionArea(elem);
    const prop = ak / area;
    localEnergy += prop * prop * elem.value;
  });

  getParamList(params, 'ckmc').forEach((elem: any) => {
    const area = getAreaByShape(elem);
    const prop = ak / area;
    localEnergy += prop * prop * elem.value;
  });

  getParamList(params, 'pbm').forEach((elem: any) => {
    const area = elem.H * elem.a;
    const prop = ak / area;
    const zeta = tableLerp.arr(TABLE416_VERTICAL, TABLE416_HORIZON, TABLE416_DATA, 0, elem.e / elem.a);
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'csklrsk').forEach((elem: any) => {
    const area = getAreaByShape(elem);
    const prop = ak / area;
    localEnergy += prop * prop * elem.value;
  });

  getParamList(params, 'csklrmq').forEach((elem: any) => {
    const area = getAreaByShape(elem);
    const zeta = Math.pow(1 - elem.omega1 / elem.omega2, 2);
    const prop = ak / area;
    localEnergy += prop * prop * zeta;
  });

  getParamList(params, 'jkd').forEach((elem: any) => {
    const area = getAreaByShape(elem);
    const perimeter = getPerimeterByShape(elem);
    const radius = getRadius(area, perimeter);
    const akDivAi = ak / area;
    regionEnergy += elem.l * akDivAi * akDivAi / Math.pow(radius, 4 / 3);
  });

  getParamList(params, 'jkjbd').forEach((elem: any) => {
    const area1 = elem.H * elem.B;
    const perimeter1 = 2 * (elem.H + elem.B);
    const area2 = getCircleArea(elem.d);
    const perimeter2 = Math.PI * elem.d;
    const r1 = getRadius(area1, perimeter1);
    const r2 = getRadius(area2, perimeter2);
    const radius = (r1 + r2) / 2;
    const akDivAi = 2 * ak / (area1 + area2);
    regionEnergy += elem.l * akDivAi * akDivAi / Math.pow(radius, 4 / 3);
  });

  getParamList(params, 'ckjbd').forEach((elem: any) => {
    const area1 = elem.H * elem.B;
    const perimeter1 = 2 * (elem.H + elem.B);
    const area2 = getCircleArea(elem.d);
    const perimeter2 = Math.PI * elem.d;
    const r1 = getRadius(area1, perimeter1);
    const r2 = getRadius(area2, perimeter2);
    const radius = (r1 + r2) / 2;
    const akDivAi = 2 * ak / (area1 + area2);
    regionEnergy += elem.l * akDivAi * akDivAi / Math.pow(radius, 4 / 3);
  });

  getParamList(params, 'dsd').forEach((elem: any) => {
    const area = getAreaByShape(elem);
    const perimeter = getPerimeterByShape(elem);
    const radius = getRadius(area, perimeter);
    const akDivAi = ak / area;
    regionEnergy += elem.l * akDivAi * akDivAi / Math.pow(radius, 4 / 3);
  });

  regionEnergy = regionEnergy * 2 * g * nz * nz;

  const mu = 1 / Math.sqrt(1 + regionEnergy + localEnergy);
  return '流量系数=' + mu.toFixed(2).toString();
}

export function calculatePressureLine(
  context: HydraulicExecutionContext<PressureLineInput>
): string {
  const { input, params } = context;
  const flow = Number(input.Q);
  const roughness = Number(input.n_z);

  const localH: number[] = [];
  const regionH: number[] = [];
  const regionV: number[] = [];

  for (let i = 0; i < 1; i++) {
    const elem: any = getParamList(params, 'jsk')[i];
    const area = getAreaByShape(elem, { includeCount: true });
    const velocity = flow / area;
    localH.push(elem.value * velocity / (2 * g));
  }

  for (let i = 0; i < 1; i++) {
    const elem: any = getParamList(params, 'jkmc')[i];
    const area = getAreaByShape(elem, { includeCount: true });
    const velocity = flow / area;
    localH.push(elem.value * velocity / (2 * g));
  }

  for (let i = 0; i < 1; i++) {
    const elem: any = getParamList(params, 'jxbyxjsg')[i];
    const area = getTransitionArea(elem);
    const velocity = flow / area;
    localH.push(elem.value * velocity / (2 * g));
  }

  for (let i = 0; i < 2; i++) {
    const elem: any = getParamList(params, 'yxhwg')[i];
    const zeta = getRoundedBendZeta(elem);
    const area = getCircleArea(elem.D);
    const velocity = flow / area;
    localH.push(zeta * velocity / (2 * g));
  }

  for (let i = 0; i < 1; i++) {
    const elem: any = getParamList(params, 'yxbjxjsg')[i];
    const area = getTransitionArea(elem);
    const velocity = flow / area;
    localH.push(elem.value * velocity / (2 * g));
  }

  for (let i = 0; i < 1; i++) {
    const elem: any = getParamList(params, 'jkd')[i];
    const area = getAreaByShape(elem);
    const perimeter = getPerimeterByShape(elem);
    const radius = getRadius(area, perimeter);
    const velocity = flow / area;
    const chezy = getChezy(radius, roughness);
    const tmpH = elem.l * velocity * velocity / chezy / chezy / radius;
    regionH.push(tmpH);
    regionV.push(velocity);
  }

  for (let i = 0; i < 1; i++) {
    const elem: any = getParamList(params, 'jkjbd')[i];
    const area1 = elem.H * elem.B;
    const perimeter1 = 2 * (elem.H + elem.B);
    const area2 = getCircleArea(elem.d);
    const perimeter2 = Math.PI * elem.d;
    const r1 = getRadius(area1, perimeter1);
    const r2 = getRadius(area2, perimeter2);
    const radius = (r1 + r2) / 2;
    const velocity = 2 * flow / (area1 + area2);
    const chezy = getChezy(radius, roughness);
    const tmpH = elem.l * velocity * velocity / chezy / chezy / radius;
    regionH.push(tmpH);
    regionV.push(velocity);
  }

  for (let i = 0; i < 3; i++) {
    const elem: any = getParamList(params, 'dsd')[i];
    const area = getAreaByShape(elem);
    const perimeter = getPerimeterByShape(elem);
    const radius = getRadius(area, perimeter);
    const velocity = flow / area;
    const chezy = getChezy(radius, roughness);
    const tmpH = elem.l * velocity * velocity / chezy / chezy / radius;
    regionH.push(tmpH);
    regionV.push(velocity);
  }

  for (let i = 0; i < 1; i++) {
    const elem: any = getParamList(params, 'ckjbd')[i];
    const area1 = elem.H * elem.B;
    const perimeter1 = 2 * (elem.H + elem.B);
    const area2 = getCircleArea(elem.d);
    const perimeter2 = Math.PI * elem.d;
    const r1 = getRadius(area1, perimeter1);
    const r2 = getRadius(area2, perimeter2);
    const radius = (r1 + r2) / 2;
    const velocity = 2 * flow / (area1 + area2);
    const chezy = getChezy(radius, roughness);
    const tmpH = elem.l * velocity * velocity / chezy / chezy / radius;
    regionH.push(tmpH);
    regionV.push(velocity);
  }

  const regionT: number[] = [];
  const regionP: number[] = [];

  regionT.push(Number(input.T_0) - (localH[0] + localH[1] + regionH[0]));
  regionT.push(regionT[0] - (localH[2] + regionH[1]));
  regionT.push(regionT[1] - (localH[3] + regionH[2]));
  regionT.push(regionT[2] - (localH[4] + regionH[3]));
  regionT.push(regionT[3] - regionH[4]);
  regionT.push(regionT[4] - (localH[5] + regionH[5]));

  regionP.push(regionT[0] - regionV[0] * regionV[0] / 2 / g);
  regionP.push(regionT[1] - regionV[1] * regionV[1] / 2 / g);
  regionP.push(regionT[2] - regionV[2] * regionV[2] / 2 / g);
  regionP.push(regionT[3] - regionV[3] * regionV[3] / 2 / g);
  regionP.push(regionT[4] - regionV[4] * regionV[4] / 2 / g);
  regionP.push(regionT[5] - regionV[5] * regionV[5] / 2 / g);

  let outStr = '';

  for (let index = 0; index < regionP.length; index++) {
    const element = regionP[index];
    outStr += '断面压坡线P' + (index + 1).toString() + '=' + element.toFixed(2).toString() + ':';
    outStr += element > 2 ? '>2m水头; ' : '<2m水头; ';
  }

  return outStr;
}

export function calculateShortPipeCoefficient(
  context: HydraulicExecutionContext<ShortPipeInput>
): string {
  const { input, params } = context;
  const roughness = Number(input.n_z);
  const ac = Number(input.B) * Number(input.a) * Number(input['\\varepsilon']);
  const collectors: HydraulicCollectors = {
    area: [],
    radius: [],
    chezy: [],
    zeta: []
  };

  getParamList(params, 'jsk').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getAreaByShape(elem, { includeCount: true }),
      getPerimeterByShape(elem, { includeCount: true }),
      elem.value,
      roughness
    );
  });

  getParamList(params, 'jklws').forEach((elem: any) => {
    const zeta = elem.beta * Math.pow(elem.s / elem.b, 4 / 3) * Math.sin(elem.alpha / 180 * Math.PI);
    pushHydraulicCollector(
      collectors,
      getAreaByShape(elem),
      getPerimeterByShape(elem),
      zeta,
      roughness
    );
  });

  getParamList(params, 'jkmc').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getAreaByShape(elem, { includeCount: true }),
      getPerimeterByShape(elem, { includeCount: true }),
      elem.value,
      roughness
    );
  });

  getParamList(params, 'jxbyxjsg').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getTransitionArea(elem),
      getTransitionPerimeter(elem),
      elem.value,
      roughness
    );
  });

  getParamList(params, 'yxjkd').forEach((elem: any) => {
    const zeta = tableLerp.arr(TABLE413_VERTICAL, TABLE413_HORIZON, TABLE413_DATA, 0, elem.alpha)
      * Math.pow(elem.omega2 / elem.omega1 - 1, 2);
    pushHydraulicCollector(
      collectors,
      getCircleArea(elem.d),
      Math.PI * elem.d,
      zeta,
      roughness
    );
  });

  getParamList(params, 'yxjsd').forEach((elem: any) => {
    const k1 = tableLerp.arr(TABLE414_VERTICAL, TABLE414_HORIZON, TABLE414_DATA, 0, elem.alpha);
    const k2 = tableLerp.arr(TABLE415_VERTICAL, TABLE415_HORIZON, TABLE415_DATA, 0, elem.omega2 / elem.omega1);
    pushHydraulicCollector(
      collectors,
      getCircleArea(elem.d),
      Math.PI * elem.d,
      k1 * k2,
      roughness
    );
  });

  getParamList(params, 'dmtk').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getAreaByShape(elem),
      getPerimeterByShape(elem),
      Math.pow(1 - elem.omega1 / elem.omega2, 2),
      roughness
    );
  });

  getParamList(params, 'dmts').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getAreaByShape(elem),
      getPerimeterByShape(elem),
      0.5 * (1 - elem.omega2 / elem.omega1),
      roughness
    );
  });

  getParamList(params, 'yxhwg').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getCircleArea(elem.D),
      Math.PI * elem.d,
      getRoundedBendZeta(elem),
      roughness
    );
  });

  getParamList(params, 'yxjwg').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getCircleArea(elem.D),
      Math.PI * elem.d,
      getSharpBendZeta(elem),
      roughness
    );
  });

  getParamList(params, 'yxbjxjsg').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getTransitionArea(elem),
      getTransitionPerimeter(elem),
      elem.value,
      roughness
    );
  });

  getParamList(params, 'ckmc').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getAreaByShape(elem),
      getPerimeterByShape(elem),
      elem.value,
      roughness
    );
  });

  getParamList(params, 'pbm').forEach((elem: any) => {
    const area = elem.H * elem.a;
    const perimeter = 2 * (elem.H + elem.a);
    const zeta = tableLerp.arr(TABLE416_VERTICAL, TABLE416_HORIZON, TABLE416_DATA, 0, elem.e / elem.a);
    pushHydraulicCollector(collectors, area, perimeter, zeta, roughness);
  });

  getParamList(params, 'csklrsk').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getAreaByShape(elem),
      getPerimeterByShape(elem),
      elem.value,
      roughness
    );
  });

  getParamList(params, 'csklrmq').forEach((elem: any) => {
    pushHydraulicCollector(
      collectors,
      getAreaByShape(elem),
      getPerimeterByShape(elem),
      Math.pow(1 - elem.omega1 / elem.omega2, 2),
      roughness
    );
  });

  let localA = 0;
  let aa = 0;
  let ra = 0;
  let ca = 0;

  for (let index = 0; index < collectors.zeta.length; index++) {
    localA += collectors.zeta[index] * (ac / collectors.area[index]) * (ac / collectors.area[index]);
    aa += collectors.area[index];
    ra += collectors.radius[index];
    ca += collectors.chezy[index];
  }

  aa /= collectors.zeta.length;
  ra /= collectors.zeta.length;
  ca /= collectors.zeta.length;

  const regionA = 2 * g * Number(input.l_a) * (ac / aa) * (ac / aa) / (ca * ca * ra);
  const mu = Number(input['\\varepsilon']) / Math.sqrt(1 + localA + regionA);
  const muP = Number(input['\\varepsilon']) * Number(input['\\phi']);

  return '流量系数μ=' + mu.toFixed(4).toString() + '; 流量系数μ估=' + muP.toFixed(4).toString();
}
