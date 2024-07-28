/* eslint-disable */
import { g } from './common'
/**
 * Chapter7 城镇长距离供水输水管道水力学计算
 * 部分计算参考以下网址
 * https://raymondmcguire.github.io/?e=HYCAL&&theme=Image-Visual-Lab
 */
export module Chapter7 {

  /**
   * 7.1 塑料管道沿程水头损失(达西公式)
   * @param u
   * @param dj
   * @param v
   * @param l
   */
  export function slgdyctss(u: number, dj: number, v: number, l: number) {
    let R_e = u * dj / v
    let lambda = 0.25 / Math.pow(R_e, 0.226)
    let hy = lambda * l * u * u / (dj * 2 * g)
    // console.log(R_e);
    // console.log(lambda);
    // console.log(hy);
    return hy
  }

  /**
   * 7.2 混凝土管(渠)及采用水泥砂浆内衬的金属管道(谢才公式)
   * @param dj
   * @param n
   * @param u
   * @param l
   */
  export function hntgjsgd(dj: number, n: number, u: number, l: number) {
    let R = dj / 4
    let C = Math.pow(R, 1 / 6) / n
    let hy = u * u * l / (C * C * R)
    let i = hy / l
    // console.log(R);
    // console.log(C);
    // console.log(hy);
    // console.log(i);
    return [hy, i]
  }

  /**
   * 7.3 输配水管道、配水管网水力平差计算(海曾—威廉公式)
   * @param q
   * @param dj
   * @param Ch
   * @param l
   */
  export function spsgd(q: number, dj: number, Ch: number, l: number) {
    let hy = 10.67 * Math.pow(q, 1.852) * l / (Math.pow(Ch, 1.852) * Math.pow(dj, 4.87))
    let i = hy / l
    // console.log(hy);
    // console.log(i);
    return [hy, i]
  }

  /**
   * 7.4 管(渠)道局部损失
   * @param v
   * @param nj
   * @param ksij
   * @param hy
   */
  export function gdjbss(v: number, nj: Array<number>, ksij: Array<number>, hy: number) {
    let hj = 0
    for (let index = 0; index < nj.length; index++) {
      hj += nj[index] * ksij[index]
    }
    hj *= v * v / (2 * g)
    // console.log(hj);
    let hjd = hy * 0.1
    return [hj, hjd]
  }

  /**
   * 7.5 管(渠)道总水头损失
   * @param hy
   * @param hj
   */
  export function gdzstss(hy: number, hj: number) {
    let hz = hy + hj
    return hz
  }
}
