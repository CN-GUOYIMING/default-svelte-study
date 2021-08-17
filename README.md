# README

## Svelte app を作成

```shell
# プロジェクトを新規作成
npx degit sveltejs/template app-name

# プロジェクトディレクトリに入る
cd app-name

# TypeScript を追加する
node scripts/setupTypeScript.js

# 依存をインストール
# 依存定義ファイル：app-name/package.json
npm install

# ローカルサーバーを起動
npm run dev
```

- [svelte document (CN)](https://www.sveltejs.cn/)

---

## Routing

**注：本サンプルでは既にインストール済み。**

### ルーターの依存をインストール

```shell
npm install svelte-spa-router
```

### ルーターの使用方法

- 詳細は [svelte-spa-router document](https://github.com/ItalyPaleAle/svelte-spa-router) で参照してください。
- このプロジェクトでの使い方：

    ```typescript
    // src/router/routes/index.ts

    // 1. ここで画面コンポーネントを導入
    import Home from '../views/Home.svelte'
    import RouteTest from '../views/RouteTest.svelte'

    export const routes = {
      // 2. ここでルーターを設置
      // '/url': component
      '/home': Home,
      '/routetest': RouteTest,
    }

    // 3. ブラウザで以下の様にアクセス
    // http://ローカルホスト/#/url
    ```

---

## Tailwindcss

二種類の導入方法が存在する。

### PostCSS のプラグインとして Tailwindcss を導入

#### Tailwindcss の依存をダウンロード

```shell
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

#### Tailwindcss を設置する

rollup.config.js（ webpack と似たパッキングツール） ファイル内に tailwind を設置する。  
『[How to Use Tailwind on a Svelte Site](https://css-tricks.com/how-to-use-tailwind-on-a-svelte-site/)』で詳細を確認できる。

1. PostCSS 及び Tailwind 処理パッケージを導入。

     ```javascript
     // rollup.config.js
     import sveltePreprocess from "svelte-preprocess";
     ```

2. プラグインを導入する。

     ```javascript
     // rollup.config.js
     preprocess: sveltePreprocess({
       sourceMap: !production,
       postcss: {
         plugins: [
         require("tailwindcss"), 
         require("autoprefixer"),
         ],
       },
     }),
     ```

3. App.svelte ファイルに注入する。

     ```svelte
     <!-- App.svelte -->
     <style global lang="postcss">
       @tailwind base;
       @tailwind components;
       @tailwind utilities;
     </style>
     ```

---

### Tailwind CLI で Tailwindcss を導入する

『[tailwindcss document](https://tailwindcss.com/docs/installation#using-tailwind-cli)』で詳細を確認できる。

PostCSS で 最終的に出力される CSS にコンパイル。

1. css ファイルを置く場所に `tailwind.css` を作成する。
   - 使用上どのディレクトリでも構わない。
   - ファイル名も任意に変更できる。

     ```css
     /* ./src/assets/tailwind.css */
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

2. tailwind の出力ファイルを単独にビルド。

   ```shell
   # どのファイル名も自由
   # --watch で変更を監視することができる
   npx tailwindcss -i ./src/tailwind.css -o ./dist/tailwind.css
   ```

3. html フィアルで出力された方の tailwind.css を導入

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <!-- ... -->
       <link rel="stylesheet" href="/tailwind.css" />
     </head>
     <body></body>
   </html>
   ```

個別にコンパイルし、シングルページの html で `<link />` タグを使って導入。
