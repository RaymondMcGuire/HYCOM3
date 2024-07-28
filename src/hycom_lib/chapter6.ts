/* eslint-disable */
import { g } from './common'
/**
 * Chapter6 水电站压力管道水力学计算
 * 部分计算参考以下网址
 * https://raymondmcguire.github.io/?e=HYCAL&&theme=Image-Visual-Lab
 */
export module Chapter6 {

  /**
   * 6.1计算经济直径
   * @param vE
   * @param QMax
   * @returns D
   */
  export function jsjjzj(vE: number, QMax: number) {
    let D = Math.sqrt(4 * QMax / (Math.PI * vE))
    // console.log(D);
    return D
  }

  /**
   * 6.2 圆形管道水头损失计算
   * @param D
   * @param Q
   * @param n
   * @param zeta
   * @param L
   * @returns h
   */
  export function yxgdssjs(D: number, Q: number, n: number, zeta: number, L: number) {
    let R = D / 4
    let v = 4 * Q / (Math.PI * D * D)
    let h_y = n * n * v * v * L / Math.pow(R, 4 / 3)
    let h_j = zeta * v * v / (2 * g)
    // console.log(R);
    // console.log(zeta);
    // console.log(v);
    // console.log(h_y, h_j)
    let h = h_j + h_y
    // console.log(h);
    return h
  }

  /**
   * 6.3 水锤计算
   * 6.3.1 求水锤波速C
   * @param D
   * @param Es
   * @param deltaS
   * @param Ew
   * @param gamma
   */
  export function scbs(D: number, Es: number, deltaS: number, Ew: number, gamma: number) {
    let r = D / 2
    let K = Es * deltaS / (r * r)
   
    let C = Math.sqrt(Ew * g * 100 / gamma) / (Math.sqrt(1 + 2 * Ew / (K * r)) * 100)

    return C
  }

  /**
   * 6.3.2 管道特征系数
   * @param C
   * @param vMax
   * @param H0
   */
  export function gdtzxs(C: number, vMax: number, H0: number) {
    let rou = C * vMax / (2 * g * H0)
    // console.log(rou);
    return rou
  }

  /**
   * 6.3.3 求水锤的特性参数
   * @param L
   * @param vMax
   * @param Ts
   * @param H0
   */
  export function sctxcs(L: number, vMax: number, Ts: number, H0: number) {
    let sigma = L * vMax / (g * H0 * Ts)
    // console.log(sigma);
    return sigma
  }

  /**
   * 6.3.4 判断直接水锤和间接水锤
   * @param L
   * @param C
   * @param Ts
   */
  export function pdzjschjjsc(L: number, C: number, Ts: number) {
    let tR = 2 * L / C
    // console.log(tR);
    if (Ts < tR) {
      return ['直接水锤',tR]
    } else {
      return ['间接水锤',tR]
    }
  }

  /**
   * 6.3.5 直接水锤计算
   * @param C
   * @param Ts
   */
  export function zjsc(C: number, v0: number) {
    let deltaH = C * v0 / g
    // console.log(deltaH);
    return deltaH
  }

  /**
   * 6.3.6 间接水锤计算
   * @param tou0
   * @param rou
   * @param sigma
   * @param H0
   */
  export function jssc(tou0: number, rou: number, sigma: number, H0: number) {
    let judge = tou0 * rou
    let tou = 0
    let eta = 0

    if (judge < 1) {
      // 第一相水锤
      tou = 2 * sigma / (1 + judge - sigma)
      eta = 2 * sigma / (1 + judge + sigma)
    } else {
      tou = 2 * sigma / (2 - sigma)
      eta = 2 * sigma / (2 + sigma)
    }
    let deltaH = tou * H0
    let minusDeltaH = eta * H0

    // console.log(deltaH);
    // console.log(minusDeltaH);

    return [deltaH, minusDeltaH]
  }



  // 跌流射距估算
  export function dlsjgs(q: number, z: number) {
    return 2.3 * Math.pow(q,0.54) * Math.pow(z,0.19)
  }

  //水舌落水点上游水垫深度估算
  export function sslsdsysdsd(q: number, z: number) {
    return 0.6 * Math.pow(q,0.44) * Math.pow(z,0.34)
  }

    //护坦的冲击流速
    export function htcjls(q: number, z: number, z0:number, phi:number, td:number, nabla:number) {
      let v0 = phi * Math.sqrt(2 * g * z0)
      let v1_prime = 0.01
      let beta = -1
      if(nabla!=0)
      {
        v1_prime =  4.88 * Math.pow(q,0.15) * Math.pow(z,0.275)
        beta = Math.acos(2 * v1_prime / v0 -1)
      }else
      {
        let h0 = q/v0

        let learningRate = 0.01
        let v1 = -1
      
       
        for (let ii = 0; ii < 10000; ii++) {
             beta = Math.acos(2 * v1_prime / v0 -1)
            v1 = 2.5 * v0 / Math.sqrt(td / (h0 * Math.sin(beta)))
            v1_prime -= learningRate * (v1_prime - v1)
       
    
          let chk = Math.abs(v1 - v1_prime)
          if (chk < 0.001) {
            return {v1:v1_prime,beta:beta*180/Math.PI}
          }
        }
      }

    return {v1:v1_prime,beta:beta*180/Math.PI}
    }


