init: ## credentialを読み込みます
		rm -r -f ki-kiyos-credential
		git clone git@gitlab.com:akakiyo/ki-kiyos-credential.git
		cp ./ki-kiyos-credential/files/gcp/staging/gcp-firebase-serviceaccount.json ./src/config/gcp-firebase-serviceaccount.json

start: ## kiyosを起動します(Dockerイメージの生成とコンテナの立ち上げ)
		docker-compose build
		docker-compose run --service-ports --rm app

help: ## 実行できるオプションを表示します
		@echo 'Usage: make [target]'
		@echo ''
		@echo 'Targets:'
		@grep -E '^[a-zA-Z_-]+:.*?## .*$$' ${MAKEFILE_LIST} \
				| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1,$$2}'
