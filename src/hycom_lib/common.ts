/*
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-05-21 12:37:10
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-05-21 14:17:33
 * @FilePath: \hycom_app\src\hycom_lib\common.ts
 * @Description: 通用变量
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
 */

export const g = 9.8

// 实用堰类型
export enum syyType {
  syy, // 实用堰
  kdy // 宽顶堰
}

// 驼峰堰类型
export enum tfyType {
  a, // a型
  b // b型
}

// 进口底坎边缘
export enum jkdkbyType {
  fj, // 方角
  yj // 圆角
}

// 形状类型
export enum shapeType {
  RECTANGLE,
  LADDER
}

// 断面形状类型
export enum crossSectionShapeType {
  RECTANGLE,
  CIRCLE
}

// 弧门状态
export enum curveDoorStatusType {
  AOPEN,
  POPEN
}

// α和k的关系表
export const TABLE413_DATA = [
  [0.14, 0.16, 0.22, 0.3, 0.42, 0.62]
]
export const TABLE413_VERTICAL = [0]
export const TABLE413_HORIZON = [8, 10, 12, 15, 20, 25]

// α和k1的关系表
export const TABLE414_DATA = [
  [0.4, 0.25, 0.2, 0.2, 0.3, 0.4, 0.6]
]
export const TABLE414_VERTICAL = [0]
export const TABLE414_HORIZON = [10, 20, 40, 60, 80, 100, 140]

// omega1&2 和k2的关系表
export const TABLE415_DATA = [
  [0.41, 0.4, 0.38, 0.36, 0.34, 0.3, 0.27, 0.2, 0.16, 0.1, 0]
]
export const TABLE415_VERTICAL = [0]
export const TABLE415_HORIZON = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]

// θ与ζ关系表
export const TABLE416_DATA = [
  [0.022, 0.073, 0.183, 0.365, 0.99, 1.86]
]
export const TABLE416_VERTICAL = [0]
export const TABLE416_HORIZON = [15, 30, 45, 60, 90, 120]

// e/a与 关系表
export const TABLE418_DATA = [
  [0.05, 0.05, 0.04, 0.02]
]
export const TABLE418_VERTICAL = [0]
export const TABLE418_HORIZON = [0.1, 0.7, 0.8, 0.9]

// 泄槽水面线SGD
export function eqfm(h: number, theta: number, alpha: number, qc: number, bc: number) {
  let v = qc / (bc * h)
  return h * Math.cos(theta) + alpha * v * v / (2 * g)
}

export function ssflSGD(sType: shapeType, m: number, learningRate: number, lastH: number,
  bc: number, qc: number, n: number, theta: number,
  i: number, alpha: number, deltaL: number,
  precision: number) {
  let h = lastH
  let omega = 0
  let x = 0

  if (sType === shapeType.RECTANGLE) {
    omega = bc * h
    x = (bc + 2 * h)
  } else if (sType === shapeType.LADDER) {
    omega = (bc + m * h) * h
    x = (bc + 2 * h * Math.sqrt(1 + m * m))
  }

  let lastR = omega / x
  let lastV = qc / omega
  let lastC = Math.pow(lastR, 1 / 6) * 1 / n

  let minVal = 99999
  let minH = 0
  let flag = true
  for (let ii = 0; ii < 10000; ii++) {
    if (sType === shapeType.RECTANGLE) {
      omega = bc * h
      x = (bc + 2 * h)
    } else if (sType === shapeType.LADDER) {
      omega = (bc + m * h) * h
      x = (bc + 2 * h * Math.sqrt(1 + m * m))
    }

    let R = omega / x
    let v = qc / omega
    let C = Math.pow(R, 1 / 6) * 1 / n
    let avgV = (lastV + v) / 2
    let avgR = (lastR + R) / 2
    let avgC = (lastC + C) / 2
    let J = avgV * avgV / (avgR * avgC * avgC)
    let rightValue = ((eqfm(lastH, theta, alpha, qc, bc) + deltaL * (i - J)) - (alpha * v * v / (2 * g))) / (Math.cos(theta))
    h -= learningRate * Math.abs(h - rightValue)

    let chkValue = Math.abs(Math.abs((eqfm(h, theta, alpha, qc, bc) - eqfm(lastH, theta, alpha, qc, bc)) / (i - J)) - deltaL)

    if (chkValue < minVal && flag) {
      minVal = chkValue
      minH = h
    } else {
      flag = false
    }

    if (chkValue < precision) {
      // success
      return h
    }
  }

  // console.log("精度无法达到,当前精度为:" + minVal);
  // console.log("h为:" + minH);
  return minH
}

