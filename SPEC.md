# 武威旅游攻略网站 - 项目规范

## 1. Concept & Vision

这是一个高端武威城市旅游规划平台，融合"丝路古城 + 数字展厅 + AI路线规划"三大定位。网站如同一位博学的凉州向导，带用户穿越汉唐梦境。视觉语言取自敦煌壁画、铜奔马、大漠驼铃——不是廉价旅游模板，而是一座可沉浸的城市文化数字博物馆。

## 2. Design Language

### 色彩系统
- **主背景**: #1A1510 (墨褐) → #F5F0E8 (米白) 渐变
- **点缀色**: #C9A961 (古铜金), #D4764E (沙漠橙), #8B4D3B (壁画红)
- **中性色**: #2C2416 (深褐), #E8DFD0 (暖灰), #FDFCFA (纯白)
- **文字**: #1A1510 (主文字), #6B5D4D (次文字), #C9A961 (强调)

### 字体
- 标题: "Noto Serif SC", serif (文化感)
- 正文: "Inter", "PingFang SC", sans-serif

### 动效
- 页面入场: opacity 0→1, translateY 20px→0, 600ms ease-out, staggered 100ms
- 卡片悬浮: scale 1.02, shadow加深, 200ms ease
- 按钮交互: scale 0.98 on click, 100ms
- 滚动触发动画: IntersectionObserver threshold 0.2

### 图标
- 使用 Lucide React 图标库
- 线条风格，stroke-width: 1.5

## 3. Layout & Structure

### 页面结构
1. **Hero Section** - 全屏沉浸式头部，大漠背景视差
2. **Planning Form** - 预算/天数/偏好选择，玻璃拟态卡片
3. **Results Page** - 路线总览 → 每日时间轴 → 详情卡片网格

### 响应式策略
- Desktop: 3列网格, 最大宽度1400px
- Tablet: 2列网格, padding 48px
- Mobile: 单列, padding 24px, 触控优化

## 4. Features & Interactions

### 核心功能
- 预算输入: 数字输入，带实时验证 (300-10000元)
- 天数选择: 1-5天按钮组
- 偏好选择: 多选标签组
- 路线生成: 基于规则的AI算法
- 结果展示: 完整攻略报告

### 创意功能
- 路线人格标签: 凉州历史漫游者 / 丝路文化猎人 等
- 预算压力指数: 轻松 / 合理 / 偏紧 / 极限
- 避坑提示: 根据参数动态生成
- 一键重新生成: 同参数不同路线
- 复制攻略: 格式化文本复制

## 5. Component Inventory

### HeroSection
- 全屏背景 + 渐变遮罩
- 动态大标题打字效果
- 滚动引导动画

### BudgetPlanner
- 玻璃拟态卡片容器
- 预算输入框 (金色边框聚焦)
- 天数选择器 (按钮组)
- 偏好标签 (多选芯片)
- 生成按钮 (金色渐变)

### RouteTimeline
- 每日路线卡片
- 时间段: morning/noon/afternoon/evening
- 展开/收起动画

### AttractionCard
- 图片区域 (16:10比例)
- 标签徽章
- 评分和预计门票
- 悬浮放大效果

### RestaurantCard
- 小图 + 信息布局
- 人均价格标签
- 推荐菜标签云

### HotelCard
- 大图背景
- 价格区间
- 设施图标

### BudgetChart
- 环形图 (住宿/餐饮/门票/交通/备用)
- 数值标签

### MapPreview
- 静态路线卡片 (预留高德API接入点)
- 景点连线示意

## 6. Technical Approach

- **框架**: React 18 + Vite
- **样式**: Tailwind CSS 3.4
- **动画**: Framer Motion 11
- **图标**: Lucide React
- **数据**: 内置mock数据，预留API接口
- **状态**: React useState/useReducer

## 7. Data Models

### Attraction
```ts
{
  id: string
  name: string
  tags: string[]
  description: string
  duration: string
  crowd: string
  ticket: string
  image: string
  suitable: string[]
  tips: string
}
```

### Restaurant
```ts
{
  id: string
  name: string
  cuisine: string
  price: number
  dishes: string[]
  time: string[]
  location: string
  image: string
}
```

### Hotel
```ts
{
  id: string
  name: string
  type: '经济' | '舒适' | '高级'
  priceRange: string
  area: string
  convenience: string
  suitable: string[]
  image: string
}
```

## 8. Route Generation Rules

### 预算分层
- 低预算 300-600元: 经济型住宿, 小吃面食, 免费/低门票景点, 公交为主
- 中预算 600-1500元: 舒适酒店, 特色餐厅+小吃, 核心景点全覆盖
- 高预算 1500元+: 高端酒店, 特色招牌菜, 深度体验

### 天数逻辑
- 1天: 市区核心线 (雷台汉墓→博物馆→文庙→夜市)
- 2天: D1市区 + D2天梯山石窟+白塔寺
- 3天: D1市区 + D2石窟白塔 + D3沙漠公园+鸠摩罗什寺+夜游
- 4-5天: 3天基础+慢游/摄影/县域扩展
