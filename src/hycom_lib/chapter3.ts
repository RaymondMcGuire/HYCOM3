/* eslint-disable */
import { g } from './common'
/**
 * Chapter3 竖井式泄洪洞水力学计算
 * 部分计算参考以下网址
 * https://raymondmcguire.github.io/?e=HYCAL&&theme=Image-Visual-Lab
 */
export module Chapter3 {

  /**
   * 3.1环形堰竖井泄洪洞据算
   * 3.1.1泄流能力
   * @param bhxy
   * @param eplison
   * @param m
   * @param R
   * @param n0
   * @param S
   * @param H
   * @param miu
   * @param d
   * @param Y
   * @returns Q
   */
  export function xlnl(bhxy: boolean, eplison: number, m: number, R: number, n0: number,
    S: number, H: number, miu: number, d: number, Y: number) {
    let Q = 0
    // 环形堰竖井未淹没
    if (bhxy) {
      // 按环形堰流
      Q = eplison * m * (2 * Math.PI * R - n0 * S) * Math.sqrt(2 * g) * Math.pow(H, 3 / 2)
      // console.log(2*Math.PI*R - n0 * S);
    } else {
      // 按竖井有压孔流
      Q = miu * (Math.PI * d * d / 4) * Math.sqrt(2 * g * (H + Y))
    }
    // console.log(Q);
    return Q
  }

  /**
   * 3.2涡流式竖井泄洪洞
   * 3.2.1泄流能力
   * @param miu
   * @param d
   * @param H
   * @param deta
   * @param v0
   * @returns Q
   */
  export function wlsxlnl(miu: number, d: number, H: number, deta: number, v0: number) {
    let Q = miu * Math.PI * (d / 2) * (d / 2) * Math.sqrt(2 * g * (H + deta) + v0 * v0)
    // console.log(Q);
    return Q
  }
}