// 侧槽断水面线sgd
export function ccssmSGD(nZ: number, bS: number, bM: number, Q: number, L: number, N: number, sN: number, delta: number,
  lastH: number, lastV: number, lastR: number, lastQ: number, dH: number) {
  let learningRate = 0.01
  let bn = bS + (bM - bS) / L * (L - (sN - 1) * L / (N - 1))
  let Qn = Q - (Q / L) * (sN - 1) * (L / (N - 1))

  let deltaH = dH
  for (let ii = 0; ii < 10000; ii++) {
    let hn = lastH + deltaH - delta
    let vn = Qn / (bn * hn)
    let Rn = bn * hn / (bn + 2 * hn)
    let avgV = (lastV + vn) / 2
    let avgR = (lastR + Rn) / 2
    let averJ = avgV * avgV * nZ * nZ / (Math.pow(avgR, 4 / 3))
    let _deltaH = (lastQ * (lastV + vn) / (g * (lastQ + Qn))) * ((lastV - vn) + vn * (lastQ - Qn) / lastQ) + averJ * L / (N - 1)
    let _hn = lastH + _deltaH - delta
    deltaH -= learningRate * (deltaH - _deltaH)
    let chk = Math.abs(_hn - hn)
    if (chk < 0.001) {
      // console.log("_______________________");
      // console.log("当前断面n下标:" + sN);
      // console.log("dH:" + dH);
      // console.log("H:" + hn);
      return [hn, deltaH, vn, Rn, Qn]
    }
  }

  return [-1]
}

export class Table2DLerp {
  /**
       * Function for single linear interpolation for known points
       * Input: 4 pts and 1 given pt
       */
  private spt(a1: number, a2: number, b1: number, b2: number, givenA: number) {
    if (a1 === a2) {
      return (b1 + b2) / 2
    }
    return (b1 + (givenA - a1) * (b2 - b1) / (a2 - a1))
  }

  private dpt(a1: number, a2: number, b1: number, b2: number, c1: number, c2: number, c3: number, c4: number, givenA: number, givenB: number) {
    let slerp1 = this.spt(a1, a2, c1, c2, givenA)
    let slerp2 = this.spt(a1, a2, c3, c4, givenA)

    return this.spt(b1, b2, slerp1, slerp2, givenB)
  }

  private getMatrixCol(matrix: Array<Array<number>>, col: number) {
    var colArray: any = []
    for (var i = 0; i < matrix.length; i++) {
      colArray.push(matrix[i][col])
    }
    return colArray
  }

  private getLerpIndices(array: Array<number>, searchEl: number) {
    var currIndex
    var currEl
    var minIndex = 0
    var maxIndex = array.length - 1

    // Edge case for when searchEl is equal to last element in array
    if (array[maxIndex] === searchEl) {
      return {
        lowIndex: maxIndex,
        highIndex: maxIndex
      }
    } else if (searchEl > array[maxIndex] || searchEl < array[minIndex]) {
      // SearchEl outside of Array A
      return {
        lowIndex: -1,
        highIndex: -1
      }
    }

    while (minIndex <= maxIndex) {
      currIndex = (minIndex + maxIndex) / 2 | 0
      currEl = array[currIndex]

      if (currEl < searchEl) {
        minIndex = currIndex + 1
      } else if (currEl > searchEl) {
        maxIndex = currIndex - 1
      } else { // Search val in array
        return {
          lowIndex: currIndex,
          highIndex: currIndex
        }
      }
    }
    return { // Search val not in array
      lowIndex: maxIndex,
      highIndex: maxIndex + 1
    }
  }

  public arr(arrayA: Array<number>, arrayB: Array<number>, matrixC: Array<Array<number>>, givenA: number, givenB: number) {
    var slerpIndicesArrA = this.getLerpIndices(arrayA, givenA)
    var slerpIndicesArrB = this.getLerpIndices(arrayB, givenB)

    try {
      var a1 = arrayA[slerpIndicesArrA.lowIndex]
      var a2 = arrayA[slerpIndicesArrA.highIndex]
      var b1 = arrayB[slerpIndicesArrB.lowIndex]
      var b2 = arrayB[slerpIndicesArrB.highIndex]

      // Get arrays from matrix
      var colC1 = this.getMatrixCol(matrixC, slerpIndicesArrB.lowIndex)
      var colC2 = this.getMatrixCol(matrixC, slerpIndicesArrB.highIndex)

      var c1 = colC1[slerpIndicesArrA.lowIndex]
      var c2 = colC1[slerpIndicesArrA.highIndex]
      var c3 = colC2[slerpIndicesArrA.lowIndex]
      var c4 = colC2[slerpIndicesArrA.highIndex]

      return this.dpt(a1, a2, b1, b2, c1, c2, c3, c4, givenA, givenB)
    } catch (err) {
      console.log('%cError: Search elements must be within arrays.', 'color:red')
      return Number.NaN
    }
  }
}
