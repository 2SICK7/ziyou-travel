# 项目交接文档 — 自游｜武威旅行规划助手

---

## 一、项目当前状态

| 项目 | 说明 |
|------|------|
| 项目类型 | React 18 + Vite + Tailwind CSS 旅游网站 |
| 当前网站名称（品牌） | 自游 |
| 原项目城市（内容主题） | 武威（甘肃省武威市） |
| 项目路径 | /Users/sickdistance/wuwei-travel/ |
| 当前完成阶段 | ✅ 页面文案调整 ✅ 景点图片替换 ✅ 美食图片替换 ✅ 酒店图片替换 ✅ 图片来源记录 ✅ Build 验证 |

**品牌与内容说明：** 网站品牌名已从"武威"改为"自游"，但网站内容仍为武威旅游攻略（景点、美食、酒店均为武威本地数据）。品牌名用"自游"，目的地仍保留"武威"。

---

## 二、已完成内容

### 文案调整
- `index.html` — title 改为 `自游｜武威旅行规划助手`
- `src/components/HeroSection.tsx` — 首页主标题"自游"，副标题、按钮文案更新
- `src/pages/ResultPage.tsx` — 结果页页头品牌改为"自游｜武威旅行规划助手"
- `src/components/CopyGuide.tsx` — 复制攻略标题和落款改为"自游"
- `src/components/BudgetPlanner.tsx` — 生成按钮文案改为"生成我的旅行路线"

### 图片替换
- 景点图片：8张 Unsplash 假图 → 真实照片（来源：Wikimedia Commons 6张 + 百度百科 2张）
- 美食图片：8张 Unsplash 假图 → 真实照片（来源：百度百科 8张）
- 酒店图片：6张 Unsplash 假图 → 真实照片（来源：百度百科 6张）
- 图片统一保存到 `public/images/` 下
- `IMAGE_SOURCES.md` 已记录全部22条图片来源

### Build 验证
- `vite build` 成功（406模块转换，836ms）
- `dist` 目录已生成

---

## 三、图片目录结构

```
wuwei-travel/public/images/
├── spots/                              （8张景点真实照片）
│   ├── leitai-han-tomb.jpg             雷台汉墓
│   ├── wuwei-museum.jpg                武威市博物馆
│   ├── wuwei-confucian-temple.jpg      武威文庙
│   ├── tiantishan-grottoes.jpg         天梯山石窟
│   ├── baita-temple.jpg                白塔寺
│   ├── kumarajiva-temple.jpg           鸠摩罗什寺
│   ├── wuwei-desert-park.jpg           武威沙漠公园
│   └── liangzhou-night-market.jpg      明清街/凉州夜市
│
├── foods/                              （8张美食真实照片）
│   ├── santao-che.jpg                  凉州三套车
│   ├── mingqing-street-food.jpg        手抓羊肉
│   ├── xingpi-tea.jpg                  杏皮茶
│   ├── liangzhou-cuisine.jpg           烤全羊
│   ├── vegetarian-meal.jpg            素食
│   ├── liangzhou-noodles.jpg          牛肉面
│   ├── desert-bbq.jpg                  烤羊肉串
│   └── muslim-cuisine.jpg             大盘鸡
│
└── hotels/                             （6张酒店真实照片）
    ├── liangzhou-youth-hostel.jpg      青年旅舍
    ├── liangzhou-business-hotel.jpg    商务酒店
    ├── wenmiao-boutique-inn.jpg        民宿
    ├── silk-road-hotel.jpg             星级酒店
    ├── desert-oasis-homestay.jpg       农家乐
    └── super8-hotel.jpg                速8酒店
```

| 目录 | 数量 |
|------|------|
| public/images/spots/ | 8张 |
| public/images/foods/ | 8张 |
| public/images/hotels/ | 6张 |
| **合计** | **22张** |

---

## 四、核心数据文件

### src/data/attractions.ts
景点数据，8条记录。每条包含 id、name、tags、description、duration、crowd、ticket、image、suitable、tips、highlights。

