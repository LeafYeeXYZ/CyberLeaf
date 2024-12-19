import { loadOml2d } from 'oh-my-live2d'
import type { LoadLive2d } from './types.ts'

// 1. 对话框的样式自定义异常
// 2. 要是上面那个不好修也可以加个 onMessage 事件, 来手动渲染对话框
// 3. 要是实例原生有个 destroy 方法就好了
// 4. 模型没能定位到 parentElement 上

export const catBoy: LoadLive2d = (element) => {
  const live2d = loadOml2d({
    parentElement: element,
    dockedPosition: 'right',
    mobileDisplay: true,
    menus: { disable: true },
    sayHello: false,
    tips: {
      copyTips: { message: [] },
      idleTips: { message: [] },
      // BUG: 加了这个属性就会导致对话框无法显示
      // style: {
      //   top: 'calc(100%-680px)',
      // },
    },
    models: [{
      path: '/live2d/cat-boy/白猫正太.model3.json',
      scale: 0.08,
      // 用来临时替代上面的属性的方案
      position: [0, 70],
    }],
  })
  return live2d
}

export const foxBoy: LoadLive2d = (element) => {
  const live2d = loadOml2d({
    parentElement: element,
    dockedPosition: 'right',
    mobileDisplay: true,
    menus: { disable: true },
    sayHello: false,
    tips: {
      copyTips: { message: [] },
      idleTips: { message: [] },
    },
    models: [{
      path: '/live2d/fox-boy/hlxz.model3.json',
      scale: 0.08,
      position: [0, 70],
    }],
  })
  return live2d
}
