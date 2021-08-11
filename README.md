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
