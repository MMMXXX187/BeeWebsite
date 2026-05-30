# 走进蜜蜂的奇妙天地

一个关于蜜蜂的交互式网站

## 使用指南

### 知识卡片

首页展示五个蜂巢状导航按钮：

- **蜜蜂是谁？** — 物种、进化、蜂种、野外识别（7 张卡片）
- **蜂群文明** — 真社会性、蜂王、工蜂、蜂巢结构（9 张卡片）
- **语言与超能力** — 舞蹈语言、信息素、视觉、导航（10 张卡片）
- **蜜蜂黑科技** — 脑科学、学习能力、模式生物、脑机接口（7 张卡片）
- **互动实验室** — 两个交互式实验

点击卡片翻转查看答案，支持键盘操作：`←` `→` 切换卡片，`Space` / `Enter` 翻转。

### 互动实验室

包含两个实验模块：

1. **蜜蜂视觉模拟器** — 对比人类视觉与蜜蜂视觉，了解蜜蜂的紫外线感知和偏振光导航能力
2. **真假蜜蜂鉴定器** — 9 道题目，观察昆虫图片判断是否为真正的蜜蜂属（Apis）

鉴定器支持键盘快捷键：`Y` = 真蜜蜂，`N` = 不是蜜蜂，`←` `→` 切换题目。

## 技术栈

| 类别 | 技术                                     |
| ---- | ---------------------------------------- |
| 框架 | React 19 + Vite 8                        |
| 动画 | Framer Motion                            |
| 样式 | 自定义 CSS（毛玻璃效果、CSS 变量）       |
| 字体 | Orbitron / Noto Sans SC / JetBrains Mono |
| 图片 | Cloudflare R2 CDN                        |
| 路由 | 状态驱动（useState），无第三方路由库     |

## 本地开发

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run preview   # 预览生产构建
```

## 项目结构

```
src/
├── App.jsx                    # 主应用，状态管理与页面切换
├── index.css                  # 全局样式
├── data/
│   └── knowledge.js           # 知识卡片与题库数据
└── components/
    ├── LoadingScreen.jsx      # 开屏加载动画
    ├── HoneycombNav.jsx       # 蜂巢导航首页
    ├── SectionPage.jsx        # 知识卡片翻转查看器
    ├── LabPage.jsx            # 互动实验室入口
    ├── BeeVisionSimulator.jsx # 蜜蜂视觉模拟器
    ├── BeeQuizGame.jsx        # 真假蜜蜂鉴定器
    ├── ParticleField.jsx      # 背景粒子动画
    ├── FloatingBee.jsx        # 悬浮蜜蜂装饰
    └── Footer.jsx             # 页脚
```
