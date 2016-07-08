var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var fs = require("fs");
var env = process.env.NODE_ENV || 'debug';

//@name Plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsWebpackPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

//@name Tasks
var GenerateHtml = require('./task/generateHtml');

//@name Configs
var config = require('./configs/build.config')[env];
config.listSrc = './app/page/**/index.js';
config.libJsSrc = './app/libs/js/*.js';
config.indexSrc = './app/components/default/index.html';

//@name Functions
/**
 * @name Return files list
 * @param listSrc {String} origin file list
 * @param addon {Array} output file list
 */
var getList = function(listSrc, addon){
	var list = glob.sync(listSrc);
	return (addon && typeof addon == 'object' && !!addon.length) ? list.concat(addon) : list;
}
/**
 * @name Return webpack entry(s)
 */
var getEntryConfig = function(){
	var list = getList(config.listSrc);
	var entry = {};
	var common = [];
	for(var i in list){
		var current = list[i];
		var name = current.slice(6, -3);
		common.push(name);
		entry[name] = [
			'webpack-dev-server/client?http://localhost:'+config.port,
			'webpack/hot/only-dev-server',
			current
		];
	}
	entry.libs = getList(config.libJsSrc);
	return entry;
}
/**
 * @name Render HTML
 */
var setIndexHtml = function(){
	var list = glob.sync(config.listSrc);
	var htmlString = fs.readFileSync(config.indexSrc).toString();
	var assetsJson = JSON.parse(fs.readFileSync(config.releaseDir + 'assets.json').toString());
	fs.unlinkSync(config.releaseDir + 'assets.json');
	for(var i=0, len=list.length; i<len; i++){
		(function(index){
			var name = list[index].slice(6, -8);
			new GenerateHtml({
				path: config.releaseDir + name,
				name: 'index.html',
				fileContent: htmlString,
				assets: {
					DOMAIN: config.domain,
					CDN: config.cdn,
					STYLE: assetsJson[name+"index"].css,
					JS: assetsJson[name+"index"].js,
					LIBJS: assetsJson["libs"].js,
					LIBSTYLE: assetsJson["libs"].css
				}
			});
		})(i);
	}
}

/**
 * @name Return Plugins for build
 */
var getPlugins = function(){
	var plugins = [
		new ExtractTextPlugin('css/[name].[hash].css'),
		new webpack.optimize.CommonsChunkPlugin('libs', 'js/libs.[hash].js'),
		new AssetsWebpackPlugin({filename: config.releaseDir + 'assets.json'}),
		//定义全局变量
		new webpack.DefinePlugin({
			"process.env": { 
				NODE_ENV: JSON.stringify(env) 
			},
			GLOBAL: {
				DOMAIN: JSON.stringify(config.domain),
				CDN: JSON.stringify(config.cdn)
			}
		}),
		//全局第三方插件自动加载
		new webpack.ProvidePlugin({
		    $: "jquery"
		}),
		//插件最后想要做的中间件
		function() { this.plugin("done", setIndexHtml); }
	];
	switch(env){
		case 'debug':
			plugins.push(new webpack.optimize.OccurenceOrderPlugin());
			plugins.push(new webpack.HotModuleReplacementPlugin());
			plugins.push(new webpack.NoErrorsPlugin());
			return plugins;
			break;
		case 'test':
		case 'production':
			plugins.push(new CleanWebpackPlugin([path.join(__dirname, config.releaseDir)]));
			plugins.push(new webpack.optimize.UglifyJsPlugin({
				compress: { warnings: false } 
			}));
			return plugins;
			break;
		default:
			break;
	}
}

//@name Main
module.exports = {
	port: config.port,
	entry: getEntryConfig(),
	output: {
		path: path.join(__dirname, config.releaseDir),
		publicPath: config.cdn,
		filename: 'js/[name].[hash].js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react']
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=images/[name].[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
			{
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=image/svg+xml'
            },
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'css?sourceMap!'+
					'less?sourceMap!'+
					'autoprefixer?browsers=last 2 versions'
				)
			},
			{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?sourceMap"
                )
            }
		]
	},
	plugins: getPlugins(),
	resolve: {
		root: path.join(__dirname, 'app'),
		extensions: ['', '.js', '.jsx', '.json', '.css', '.less']
	}
};