image 字段已全部指向本地路径：
```
/images/spots/leitai-han-tomb.jpg
/images/spots/wuwei-museum.jpg
/images/spots/wuwei-confucian-temple.jpg
/images/spots/tiantishan-grottoes.jpg
/images/spots/baita-temple.jpg
/images/spots/kumarajiva-temple.jpg
/images/spots/wuwei-desert-park.jpg
/images/spots/liangzhou-night-market.jpg
```

### src/data/restaurants.ts
美食/餐厅数据，8条记录。每条包含 id、name、cuisine、price、dishes、time、location、image、description。

image 字段已全部指向本地路径：
```
/images/foods/santao-che.jpg
/images/foods/mingqing-street-food.jpg
/images/foods/xingpi-tea.jpg
/images/foods/liangzhou-cuisine.jpg
/images/foods/vegetarian-meal.jpg
/images/foods/liangzhou-noodles.jpg
/images/foods/desert-bbq.jpg
/images/foods/muslim-cuisine.jpg
```

### src/data/hotels.ts
酒店数据，6条记录。每条包含 id、name、type、priceRange、priceNum、area、convenience、suitable、image、facilities、description。

image 字段已全部指向本地路径：
```
/images/hotels/liangzhou-youth-hostel.jpg
/images/hotels/liangzhou-business-hotel.jpg
/images/hotels/wenmiao-boutique-inn.jpg
/images/hotels/silk-road-hotel.jpg
/images/hotels/desert-oasis-homestay.jpg
/images/hotels/super8-hotel.jpg
```

---

## 五、图片路径规则

### 正确写法（代码中使用）

图片放在 `public/images/` 下时，React/Vite 中引用路径**不要**加 `public` 前缀：

```
/images/spots/xxx.jpg
/images/foods/xxx.jpg
/images/hotels/xxx.jpg
```

### 错误写法（不要使用）

```
❌ public/images/xxx.jpg
❌ ./public/images/xxx.jpg
❌ ../public/images/xxx.jpg
```

### 原因

Vite 的 `public` 目录是静态资源根目录，构建时直接复制到 `dist/`。代码中以 `/` 开头的路径会被解析为 `dist/images/...`，即正确路径。

---

## 六、验证结果

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 图片文件是否存在 | ✅ | 22张图片全部存在，文件大小均大于0 |
| 图片路径格式 | ✅ | 22处统一为 `/images/{spots\|foods\|hotels}/xxx.jpg` |
| 外部URL残留 | ✅ | 0个，全部已替换为本地路径 |
| IMAGE_SOURCES.md | ✅ | 存在，8240字节，含景点/美食/酒店3个分类表格 |
| vite build | ✅ | 成功，406模块，836ms |
| dist 目录 | ✅ | 已生成，含 index.html + assets/ + images/ |
| 浏览器 title | ✅ | "自游｜武威旅行规划助手" |
| 首页主标题 | ✅ | "自游·一站式武威旅行规划助手" |
| 控制台报错 | ✅ | 0条 |
| 图片HTTP状态 | ✅ | 22/22 返回 200 |
| 裂图/空白图 | ✅ | 无 |

**已知遗留问题（不影响部署）：**
- `npm run build`（含 tsc 类型检查）有7个 pre-existing TS 错误（未使用变量），与图片替换无关
- 单独运行 `vite build` 成功，不影响部署
- 2张景点图片为近似匹配（沙漠公园用腾格里沙漠照片、夜市用凉州城景），已在 IMAGE_SOURCES.md 中标注

---

## 七、明天部署计划

### 目标
让网站可以被外界访问。

### 部署前检查清单

| 序号 | 检查项 | 状态 |
|------|--------|------|
| 1 | package.json 的 build 脚本 | ✅ `"build": "tsc && vite build"` |
| 2 | dist 目录是否存在 | ✅ 已生成 |
| 3 | 本地 vite build 是否成功 | ✅ 已验证 |
| 4 | 是否需要配置域名 | ⏳ 待定 |
| 5 | 部署平台选择 | ⏳ 待定 |
| 6 | 部署后检查首页、图片、路由 | ⏳ 待执行 |

