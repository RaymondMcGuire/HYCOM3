/*
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-05-21 12:37:10
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-05-28 19:15:56
 * @FilePath: \hycom_app\src\hycom_lib\chapter1.ts
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
 */
/* eslint-disable */
import { g, syyType, shapeType, tfyType, jkdkbyType, ssflSGD, ccssmSGD } from './common'
/**
 * Chapter1 溢洪道水力学计算
 * 部分计算参考以下网址
 * https://raymondmcguire.github.io/?e=HYCAL&&theme=Image-Visual-Lab
 */
export module Chapter1 {

  /**
   * 1.1泄流能力计算
   * 1.1.1开敞式幂曲线实用堰
   * @param n 闸孔数目
   * @param b 单孔宽度
   * @param P1 上游堰高
   * @param Hd 定型设计水头,m,对于高堰, Hd = (75% ~ 95)Hmax ,Hmax为校核流量对应的水头
   * @param H 堰上水头,m,取堰前 0 0 3H ~ 6H 处;
   * @param v0 引渠的行进流速,m/s;
   * @param C 上游坡角修正系数
   * @param m 流量系数
   * @param epsilon 侧收缩系数
   * @param sigmam 淹没系数
   * @returns Q PMF下泄量
   */
  export function kcsmqxsyy(n: number, b: number, H0: number,
    C: number, m: number, epsilon: number,
    sigmam: number) {
    let B = n * b
    // console.log("H0:"+H0);
    let Q = C * m * epsilon * sigmam * B * Math.sqrt(2 * g) * Math.pow(H0, 1.5)
    return Q
  }

  /**
   * 1.1泄流能力计算
   * 1.1.2宽顶堰
   * @param v0 堰前 0 0 3H ~ 6H 行进流速
   * @param H 堰上水头
   * @param epsilon 侧收缩系数
   * @param n 孔数
   * @param b 单孔宽度
   * @param P1 上游堰高
   * @param bedge 堰进口底坎边缘:方角true,圆角false
   * @returns Q 泄流能力
   */
  export function kdy(
    v0: number, H: number,
    n: number, B: number, b: number,
    d: number, K: number,
    P1: number, type: jkdkbyType) {
    let H0 = H + v0 * v0 / (2 * g)
    let P1divH0 = P1 / H0

    // console.log("H0:"+H0);
    // console.log("P1/H0:"+P1divH0);

    // 计算侧收缩系数
    let epsilon = 1 - K * ((1 - b / B) / (Math.pow(0.2 + P1 / H0, 1 / 3))) * (Math.pow(b / B, 1 / 4))

    if (n > 1) {
      let deltaD = (B - n * b - (n - 1) * d) / 2
      let epsilonZ = 1 - K * ((1 - b / (b + d)) / (Math.pow(0.2 + P1 / H0, 1 / 3))) * (Math.pow(b / (b + d), 1 / 4))
      let epsilonB = 1 - K * ((1 - b / (b + deltaD)) / (Math.pow(0.2 + P1 / H0, 1 / 3))) * (Math.pow(b / (b + d), 1 / 4))
      epsilon = (epsilonZ * (n - 2) + 2 * epsilonB) / n

      // console.log("deltaD:" + deltaD);
      // console.log("epsilonZ:" + epsilonZ);
      // console.log("epsilonB:" + epsilonB);
      // console.log("epsilon:" + epsilon);
    }



    // 流量系数
    let m = 0
    if (type == jkdkbyType.fj) {
      if (P1divH0 <= 3) {
        m = 0.32 + 0.01 * (3 - P1divH0) / (0.46 + 0.75 * P1divH0)
      } else {
        m = 0.32
      }
    } else if (type == jkdkbyType.yj) {
      if (P1divH0 <= 3) {
        m = 0.36 + 0.01 * (3 - P1divH0) / (1.5 * P1divH0)
      } else {
        m = 0.36
      }
    }
    //console.log("m:" + m);
    let Q = m * epsilon * n * b * Math.sqrt(2 * g) * Math.pow(H0, 1.5)
    //console.log("Q:" + Q);
    let outObj = { 'm': m, 'Q': Q }
    return outObj
  }

