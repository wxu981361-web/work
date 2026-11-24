# 獅潭仙草小農｜品牌電商原型

以苗栗獅潭仙草產地故事為核心的 Mobile-First 電商展示專案，提供常溫／冷藏拆單運費、購物車、折扣碼、模擬結帳、產地工序、檢驗說明、訂閱方案、文章閱讀與小農訂單管理頁。

> **教育／原型展示聲明：** 本站為介面與流程原型，不提供真實商品交易、金流、物流或食品安全保證。頁面中的「SGS 381 項農藥殘留檢驗合格」為展示範例標示；正式上線前須取得並連結實際有效檢驗報告，並由品牌方核實所有產地與商品宣稱。

## 專案結構

```text
.
├── server.js             # Express 靜態網站與示範訂單 API
├── package.json
├── README.md
├── .gitignore
└── public/
    ├── index.html        # 商店、故事、內容、管理後台介面
    ├── styles.css        # Mobile-First 響應式樣式
    ├── app.js            # 購物車、拆單、折扣、結帳、後台互動
    └── images/           # 後續替換產地攝影／短影音素材
```

## 本機啟動

需要 Node.js 18 或更新版本。

```bash
npm install
npm start
```

瀏覽 `http://localhost:3000`。健康檢查：`GET /api/health`。訂單以記憶體暫存，重啟後清除；金流、物流與 LINE 通知皆為流程原型。

開發期間可用 `npm run dev` 啟動 Node watch 模式。

## GitHub 推送

在 GitHub 建立空白 repository 後，於專案根目錄執行：

```bash
git init
git add .
git commit -m "Build Shitanian grass farm shop prototype"
git branch -M main
git remote add origin https://github.com/<your-account>/<your-repository>.git
git push -u origin main
```

## Render 部署

1. 將 GitHub repository 連接至 Render，建立 **Web Service**。
2. Runtime 選 Node；Build Command 設為 `npm install`，Start Command 設為 `npm start`。
3. 無需手動指定 port，服務會使用 Render 注入的 `PORT` 環境變數並監聽 `0.0.0.0`。
4. 部署完成後，可開啟 `/api/health` 確認服務狀態。

## 互動說明

- 常溫滿 NT$1,500 免運，否則運費 NT$120；冷藏滿 NT$2,000 免運，否則運費 NT$200。兩種溫層分別計算與配送。
- 體驗折扣碼：`SHITAN10`（滿 NT$500 折 NT$100）、`KOL88`（滿 NT$888 折 NT$88）。
- 結帳支援 LINE Pay、信用卡、貨到付款的模擬選項；送出後呼叫 `POST /api/orders`。
- `/admin` 可檢視本次伺服器記憶體中的訂單，更新收款、LINE 通知、出貨狀態並預覽出貨單。
- 頁面內的方案與文章皆為原型內容，可直接在 `public/index.html` 編修。
