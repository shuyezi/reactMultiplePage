/**
 * Created by Jimmy on 2016/7/1.
 * @name 根据路径和内容生成文件
 */

var fs = require('fs');

function mkdirSync(url, mode, callback){
    var path = require("path"), arr = url.split("/");
    var mode = mode || 0755;
    var callback = callback || function(){};
    if(arr[0]==="."){	//处理 ./xxx
        arr.shift();
    }
    if(arr[0] == ".."){	//处理 ../xxx/xxx
        arr.splice(0,2,arr[0]+"/"+arr[1]);
    }
    function inner(cur){
        if(!fs.existsSync(cur)){	//不存在就创建一个
            fs.mkdirSync(cur, mode);
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            callback();
        }
    }
    arr.length && inner(arr.shift());
}

function GenerateHtml(config){
	this.name = config.name || 'index.html';
	this.fileContent = config.fileContent;
	this.path = config.path;
    this.assets = config.assets;
    this.callback = config.callback || function(){};
	this.init();
}

GenerateHtml.prototype.init = function(){
    this.fileContent = this.fileContent.replace("@PATH_INDEX_STYLE@", this.assets.STYLE);
    this.fileContent = this.fileContent.replace("@PATH_LIB_STYLE@", this.assets.LIBSTYLE);
    this.fileContent = this.fileContent.replace("@PATH_INDEX_JS@", this.assets.JS);
    this.fileContent = this.fileContent.replace("@PATH_LIB_JS@", this.assets.LIBJS);
    // this.fileContent = this.fileContent.replace("@PATH_SCRIPT@", "<script type='text/javascript'>window['GLOBAL']['CDN']='"+this.assets.CDN+"';window['GLOBAL']['DOMAIN']='"+this.assets.DOMAIN+"';</script>")
    var _this = this;
    mkdirSync(_this.path, false, function(err){
        if(err) throw err;
        fs.writeFile(_this.path + _this.name, _this.fileContent, function(error){
            if(error) throw error;
            _this.callback();
            // console.log(_this.path + _this.name + "创建成功");
        });
    });
}

module.exports = GenerateHtml;