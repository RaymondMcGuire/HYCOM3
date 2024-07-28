## 如何设置以及启动项目

### 环境配置

1.安装nvm https://github.com/coreybutler/nvm-windows/releases
2.nvm install 18.19.0
3.nvm use 18.19.0
4.npm install -g yarn
5.yarn config set ignore-engines true

### 安装依赖

yarn install

### 启动本地开发环境(自带热启动)

yarn serve

### 代码格式化

yarn run lint --fix

### 构建生产环境 (自带压缩)

yarn build

### 发布 win 版到 github

set NODE_OPTIONS=--openssl-legacy-provider

yarn run electron:publish

### 项目地址

https://github.com/HYCOM2/hycom3.0
