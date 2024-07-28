/* eslint-disable */
import { g, shapeType, syyType, ssflSGD } from './common'
/**
 * Chapter5 渠道水力学计算
 * 部分计算参考以下网址
 * https://raymondmcguire.github.io/?e=HYCAL&&theme=Image-Visual-Lab
 */
export module Chapter5 {

  /**
   * 5.1明渠均匀流水力计算
   * @param st
   * @param b
   * @param i
   * @param n
   * @param Q
   * @param m
   * @returns resArray
   */
  export function mqjyls(st: shapeType, b: number, i: number, n: number, Q: number, m: number) {
    let h = 0
    if (st === shapeType.RECTANGLE) { h = Math.pow(n * Q / (Math.pow(2, 1 / 3) * Math.sqrt(i)), 3 / 8) } else if (st === shapeType.LADDER) { h = Math.pow(Math.pow(2, 8 / 3) * n * Q / (4 * (2 * Math.sqrt(1 + m * m) - m) * Math.sqrt(i)), 3 / 8) }

    let learningRate = 0.01

    let omiga = -1
    let Q0 = -1
    for (let ii = 0; ii < 10000; ii++) {
      if (st === shapeType.RECTANGLE) {
        omiga = b * h
        let x = b + 2 * h
        let R = omiga / x
        Q0 = (omiga * Math.pow(R, 2 / 3) * Math.sqrt(i)) / n
        h -= learningRate * (h - n * Q / (b * Math.pow(R, 2 / 3) * Math.sqrt(i)))
      } else if (st === shapeType.LADDER) {
        omiga = (b + m * h) * h
        let x = b + 2 * h * Math.sqrt(1 + m * m)
        let R = omiga / x
        Q0 = (omiga * Math.pow(R, 2 / 3) * Math.sqrt(i)) / n
        h -= learningRate * (h - n * Q / (Math.pow(R, 2 / 3) * Math.sqrt(i) * (b + m * h)))
      }

      let chk = Math.abs(Q0 - Q)
      if (chk < 0.001) {
        let v = Q / omiga
        let resArray = [h, v]
        // console.log(resArray);
        return resArray
      }
    }

    return [-1, -1]
  }

  /**
   * 5.2明渠非均匀流水面线计算
   * @param typeY
   * @param st
   * @param phi
   * @param h1
   * @param alpha
   * @param Q
   * @param b
   * @param m
   * @param nz
   * @param i
   * @param L
   * @param N
   * @param Qc
   * @param bc
   * @param H0
   * @param ib
   */
  export function mqfjyls(typeY: syyType, st: shapeType, phi: number, h1: number, alpha: number, Q: number, b: number, m: number, nz: number, i: number, L: number, N: number,
    Qc: number, bc: number, H0: number, ib: number) {
    let res = mqjyls(st, b, i, nz, Q, m)
    let precision = 0.001
    let h0 = res[0]
    let learningRate = 0.01
    let hk = 0
    let Ak = 0
    let xk = 0
    let Bk = 0

    if (st === shapeType.RECTANGLE) {
      hk = Math.pow((alpha * Q * Q) / (b * b * g), 1 / 3)
      Ak = b * hk
      xk = b + 2 * hk
      Bk = b
    } else if (st === shapeType.LADDER) {
      for (let ii = 0; ii < 10000; ii++) {
        let targetVal = alpha * Q * Q / g
        hk -= learningRate * ((((Math.pow((b + m * hk), 3) * hk * hk * hk) / (2 * m * targetVal)) - b / (2 * m)) - hk)
        let calValue = (Math.pow((b + m * hk), 3) * hk * hk * hk) / (b + 2 * m * hk)
        let chk = Math.abs(calValue - targetVal)
        if (chk < 0.001) {
          Ak = (b + m * hk) * hk
          xk = b + 2 * hk * Math.pow(1 + m * m, 0.5)
          Bk = b + m * hk
          break
        }
      }
    }

    let Rk = Ak / xk
    let Ck = Math.pow(Rk, 1 / 6) * 1 / nz
    let ik = g * xk / (alpha * Ck * Ck * Bk)

    let ValueH = 0

    let sltypeStr = ''
    if (i > ik) {
      if (h1 > hk && hk > h0) {
        // console.log("急流a2型壅水曲线");
        sltypeStr = '急流a2型壅水曲线'
      } else if (hk > h1 && h1 > h0) {
        // console.log("急流b2型降水曲线");
        sltypeStr = '急流b2型壅水曲线'
      } else if (hk > h0 && h0 > h1) {
        // console.log("急流c2型壅水曲线");
        sltypeStr = '急流c2型壅水曲线'
      }

      if (typeY === syyType.syy) {
        // 实用堰
        // SGD
        // identify h0
        let theta = Math.atan(ib)
        for (let t = 0; t < 10000; t++) {
          let h0Right = (Qc / bc / (phi * Math.sqrt(2 * g * (H0 - h0 * Math.cos(theta)))))
          h0 -= learningRate * (h0 - h0Right)

          let chkValue = Math.abs(h0 - (Qc / bc / (phi * Math.sqrt(2 * g * (H0 - h0 * Math.cos(theta))))))
          if (chkValue < precision) {
            // success
            ValueH = h0
            break
          }
        }
      } else if (typeY === syyType.kdy) {
        // 宽顶堰
        ValueH = hk
      }
    } else {
      if (h1 > h0 && h0 > hk) {
        // console.log("缓流a1型壅水曲线");
        sltypeStr = '缓流a1型壅水曲线'
      } else if (h0 > h1 && h1 > hk) {
        // console.log("缓流b1型降水曲线");
        sltypeStr = '缓流b1型壅水曲线'
      } else if (h0 > hk && hk > h1) {
        // console.log("缓流c1型壅水曲线");
        sltypeStr = '缓流c1型壅水曲线'
      }

      ValueH = h1
    }

    let outArray: any = []
    let deltaL = L / (N - 1)
    let theta = Math.atan(i)

    outArray.push(ValueH.toFixed(3))
    for (let nn = 0; nn < N - 1; nn++) {
      ValueH = ssflSGD(st, m, 0.01, ValueH, b, Q, nz, theta, i, alpha, deltaL, 0.001)
      outArray.push(ValueH.toFixed(3))
      // console.log(ValueH);
    }
    // console.log(sltypeStr);
    // console.log(outArray);
    return [sltypeStr, outArray]
  }

}
