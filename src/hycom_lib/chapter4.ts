/* eslint-disable */
import { g } from './common'
/**
 * Chapter4 砼重力(拱)坝坝身泄水建筑物水力学计算
 * 部分计算参考以下网址
 * https://raymondmcguire.github.io/?e=HYCAL&&theme=Image-Visual-Lab
 */
export module Chapter4 {

  /**
   * 4.1开敞式溢流堰的泄量
   * @param C
   * @param m
   * @param eplison
   * @param sigmaM
   * @param n
   * @param B
   * @param Hw
   * @returns Q
   */
  export function kcsylydxl(C: number, m: number, eplison: number, sigmaM: number, n: number, B: number, Hw: number) {
    let Q = C * m * eplison * sigmaM * n * B * Math.sqrt(2 * g) * Math.pow(Hw, 3 / 2)
    // console.log(Q);
    return Q
  }

  /**
   * 4.2孔口泄流计算
   * @param Ai
   * @param ksii
   * @param Aj
   * @param Xj
   * @param lj
   * @param nz
   * @param Ak
   * @param n
   * @param Hw
   * @returns Q
   */
  export function kkxljs(Ai: Array<number>, ksii: Array<number>, Aj: Array<number>, Xj: Array<number>, lj: Array<number>, nz: number, Ak: number, n: number, Hw: number) {
    let Rj = new Array<number>(Aj.length)
    for (let index = 0; index < Rj.length; index++) {
      Rj[index] = Aj[index] / Xj[index]
    }

    let sumi = 0
    let sumj = 0
    for (let index = 0; index < Ai.length; index++) {
      sumi += ksii[index] * Math.pow((Ak / Ai[index]), 2)
    }

    for (let index = 0; index < Aj.length; index++) {
      sumj += (2 * g * nz * nz * lj[index] / Math.pow(Rj[index], 4 / 3)) * Math.pow((Ak / Aj[index]), 2)
    }

    let mu = 1 / (Math.sqrt(1 + sumi + sumj))
    // console.log(mu);
    let Q = mu * n * Ak * Math.sqrt(2 * g * Hw)
    let Vk = Q / (n * Ak)
    // console.log(Q);
    // console.log(Vk);
    return [Q, Vk, mu]
  }


  export function yygdll(mu: number, a: number, b: number, T0: number, hp: number) {
    return mu * a * b  * Math.sqrt(2 * g * (T0 - hp))
  }


  /**
   * 4.3水面波动及掺气计算
   * @param h
   * @param zeta
   * @param v
   * @returns hb
   *
   */
  export function smbdjsqjs(h: number, zeta: number, v: number) {
    let hb = (1 + zeta * v / 100) * h
    // console.log(hb);
    return hb
  }



  /**
   * 4.5底流消能水力计算
   * @param E
   * @param Q
   * @param b
   * @param H0
   * @returns
   * */
  export function dlxnsljs(E: number, Q: number, b: number, H0: number) {
    let phi = Math.sqrt(1 - 0.1 * Math.pow(E, 1 / 2) / Math.pow((Q / b), 1 / 3))
    // console.log(phi);
    phi = 0.8 // 低坝

    let h0 = 10
    let learningRate = 0.01
    let precision = 0.001
    for (let index = 0; index < 10000; index++) {
      let rightValue = (H0 - Math.pow((Q / b), 2) / (2 * g * phi * phi * h0 * h0)) - h0
      if (Math.abs(rightValue) < precision) {
        // console.log(h0);
        let v1 = Q / (b * h0)
        let Fr1 = v1 / Math.sqrt(g * h0)
        let h2 = h0 * (Math.sqrt(1 + 8 * Fr1 * Fr1) - 1) / 2
        let L = -1
        if (Fr1 > 4.5) {
          L = 6 * (h2 - h0)
        }
        // console.log(v1);
        // console.log(h2);
        // console.log(Fr1);
        // console.log(L);
        return [h0, h2, Fr1, L]
      }
      h0 -= learningRate * rightValue
    }

    return [-1]
  }