  /**
   * 1.1泄流能力计算
   * 1.1.3驼峰堰
   * @param P1 上游堰高
   * @param v0
   * @param H
   * @param epsilon 侧收缩系数
   * @param n 孔数
   * @param b 单孔宽度
   * @param btype a型true,b型false
   * @returns Q
   */
  export function tfy(P1: number, v0: number, H: number,
    epsilon: number, n: number, b: number,
    type: tfyType) {
    let H0 = H + v0 * v0 / (2 * g)
    let P1divH0 = P1 / H0

    // console.log("H0:"+H0);
    // console.log("P1/H0:"+P1divH0);

    let m = 0
    if (type == tfyType.a) {
      if (P1divH0 <= 0.24) {
        m = 0.385 + 0.171 * Math.pow(P1divH0, -0.657)
      } else {
        m = 0.414 * Math.pow(P1divH0, -0.0652)
      }
    } else if (type == tfyType.b) {
      if (P1divH0 <= 0.34) {
        m = 0.385 + 0.224 * Math.pow(P1divH0, 0.934)
      } else {
        m = 0.452 * Math.pow(P1divH0, -0.032)
      }
    }

    // console.log("m:"+m);
    let Q = m * epsilon * n * b * Math.sqrt(2 * g) * Math.pow(H0, 1.5)
    let outObj = { 'm': m, 'Q': Q }
    return outObj
  }

  /**
   * 1.1.4带胸墙孔口泄流能力
   * 1.1.4.1带胸墙实用堰
   * @param H
   * @param v0 堰前 0 0 3H ~ 6H 处断面的平均流速,m/s;
   * @param b 单孔宽度,m;
   * @param n 孔数目;
   * @param P1
   * @param Hd 定型设计水头,m, 可按堰顶以上最大水头Hmax的56%~77%;
   * @param D 孔口高度,m;
   * @returns Q
   * */
  export function dxqsyy(H: number, v0: number,
    b: number, n: number, P1: number, Hd: number,
    D: number) {
    let H0 = H + v0 * v0 / (2 * g)
    let P1divHd = P1 / Hd
    let mu = 0
    let HdivD = H / D
    if (P1divHd > 0.6) {
      mu = 0.7 + 0.1 * (HdivD - 2)
    } else {
      mu = 0.6 + 0.1 * (HdivD - 1.5)
    }

    let Q = mu * n * b * D * Math.sqrt(2 * g * H0)

    let outObj = { 'mu': mu, 'Q': Q }
    return outObj
  }

  /**
   * 1.1.4带胸墙孔口泄流能力
   * 1.1.4.2带胸墙平底闸泄流计算
   * @param H 堰上水头
   * @param v0 堰前 0 0 3H ~ 6H 处断面的平均流速,m/s;
   * @param b 单孔宽度,m;
   * @param n 孔数目;
   * @param mu 流量系数,圆滑孔口的流量系数在设计时可取0.90
   * @param D 孔口高度,m;
   * @returns Q
   * */
  export function dxqpdzxljs(H: number, v0: number,
    b: number, n: number, mu: number,
    D: number) {
    let H0 = H + v0 * v0 / (2 * g)

    let Q = mu * n * b * D * Math.sqrt(2 * g * (H0 - D))
    return Q
  }

