## 【URL】
https://nuxt-lambda-manager-myzaico.vercel.app

## 【概要】
カスタマイズ可能なフィルターを数種類組み合わせることができる商品管理アプリ。
<br>
<br>

## 【機能】
### 商品
- 一覧/詳細/登録/更新/削除

### フィルター
- OR条件のフィルター (和集合)
- AND条件のフィルター (積集合)
- タグフィルター
- テキストフィルター
- レンジフィルター
- フィルターのカスタマイズ
- フィルター設定の保存

### ユーザー
- 作成
- 認証 　　　　　　　　　　　　* AWS Cognito
- 認可(アクセスコントロール)　 * AWS Cognito + AWS API Gateway

### UI
- ナビバー　　　　　　　　　　 * Vuetify
- サイドバー
- マルチフィルター
- ページネーション　　　　　　 * Vuetify
- 表示件数設定　　　　　　　　 * Vuetify
- ソート　　　　　　　　　　　 * Vuetify
- バリデーション　　　　　　　 * Vuetify
- デイトピッカー　　　　　　　 * Vuetify
<br>
<br>

## 【技術】
### 開発
- 実行環境：　macOS + Docker(Alpine)
- エディター：　VSCode
- リンター：　ESLint
- フォーマッター：　Prettier

### フロントエンド
- 言語：　TypeScript
- JSフレームワーク：　Vue + Nuxt
- 状態管理：　Vuex
- UIフレームワーク：　Vuetify
- アイコン：　Material Design Icons
- スタイルシート言語：　SCSS
- ホスティング：　Vercel (Serverless Functionsを利用してSSR)
- テスト：　Jest + vue-test-utils

### バックエンド (API)
- 言語：　Node.js 12
- API：　AWS Lambda + AWS API Gateway + AWS Cognito
- DB：　AWS DynamoDB
- デプロイツール：　Serverless Framework
- テスト：　AWS標準機能