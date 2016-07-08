## 关于
	
	# 功能
		· 项目打包，javascript、style、images压缩合并 ( release文件夹为最终发布目录 )。
		· 成分：ES6、React、Webpack

	# 使用
		· 克隆项目 clone xxx
		· 安装依赖包 nmp install || 解压node_modules/
		· 启动项目
			· @开发环境：npm run dev
			· @测试环境 && @生产环境：npm run debug/test/production；分别生产对于的发布目录

	# 目录
		-app----------------------------------------------------------------开发目录
			-conponents-----------------------------------------------------组件开发目录
			-libs-----------------------------------------------------------libs开发目录
				-images-----------------------------------------------------图片库
				-js---------------------------------------------------------js库
				-less-------------------------------------------------------样式库
			-page----------------------------------------------------------页面开发目录
				-Demo-------------------------------------------------------demo页面
					-images
					./page.js
					./page.less
		-configs------------------------------------------------------------配置信息
			-demo.config.js
		-mock---------------------------------------------------------------Mock数据配置
			-demo.mock.js
		-task---------------------------------------------------------------NodeJs一些特殊的任务
			-demo.js
		./dev.js------------------------------------------------------------开发服务文件
		./package.json
		./README.md
		./webpack.config.js
		-release_debug------------------------------------------------------打包release目录（本地）
			-css------------------------------------------------------------页面样式文件
			-js-------------------------------------------------------------页面脚本文件
			-image----------------------------------------------------------页面图片文件
			-page-----------------------------------------------------------页面html文件
		-release_test-------------------------------------------------------打包release目录（测试）
		-release------------------------------------------------------------打包release目录（生产）