  /**
   * 1.2泄槽水面线计算
   * @param type 实用堰类型
   * @param Qc 单个泄槽流量,m^3/s
   * @param bc 单个泄槽宽,m
   * @param nz 糙率
   * @param i 泄槽底坡
   * @param phi 流速系数,一般0.95 左右
   * @param H0 计算起始断面渠底以上总水头
   * @param N 断面数
   * @param L 泄槽长
   * @param alpha 掺气水深系数,取1~1.4s/m
   */
  export function slotSurfaceLine(type: syyType, Qc: number, bc: number, nz: number, i: number, phi: number, H0: number, N: number, L: number, alpha: number) {
    let hk = Math.pow((Qc * Qc) / (bc * bc * g), 1 / 3)
    let Rk = bc * hk / (bc + 2 * hk)
    let Ck = 1 / nz * Math.pow(Rk, 1 / 6)
    let ik = ((Qc * Qc) / (bc * bc)) / (hk * hk * Ck * Ck * Rk)
    // let outStr = "L断面水深:";
    let outArray: any = []

    let h0 = 0
    let learningRate = 0.01
    let theta = Math.atan(i)
    let precision = 0.001
    if (i > ik) {
      // 急流
      if (type === syyType.syy) {
        // 实用堰
        // SGD

        // identify h0
        for (let t = 0; t < 10000; t++) {
          let h0right = (Qc / bc / (phi * Math.sqrt(2 * g * (H0 - h0 * Math.cos(theta)))))
          h0 -= learningRate * (h0 - h0right)

          let chkValue = Math.abs(h0 - (Qc / bc / (phi * Math.sqrt(2 * g * (H0 - h0 * Math.cos(theta))))))
          if (chkValue < precision) {
            // success
            break
          }
        }
      } else if (type === syyType.kdy) {
        // 宽顶堰
        h0 = hk
      }

      // identify h0 - hn
      let deltaL = L / (N - 1)
      let outH = h0
      // console.log(outH);
      // outStr += outH.toFixed(3) + "|";
      outArray.push(outH.toFixed(3))
      for (let nn = 0; nn < N - 1; nn++) {
        outH = ssflSGD(shapeType.RECTANGLE, 0, learningRate, outH, bc, Qc, nz, theta, i, alpha, deltaL, precision)
        // outStr += outH.toFixed(3) + "|";
        outArray.push(outH.toFixed(3))
        // console.log(outH);
      }
    } else {
      // 输出缓流
      // outStr += "缓流";
      // console.log('缓流')
    }

    // return outStr;
    return outArray
  }
  /**
   * 1.3水流空化数计算程序框图
   * @param nabla
   * @param H
   * @param hv
   * @param v
   * @returns S
   *  */
  export function slkqhs(nabla: number, H: number, hv: number, v: number) {
    let ha = 1.33 - nabla / 900
    let sigma = (H + ha - hv) / (v * v / (2 * g))
    let out = '不需要设掺气坎'
    if (sigma < 0.3) {
      out = '需要设掺气坎'
    }

    let outObj = { 'sigma': sigma, 'out': out }
    // console.log(sigma);
    return outObj
  }

  /**
   * 1.4挑流消能挑距和冲坑计算
   * 1.4.1 挑距
   * @param Hksw
   * @param Hbk
   * @param v0
   * @param h
   * @param theta
   * @param h2
   * @param t
   * @returns L
   */
  export function tj(Hksw: number, Hbk: number, v0: number,
    h: number, theta: number, h2: number, t: number) {
    theta = Math.PI * theta / 180
    let H0 = (Hksw - Hbk) + v0 * v0 / 19.6
    let h1 = h / Math.cos(theta)
    // console.log("h1="+h1);
    // console.log("H0="+(Hksw - Hbk));
    let v1 = 0.95 * Math.sqrt(2 * g * (H0 - h1))
    // console.log("v1="+v1);

    let L = (Math.sin(theta) + Math.sqrt(Math.sin(theta) * Math.sin(theta) + 2 * g * (h1 + h2) / (v1 * v1))) * Math.cos(theta) * v1 * v1 / g

    let tanbeta = Math.sqrt(Math.tan(theta) * Math.tan(theta) + 2 * g * (h2 + h * Math.cos(theta)) / (v1 * v1 * Math.cos(theta) * Math.cos(theta)))
    let Lc = t / tanbeta
    // console.log(Lc);
    let Ltotal = L + Lc
    return Ltotal
  }

  /**
   * 1.4挑流消能挑距和冲坑计算
   * 1.4.2 冲坑计算
   * @param Hup
   * @param Hdown
   * @param K
   * @param Q
   * @param b
   * @param Hdowndeep 下游水深
   * @returns T
  */
  export function ckjs(Hup: number, Hdown: number, K: number,
    Q: number, b: number, Hdowndeep: number) {
    let H = Hup - Hdown
    let t = K * Math.sqrt(Q / b) * Math.pow(H, 0.25)
    let T = t - Hdowndeep
    return T
  }

