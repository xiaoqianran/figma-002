# Yeki VPN App UI Kit — 交互式 Web 展示站 & 原型实验室

> **🌐 在线演示（推荐）**  
> **[https://xiaoqianran.github.io/figma-002/](https://xiaoqianran.github.io/figma-002/)**  
>
> [![Live Demo](https://img.shields.io/badge/在线体验-立即访问-blue?style=for-the-badge&logo=github)](https://xiaoqianran.github.io/figma-002/)

基于 Figma「Yeki - VPN App UI KIT」完整复刻 + 工程化落地的高质量交付物。

## 当前已实现功能（2026-05，持续高强度迭代中）

### 核心交付
- **营销封面 Hero**：像素级还原原 Figma Thumbnail。
- **高保真可交互 iPhone 14 Pro 模拟器**：支持鼠标实时 3D 倾斜 + 动态相机模组 + 金属质感。
- **全局状态驱动的真实交互**：连接计时每秒自增、换服务器立即影响主界面 ping 与速度、Speedtest 结果可被 Statistics 展示。
- **Prototype Lab**：
  - 已连接主界面（动态数据 + 内部导航）
  - 服务器列表（真实切换）
  - Speedtest 完整三阶段
  - Statistics（最新测速联动）
  - 个人资料完整管理（Edit + Change Password）
  - Pro 订阅 + 支付全流程（成功/失败）
  - BottomNav 全面可用
- **交互式画廊**：54 个 Figma 屏幕可搜索、分类浏览，点击预览 + 一键打开 Lab
- **设计令牌系统**：颜色 + 排版展示（持续扩展中）
- **技术栈**：Vite + React 19 + TS + Tailwind 4，Lint 0 error，构建快速。当前 Batch 4 并行开发中（更多屏幕 + Lab UX + Design System 深度）。

### 快速开始

```bash
npm install
npm run dev
```

访问：
- `/` — 精美落地页
- `/lab` — 交互原型实验室（核心价值）
- `/design-system` — 设计令牌与组件
- `/gallery` — 全部屏幕概览

构建：
```bash
npm run build
```

## 项目结构

```
src/
├── components/          # 复用组件（PhoneFrame、Hero、导航等）
├── screens/             # 各个 App 屏幕的真实实现
├── styles/              # tokens.css + globals.css
├── lib/                 # 工具函数、状态管理（后续）
└── data/                # 模拟数据（服务器列表、用户资料等）
```

## 后续开发计划（多 Agent 协作中）

- [ ] 完成 8~12 个核心屏幕（Server List、Profile 编辑、订阅支付、Statistics 等）
- [ ] 实现跨屏真实流程（连接 → 换服务器 → 查看统计）
- [ ] 更强大的全局状态管理 + 持久化
- [ ] 响应式优化 + 移动端体验
- [ ] Figma 同步脚本（可选）

---

**原 Figma 文件**：Yeki - VPN App UI KIT（3 个页面，300+ 图层）

此项目目标是将设计系统转化为**可真实体验、可继续开发的工程资产**，而非仅停留在静态图片阶段。

如需继续扩展特定屏幕或流程，请直接下达指令。
