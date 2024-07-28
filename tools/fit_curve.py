'''
Author: Xu.WANG raymondmgwx@gmail.com
Date: 2022-06-12 12:02:26
LastEditors: Xu.WANG raymondmgwx@gmail.com
LastEditTime: 2022-06-12 14:57:33
FilePath: \hycom_app\tools\fit_curve.py
Description: 
Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved. 
'''

import numpy as np
import matplotlib.pyplot as plt


x = [0.5764539007092199, 0.8533333333333333, 1.1302127659574468, 1.334468085106383, 1.647659574468085, 1.865531914893617, 2.178723404255319,
     2.4556028368794327, 2.8005673758865246, 3.0638297872340425, 3.363404255319149, 3.5404255319148934, 3.7174468085106382, 3.8127659574468087]
y = [7.925407925407925, 9.673659673659673, 10.839160839160838, 12.121212121212121, 14.685314685314685, 16.2004662004662, 18.53146853146853,
     21.445221445221446, 24.708624708624708, 28.32167832167832, 32.98368298368298, 36.5967365967366, 40.32634032634032, 42.30769230769231]
curve = np.polyfit(x, y, deg=5)

print(curve)

# x_axis = np.linspace(0, 4, 100)
# y_axis = [np.polyval(curve, i) for i in x_axis]


# for i in range(len(x_axis)):
#     print("{x:"+str(x_axis[i])+",y:"+str(y_axis[i])+"},")


# plt.plot(x, y)
# plt.show()
