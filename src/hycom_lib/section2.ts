/* eslint-disable */

import { g, syyType, shapeType, tfyType, jkdkbyType, ssflSGD, ccssmSGD } from './common'

export module Section2 {

  // 单孔侧收缩系数
  export function dkcssxs(B: number, b: number, K: number, P1: number, H: number, v0: number) {
    let H_0 = H + v0 * v0 / (2.0 * g)
    let epsilon = 1.0 - K * (1 - b / B) / Math.pow(0.2 + P1 / H_0, 1.0 / 3.0) * Math.pow(b / B, 1.0 / 4.0)
    return epsilon
  }

  // 多孔侧收缩系数
  export function ddkcssxs(B: number, b: number, K: number, P1: number, H: number, v0: number, d:number, n:number) {
    let H_0 = H + v0 * v0 / (2.0 * g)
    let deltaD = (B - n * b - (n - 1) * d) / 2.0
    let epsilonZ = 1.0 - K * (1 - b / (b + d)) / Math.pow(0.2 + P1 / H_0, 1.0 / 3.0) * Math.pow(b / (b + d), 1.0 / 4.0)
    let epsilonB = 1.0 - K * (1 - b / (b + deltaD)) / Math.pow(0.2 + P1 / H_0, 1.0 / 3.0) * Math.pow(b / (b + d), 1.0 / 4.0)
    let epsilon = (epsilonZ * (n - 2) + 2 * epsilonB) / n
    return epsilon
  }

  // 泄流能力计算
  export function kdyxlnljj(
    v0: number, H: number,
    n: number, B: number, b: number,
    d: number, K: number,
    P1: number, type: jkdkbyType) {
    let H0 = H + v0 * v0 / (2 * g)
    let P1divH0 = P1 / H0

    // console.log("H0:"+H0);
    // console.log("P1/H0:"+P1divH0);

    // 计算侧收缩系数
    let epsilon = dkcssxs(B, b, K, P1, H, v0)
    if (n > 1) { epsilon = ddkcssxs(B, b, K, P1, H, v0, d, n) }

    // 流量系数
    let m = 0
    if (type === jkdkbyType.fj) {
      if (P1divH0 <= 3) {
        m = 0.32 + 0.01 * (3 - P1divH0) / (0.46 + 0.75 * P1divH0)
      } else {
        m = 0.32
      }
    } else if (type === jkdkbyType.yj) {
      if (P1divH0 <= 3) {
        m = 0.36 + 0.01 * (3 - P1divH0) / (1.5 * P1divH0)
      } else {
        m = 0.36
      }
    }

    let Q = m * epsilon * n * b * Math.sqrt(2 * g) * Math.pow(H0, 1.5)

    let outObj = { "m": m, "Q": Q , "epsilon":epsilon}
    return outObj
  }



    //2.4.1 水平光面护坦上的水跃
    export function spghhtsdsyjs(Q: number, b: number, H0: number, phi:number) {
      // let phi = Math.sqrt(1- 0.1*Math.sqrt(E)/Math.pow((Q/b),1/3));
      // console.log(phi);

      let h1 = 10
      let learningRate = 0.01
      let precision = 0.001
      // identify h0
      for (let t = 0; t < 10000; t++) {
        let h1right = H0 - (Q / b) * (Q / b) / (2 * g * phi * phi * h1 * h1)
        h1 -= learningRate * h1right
  
        let chkValue = Math.abs(H0 - (Q / b) * (Q / b) / (2 * g * phi * phi * h1 * h1))
        if (chkValue < precision) {
          // success
          break
        }
      }
      // console.log(h1);
      let v1 = Q / (b * h1)
      let Fr1 = v1 / Math.sqrt(g * h1)
      let h2 = 0.5 * h1 * (Math.sqrt(1 + 8 * Fr1 * Fr1) - 1)
      // console.log(h2);
      let L = 0
      if (Fr1 >= 4.5 && Fr1 <= 15.5) {
        // 5.9 ~ 6.15
        L = 5.9 * h2
      } else {
        L = 9.4 * (Fr1 - 1) * h1
      }
      return L
    }

    

}