### 部署平台选项

| 平台 | 适合场景 | 构建命令 | 输出目录 |
|------|---------|---------|---------|
| Vercel | 推荐，零配置 | `npm run build` | `dist` |
| Netlify | 简单易用 | `npm run build` | `dist` |
| Cloudflare Pages | 免费，速度快 | `npm run build` | `dist` |
| 宝塔面板 | 自有服务器 | 手动上传 dist | — |

### 注意事项

1. **tsc 错误处理：** `npm run build` 包含 `tsc` 类型检查，有7个 pre-existing 错误。如果部署平台执行 `npm run build` 会失败，建议：
   - 方案A：将 build 脚本改为 `"build": "vite build"`（跳过 tsc）
   - 方案B：修复7个未使用变量错误
   - 方案C：在部署平台单独配置构建命令为 `vite build`
2. **图片资源：** `public/images/` 下的22张图片会被 Vite 自动复制到 `dist/images/`，无需额外配置
3. **路由：** 当前为单页应用（SPA），无后端路由，部署时无需配置重定向

---

## 八、下一步建议

### 推荐明天按以下顺序执行：

1. **选择部署平台**（推荐 Vercel 或 Cloudflare Pages，免费且自动部署）
2. **本地重新运行 `vite build`** 确认 dist 最新
3. **上传或连接代码仓库**（GitHub 仓库连接 Vercel/Cloudflare 最方便）
4. **配置构建命令** 为 `vite build`（跳过 tsc 检查）
5. **配置输出目录** 为 `dist`
6. **部署后绑定域名**（可用平台免费子域名或自有域名）
7. **外网访问测试**：
   - 首页是否正常打开
   - 22张图片是否全部加载
   - 生成路线功能是否正常
   - 移动端布局是否正常
   - 浏览器 title 是否为"自游｜武威旅行规划助手"

### 本地运行命令

```bash
# 开发模式
cd /Users/sickdistance/wuwei-travel
npm run dev
# 访问 http://localhost:5173

# 生产构建（跳过 tsc）
cd /Users/sickdistance/wuwei-travel
npx vite build
# 输出到 dist/

# 生产构建（含 tsc，当前会报错）
npm run build
```

---

## 九、项目文件总览

```
wuwei-travel/
├── IMAGE_SOURCES.md          ← 图片来源记录（22条）
├── PROJECT_HANDOFF.md         ← 本文档
├── SPEC.md                    ← 原始项目规范
├── index.html                 ← 入口（title: 自游｜武威旅行规划助手）
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── dist/                      ← 构建输出（已生成）
│   ├── index.html
│   ├── assets/
│   └── images/
├── public/
│   └── images/
│       ├── spots/  (8张)
│       ├── foods/  (8张)
│       └── hotels/ (6张)
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    │   ├── HeroSection.tsx
    │   ├── BudgetPlanner.tsx
    │   ├── FeatureShowcase.tsx
    │   ├── AttractionShowcase.tsx
    │   ├── RestaurantShowcase.tsx
    │   ├── HotelShowcase.tsx
    │   ├── RouteTimeline.tsx
    │   ├── RouteOverview.tsx
    │   ├── BudgetChart.tsx
    │   ├── MapPreview.tsx
    │   ├── WarningsPanel.tsx
    │   └── CopyGuide.tsx
    ├── data/
    │   ├── attractions.ts      ← 景点数据（8条，图片已本地化）
    │   ├── restaurants.ts      ← 美食数据（8条，图片已本地化）
    │   └── hotels.ts           ← 酒店数据（6条，图片已本地化）
    ├── pages/
    │   ├── HomePage.tsx
    │   └── ResultPage.tsx
    └── utils/
        ├── generateRoute.ts
        └── budgetCalculator.ts
```

---

*文档更新时间：2026年6月25日*
*项目当前状态：已通过验证，可以进入部署阶段*