      /**
   * 2.1水工有压隧洞的水力学计算
   * 2.1.2有压短管的无压隧洞泄量计算
   * @param mu 流量系数
   * @param B
   * @param e
   * @param H
   * @param eplison
   * @returns Q
   * @returns v
   */
  export function dxyydgll(B: number, e: number, H: number, mu: number, eplison: number) {
    let Q = mu * B * e * Math.sqrt(2 * g * (H - eplison * e))
    let v = Q / (B * e * eplison)
    return [Q, v]
  }

  //柴恭纯方法计算隧洞掺气水深
  export function cgc_sdsqss(delta:number,b:Array<number>,h:Array<number>,v:Array<number>) {
    let size = b.length
    let output = new Array<string>(size)
    for (let index = 0; index <size; index++) {
      let bi = +b[index];
      let hi = +h[index]; 
      let vi = +v[index];
      if(vi>=30 || vi<=15)
      {
        output[index] = "公式不合适";
          continue;
      }

      if(hi<=1.2)
        {
          output[index] = "公式不合适";
          continue;
        }
        const ri = bi * hi /(bi+2*hi);
        if(ri >= 1.4 || ri<=0.6 )
        {
          output[index] = "公式不合适";
          continue;
        }
        let hai = hi + delta * Math.pow(10,1.77 + 0.0081 * vi * vi / (g * ri));
        output[index] = "掺气水深="+hai.toFixed(5).toString()
        //console.log(output[index])
    }
    return output;
  }
  
   //霍尔方法计算隧洞掺气水深
   export function hall_sdsqss(k:number,b:Array<number>,h:Array<number>,v:Array<number>) {
    let size = b.length
    let output = new Array<string>(size)
    for (let index = 0; index <size; index++) {
      let bi = +b[index];
      let hi = +h[index]; 
      let vi = +v[index];
      if(vi<=30)
      {
        output[index] = "公式不合适";
          continue;
      }

        const ri = bi * hi /(bi+2*hi);


        let hai = hi * (1+k*vi*vi/(g*ri))
        output[index] = "掺气水深="+hai.toFixed(5).toString()
        //console.log(output[index])
    }
    return output;
  }

   //溢洪道规范方法计算隧洞掺气水深
   export function yhdgf_sdsqss(zeta:number,h:Array<number>,v:Array<number>) {
    let size = h.length
    let output = new Array<string>(size)
    for (let index = 0; index <size; index++) {
      let hi = +h[index]; 
      let vi = +v[index];
   

        let hai = hi * (1+zeta*vi/100)
        output[index] = "掺气水深="+hai.toFixed(5).toString()
        //console.log(output[index])
    }
    return output;
  }

    //王俊勇方法计算隧洞掺气水深
    export function wjy_sdsqss(n_z:number,b:Array<number>,h:Array<number>,v:Array<number>) {
      let size = b.length
      let output = new Array<string>(size)
      for (let index = 0; index <size; index++) {
        let bi = +b[index];
        let hi = +h[index]; 
        let vi = +v[index];

        if(vi>=30)
        {
          output[index] = "公式不合适";
            continue;
        }

        const ri = bi * hi /(bi+2*hi);
        let v2gr = vi*vi/(g*ri)

        if(v2gr<9.4 || v2gr>283)
        {
          output[index] = "公式不合适";
            continue;
        }
  
          let hai = hi/0.937 * Math.pow(v2gr*n_z*Math.sqrt(g)*bi/(Math.pow(ri,1/6)*hi),0.088)
          output[index] = "掺气水深="+hai.toFixed(5).toString()
          //console.log(output[index])
      }
      return output;
    }

    export function glssg_slkqhs(nabla: number, hv: number, h:Array<number>,v:Array<number>) {

      let size = h.length
      let output = new Array<string>(size)

      let ha = 1.33 - nabla / 900

      for (let index = 0; index <size; index++) {
        let hi = +h[index]; 
        let vi = +v[index];
        let sigma = (hi + ha - hv) / (vi * vi / (2 * g))
        let out = '不需要设掺气坎'
        if (sigma < 0.3) {
          out = '需要设掺气坎'
        }
        output[index] = "水流空化数="+sigma.toFixed(5).toString()+","+out
      }
      return output
    }
}