  /**
   * 1.5底流消能计算
   * 1.5.1 水平光滑护坦上的水跃计算
   * @param Q
   * @param b
   * @param H0
   * @returns
  */
  export function spghhtsdsyjs(Q: number, b: number, H0: number) {
    // let phi = Math.sqrt(1- 0.1*Math.sqrt(E)/Math.pow((Q/b),1/3));
    // console.log(phi);
    let phi = 0.8

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

  /**
   * 1.5底流消能计算
   * 1.5.2 下挖式消力池水跃计算
   * @param Q
   * @param b
   * @param H0
   * @param phi
   * @param ht
   * @param sigma
   * @returns
  */
  export function xwsxlcsyjs(Q: number, b: number, H0: number, phi: number,
    ht: number, sigma: number) {
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

    let v1 = Q / (b * h1)
    let Fr1 = v1 / Math.sqrt(g * h1)
    let h2 = 0.5 * h1 * (Math.sqrt(1 + 8 * Fr1 * Fr1) - 1)
    // console.log(h2);
    let deltaZ = (Q * Q / (2 * g * b * b)) * ((1 / (phi * phi * ht * ht)) - (1 / (sigma * sigma * h2 * h2)))
    // console.log(deltaZ);
    let s = sigma * h2 - ht - deltaZ
    // console.log(s);
    let L = 5.9 * h2
    let Lk = 0.8 * L
    let outObj = { 'Lk': Lk, 's': s }
    return outObj
  }

  /**
   * 1.6 侧槽溢洪道水力学计算
   * 1.6.1 侧槽断溢流前缘的总长度计算
   * @param Q 溢洪道最大泄流流量,m3/s
   * @param m 流量系数,根据堰型选用;可采用实用堰、宽顶堰河梯形堰等,实际工程以实用堰居多
   * @param H 堰上水头,m,取堰前3H0 ~ 6H0处
   * @param v0 引渠的行进流速,m/s
   * @param eplisonk 侧槽溢流堰侧收缩系数,无闸实用堰,两边侧墙圆角到直角取0.7~1.0
   *
   */
  export function cydylqydzcdjs(Q: number, m: number, H: number, v0: number, eplisonk: number) {
    let H0 = H + v0 * v0 / (2 * g)
    let L = Q / (eplisonk * m * Math.sqrt(2 * g) * Math.pow(H0, 3 / 2))
    return L
  }

  /**
   * 1.6 侧槽溢洪道水力学计算
   * 1.6.2 侧槽断水面线计算
   * @param Q 溢洪道最大泄流流量,m3/s
   * @param m 流量系数,根据堰型选用;可采用实用堰、宽顶堰河梯形堰等,实际工程以实用堰居多
   * @param H 堰上水头,m,取堰前3H0 ~ 6H0处
   * @param v0 引渠的行进流速,m/s
   * @param eplisonk 侧槽溢流堰侧收缩系数,无闸实用堰,两边侧墙圆角到直角取0.7~1.0
   * @param bs
   * @param bm
   * @param N
   * @param nz
   * @param i
   * @returns outArray
   */
  export function ccdsmxjs(Q: number, m: number, H: number, v0: number, eplisonk: number,
    bs: number, bm: number, N: number, nz: number, i: number) {
    let L = cydylqydzcdjs(Q, m, H, v0, eplisonk)
    let hk = Math.pow(Q * Q / (bm * bm * g), 1 / 3)
    let hm = hk * (1.2 - 0.3 * ((bs / bm) - 1))
    // let outStr = "侧槽内水面线水深:";
    let outArray: any = []
    let n = 1
    let bn = bs + (bm - bs) / L * (L - (n - 1) * L / (N - 1))
    let vn = Q / (bn * hm)
    let Rn = bn * hm / (bn + 2 * hm)

    let Qn = Q
    let deltaH = 0
    let delta = i * L / (N - 1)

    // outStr += hm.toFixed(4) + "|";
    outArray.push(hm.toFixed(4))
    for (let ii = 2; ii < N + 1; ii++) {
      let res = ccssmSGD(nz, bs, bm, Q, L, N, ii, delta, hm, vn, Rn, Qn, deltaH)
      hm = res[0]
      if (hm !== -1) {
        // outStr += hm.toFixed(4) + "|";
        outArray.push(hm.toFixed(4))
        deltaH = res[1]
        vn = res[2]
        Rn = res[3]
        Qn = res[4]
      }
    }

    return outArray
  }
}
