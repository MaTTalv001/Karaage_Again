## 各ディレクトリの説明
public/assets: 画像ファイルやロゴなどの静的ファイルを格納  
src/components: 共通コンポーネントを格納(ヘッダー、フッターなど)  
src/contexts: コンテキストを格納(ログイン情報など)  
src/hooks: カスタムフックを格納  
src/pages: 各ページの作業用ディレクトリ(実装者はこのディレクトリ配下にページごとにディレクトリを作成してください)  
src/services: 外部APIとの接続サービスを格納(Supabaseクライアントなど)
src/utils: 定数などを格納

## Supabaseコンテナの導入方法
1. リポジトリをクローンする  
git clone --depth 1 https://github.com/supabase/supabase

2. docker-compose.ymlが存在するディレクトリに移動  
cd supabase/docker

3. 環境変数をコピー  
cp .env.example .env

4. 最新のイメージを取得する  
docker compose pull

5. コンテナをバックグラウンドで立ち上げる  
docker compose up -d


以上でローカルにsupabaseコンテナを構築することができます。  
supabaseのダッシュボードにアクセスする場合はhttp://localhost:8000/にアクセスしてください。  
以下にセルフホスト版のSupabaseのドキュメントのリンクを置いておきます。  
https://supabase.com/docs/guides/self-hosting/docker