    //护坦上的动水压力
    export function htsdsyl(gamma: number, v1: number, beta:number) {
      return gamma * Math.pow(v1 * Math.sin(beta/180 *  Math.PI), 2) / (2 * g)
    }

    //下游无护坦的最大冲坑水垫深度
    export function xywhtzdcksdsd(k:number,q: number, z: number) {
      return k * Math.pow(q,0.5) * Math.pow(z,0.25)
    }

    //溢流坝消力池护坦
    export function ylbxlcht(H0: number, Q: number, b:number, phi:number) {
      let outStr =""
      let h1 = -1
      let h_prime = 6
        let learningRate = 0.01
      
        for (let ii = 0; ii < 10000; ii++) {
          h1 = H0 - Math.pow(Q/b,2)/(2*g*phi*phi*h_prime*h_prime)
          h_prime -= learningRate * (h1 - h_prime)
          let chk = Math.abs(h1 - h_prime)
          if (chk < 0.001) {
            //console.log(h1)
            break
          }
        }

        let v1 = Q/(b * h1)
        let F_r1 = v1 / Math.sqrt(g * h1)
        let h2 = h1/2*(Math.sqrt(1 + 8 * F_r1*F_r1) - 1)
        //console.log(h2)
        if(F_r1 > 4.5)
        {
          let L = 6.9 * (h2-h1)
          outStr+= "不设辅助消能工:L=" + L.toFixed(2).toString() + ", Fr="  + F_r1.toFixed(2).toString() +", h1=" + h1.toFixed(2).toString() + ", h2=" + h2.toFixed(2).toString()+"; ";
        
          if(v1 > 16)
          {
            L = (3.2 + 4.3)/2 * h2
            outStr+= "不设消力墩,设梳流坎和尾坎:L=" + L.toFixed(2).toString() + ", Fr="  + F_r1.toFixed(2).toString() +", h1=" + h1.toFixed(2).toString() + ", h2=" + h2.toFixed(2).toString()+"; "
           
          }else
          {
            L = (2.3 + 2.8)/2 * h2
            outStr+= "设消力墩，设梳流坎和尾坎:L=" + L.toFixed(2).toString() + ", Fr="  + F_r1.toFixed(2).toString() +", h1=" + h1.toFixed(2).toString() + ", h2=" + h2.toFixed(2).toString()+"; ";
          }
         
        
        }else
        {
          outStr+= "不满足: Fr="  + F_r1.toFixed(2).toString() +", v1=" +v1 .toFixed(2).toString()+", h1=" + h1.toFixed(2).toString() + ", h2=" + h2.toFixed(2).toString()+";";
        }

        return outStr
      }

      //溢流坝水流空化数估算
      export function ylbslkhs(nabla: number, hv: number, h:Array<number>,v:Array<number>) {

        let size = h.length
        let output = new Array<string>(size)
  
        let ha = 1.33 - nabla / 900
  
        for (let index = 0; index <size; index++) {
          let hi = +h[index]; 
          let vi = +v[index];
          let sigma = (hi + ha - hv) / (vi * vi / (2 * g))
          output[index] = "水流空化数="+sigma.toFixed(5).toString()
        }
        return output
      }


        /**
   * 6.3.1 挑流水舌外缘挑距及冲坑深度
   * @param h
   * @param theta
   * @param H0
   * @param h2
   * @param K
   * @param q
   * @param H
   * @param td
   * @returns LTotal,T
   *
   */
  export function tljs(h: number, theta: number, H0: number,
    h2: number, K: number, q: number, H: number, td: number) {
    let h1 = h / Math.cos(theta)
    let v1 = 0.95 * Math.sqrt(2 * g * (H0 - h1))
    let L = v1 * v1 * Math.cos(theta) * (Math.sin(theta) + Math.sqrt(Math.sin(theta) * Math.sin(theta) + 2 * g * (h1 + h2) / (v1 * v1))) / g
    let t = K * Math.pow(q, 0.5) * Math.pow(H, 0.25)

    let tanBeta = Math.sqrt(Math.tan(theta) * Math.tan(theta) + 2 * g * (h2 + h * Math.cos(theta)) / (v1 * v1 * Math.cos(theta) * Math.cos(theta)))
    let Lc = t / tanBeta
    // console.log(Lc);
    let LTotal = L + Lc
    let T = t - td
    // console.log(T);
    return [LTotal, T]
  }

  //拱坝水流向心集中影响挑流冲刷坑深度
  export function gbslxxjzyx_tlcsksd(R:number, L:number, H_up:number,H_down:number,
    K:number, Q:number,b:number, t_prime:number) {
    let H = H_up - H_down
    let C_q = R / (R - L)
    let t = K * C_q * Math.pow(Q/b,0.5) * Math.pow(H,0.25)
     // console.log(C_q,t)
    if(t < t_prime)
      return 0

    return t-t_prime
  }
      
}
