devserver:
	npm run webpack-dev-server --config ./webpack.config.js --mode development

storybook:
	./node_modules/.bin/start-storybook -p 9009 -c .storybook -s static/
