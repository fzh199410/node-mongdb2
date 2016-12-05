/**
 * Created by fuzhihong on 16/11/19.
 */
var express=require('express')
var path=require('path');
var mongoose=require('mongoose');
var mongoStore=require('connect-mongo')(express)
var fs =require('fs')

var bodyParser = require('body-parser')
//express 4.0将其分离出来
//var bodyParser = require('body-parser')
//var cookieParser=require('cookie-parser')
//var session=require('express-session')
//var multipart=require('connect-multiparty')
var port=process.env.PORT || 3000

var dbUrl='mongodb://127.0.0.1:27017/imooc'
mongoose.connect(dbUrl)
//modles loading
var models_path=__dirname+'/app/models';
var walk=function(path){
    fs
        .readdirSync(path)
        .forEach(function(file){
            var newPath=path+'/'+file
            var stat=fs.statSync(newPath)
            if(stat.isFile()){
                if(/(.*)\.(js|coffee)/.test(file)){
                    require(newPath)
                }
            }else if(stat.isDirectory()){
                walk(newPath)
            }
        })
}
walk(models_path);

var app=express();

app.set('views','./app/views/pages');

app.set('view engine','jade')

//设置cookie 和session
app.use(express.cookieParser())

app.use(express.session(
    {
        secret:'imooc',
        store:new mongoStore({
            url:dbUrl,
            collection:'sessions'
        })
    }
))

if('development'===app.get('env')){
    app.set('showStackError',true)   //打印信息
    app.use(express.logger(':method :url :status'))   //方法 路径 状态
    app.locals.pretty=true    //格式化后的
    mongoose.set('debug',true)
}
//app.set(‘env’, ‘production’) 入口文件配置生产环境。设置入口文件配置环境


app.use(bodyParser())

app.use(express.multipart())  //表单多文件提交

app.use(express.static(path.join(__dirname,'public')))
//public文件夹下面的文件都静态资源，静态资源放在单独的目录下面便于后期的维护和管理，app文件夹下面一般放的整个后台逻辑代码。
app.locals.moment = require('moment')

require('./config/routes')(app)

app.listen(port)

console.log('start in port'+port)




