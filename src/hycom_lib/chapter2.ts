/*
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-03-11 21:19:00
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-06-12 15:04:10
 * @FilePath: \hycom_app\src\hycom_lib\chapter2.ts
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
 */
/* eslint-disable */
import { g, eqfm } from './common'
/**
 * Chapter2 水工隧洞水力学计算
 * 部分计算参考以下网址
 * https://raymondmcguire.github.io/?e=HYCAL&&theme=Image-Visual-Lab
 */
export module Chapter2 {

  /**
   * 2.1水工有压隧洞的水力学计算
   * 2.1.1水工有压隧洞流量的计算
   * @param miu 流量系数
   * @param a 出口断面洞高,m
   * @param b
   * @param T0 上游水面与隧洞出口底板高程差及上游行进流量水头之和
   * @param Hp 隧洞出口断面水流的平均单位势能
   * @returns Q
   */
  export function sgyysdlljs(miu: number, a: number, b: number, T0: number, Hp: number) {
    let Q = miu * a * b * Math.sqrt(2 * g * (T0 - Hp))
    return Q
  }


  /**
   * 2.2水面线计算
   * @param Qc
   * @param bc
   * @param bc1
   * @param nz
   * @param i
   * @param e
   * @param eplison
   * @param deltaL
   * @returns Q
   */
  export function sgysdsmxjs(Qc: number, bc: number, bc1: number, nz: number, i: number, e: number, eplison: number, deltaL: number) {
    let hk = Math.pow((Qc * Qc) / (bc * bc * g), 1 / 3)
    let Rk = bc * hk / (bc + 2 * hk)
    let Ck = 1 / nz * Math.pow(Rk, 1 / 6)
    let ik = ((Qc * Qc) / (bc * bc)) / (hk * hk * Ck * Ck * Rk)

    let h0 = e * eplison
    let theta = Math.atan(i)
    let lastR = (bc1 * h0) / (bc1 + 2 * h0)
    let lastv = Qc / (bc1 * h0)
    // console.log(h0);
    let h = h0
    let learningRate = 0.001
    let precision = 0.001
    if (i > ik) {
      // 急流
      for (let ii = 0; ii < 10000; ii++) {
        let R = (bc * h) / (bc + 2 * h)
        let v = Qc / (bc * h)
        let averv = (lastv + v) / 2
        let averR = (lastR + R) / 2
        let J = nz * nz * averv * averv / Math.pow(averR, 4 / 3)
        let rightValue = deltaL - ((eqfm(h, theta, 1, Qc, bc) - eqfm(h0, theta, 1, Qc, 8)) / (i - J))

        // console.log(h);
        let chkValue = Math.abs(rightValue)
        if (chkValue < precision) {
          // success
          // console.log(h);
          // console.log(eqfm(h0, theta, 1, Qc, 8));
          return h
        }

        h -= learningRate * rightValue
      }

      return -1
    } else {
      // 缓流
      return -1
    }
  }

  export function sgysdsmxjs2(Qc: number, bc: number, nz: number, i: number, h1: number, deltaL: number) {
    let theta = Math.atan(i)
    let lastR = (bc * h1) / (bc + 2 * h1)
    let lastv = Qc / (bc * h1)
    // console.log(lastR,lastv);
    let h = h1
    let learningRate = 0.001
    let precision = 0.001

    for (let ii = 0; ii < 10000; ii++) {
      let R = (bc * h) / (bc + 2 * h)
      let v = Qc / (bc * h)
      let averv = (lastv + v) / 2
      let averR = (lastR + R) / 2
      let J = nz * nz * averv * averv / Math.pow(averR, 4 / 3)
      let rightValue = deltaL - ((eqfm(h, theta, 1, Qc, bc) - eqfm(h1, theta, 1, Qc, bc)) / (i - J))

      // console.log(h);
      let chkValue = Math.abs(rightValue)
      if (chkValue < precision) {
        // success
        // console.log(h);
        // console.log(eqfm(h0, theta, 1, Qc, 8));
        return h
      }

      h += learningRate * rightValue
    }

    return -1
  }



  export function csff263(Q: number, b: number, h: number, l: number, i: number) {
    let q = Q / b
    let dc = Math.pow(q * q / g, 1 / 3)

    let dchSSL = 0.0916 * Math.pow((h / l), -1.276)
    let dch = dc / h

    // console.log(dc, q, dchSSL, dch)

    if (dch > dchSSL) {
      let dchHYL = 1.057 - 0.46 * (h / l)
      if (dch > dchHYL) {
        let alpha = Math.atan(i)
        let kStar = h * Math.cos(alpha)
        let FStar = q / Math.sqrt(g * kStar * kStar * kStar * Math.sin(alpha))
        let L1 = kStar * 9.719 * Math.pow(Math.sin(alpha), 0.0796) * Math.pow(FStar, 0.713)
        let d1 = kStar * 0.4034 / Math.pow(Math.sin(alpha), 0.04) * Math.pow(FStar, 0.592)
        let v = q / d1
        let L2 = 8.6 * Math.pow(q, 0.713) / (Math.pow(kStar, 0.0695) * Math.pow(Math.sin(alpha), 0.277))
        let ce = 0.9 * Math.sin(alpha)
        let x = 0.628 * (0.514 - ce) / (ce - (1 - ce))
        let thx = (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x))
        let fe = 0.5 * (1 + thx)
        let d0 = dc * Math.pow(fe / (8 * Math.sin(alpha)), 1 / 3)
        let v0 = q / d0

        let outStr = "L1=" + L1.toFixed(4).toString() + "; d1=" + d1.toFixed(4).toString() + "; v=" + v.toFixed(4).toString() + "; L2=" + L2.toFixed(4).toString() + "; d0=" + d0.toFixed(4).toString() + "; v0=" + v0.toFixed(4).toString()
        return outStr

      } else {
        return "请调整h和l的数值"
      }
    } else {
      return "跌水"
    }
    return Q
  }


  export function njslkxy263(Q: number, b: number, h: number, Hyan: number, H: number, L1DivH: number) {
    let q = Q / b
    let dc = Math.pow(q * q / g, 1 / 3)
    let dcDivH = dc / h
    let d0DivH = 0
    let d0 = 0
    let v0 = 0
    if (dcDivH >= 0.6 && dcDivH < 1.6) {
      d0DivH = -0.1 + 0.688 * dcDivH
      // console.log(d0DivH, dcDivH)

      if (d0DivH >= 0.31 && d0DivH < 1.0) {
        d0 = d0DivH * h
        v0 = Q / d0
      }
      else
        return "不符合条件,请重新调整参数计算"
    }
    else {
      d0DivH = 0.432 + 0.355 * dcDivH
      if (d0DivH >= 1.0) {
        d0 = d0DivH * h
        v0 = Q / d0
      }
      else
        return "不符合条件,请重新调整参数计算"
    }
    // console.log(dcDivH)
    // console.log(d0DivH)

    let L2 = 0
    let eta = 0
    if (dcDivH >= 0.6 && dcDivH < 1.8) {
      let L2DivH = 3.06 + 11.69 * dcDivH
      L2 = L2DivH * h

      let E = Hyan + H
      eta = (E - (d0 + v0 / (2 * g))) / E
    }
    else
      return "不符合条件,请重新调整参数计算"

    let outStr = "L1=" + (L1DivH * h).toFixed(4).toString() + "; L2=" + L2.toFixed(4).toString() + "; d0=" + d0.toFixed(4).toString() + "; v0=" + v0.toFixed(4).toString() + "; eta=" + eta.toFixed(4).toString()
    return outStr
  }
}
