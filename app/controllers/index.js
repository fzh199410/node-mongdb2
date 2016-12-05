/**
 * Created by fuzhihong on 16/11/28.
 */

var Movie=require('../models/movie');
var Catetory=require('../models/catetory');
exports.index=function(req,res){
    Catetory.find({})
            .populate({path:'movies',options:{limit:6}})
            .exec(function(err,catetories){
                if(err){console.log(err)}
                res.render('index',{
                    title:'小电影 首页',
                    catetories:catetories
                })
            })
};
//search
exports.search=function(req,res){
    var catId=req.query.cate;
    var page=parseInt(req.query.page,10)||1;
    var NumberOfEach=6;
    var index=(page-1)*NumberOfEach;
    if(catId){
        Catetory.find({_id:catId})
            //.populate({path:'movies',select:'title poster',options:{limit:6,skip:index}})
            .populate({path:'movies'})
            .exec(function(err,catetories){
                var allMovies=catetories[0].movies;
                var catetoryName=catetories[0].name;
                var movies=allMovies.slice(index,index+NumberOfEach);
                if(err){console.log(err)}
                res.render('result',{
                    title:'小电影 搜索列表页面',
                    movies:movies,
                    currentPage:page,
                    totalPages:Math.ceil(allMovies.length/NumberOfEach),
                    catetoryName:catetoryName,
                    query:'cate='+catetories[0]._id
                })
            })
    }else{
        var search=req.query.search;
        Movie.findByTitle(new RegExp(search+'.*','i'),function(err,results){
            var movies=results.slice(index,index+NumberOfEach);
            console.log(movies)
            res.render('result',{
                title:'小电影 搜索列表页面',
                movies:movies,
                currentPage:page,
                totalPages:Math.ceil(results.length/NumberOfEach),
                catetoryName:search,
                query:'search='+search
            })
        })
    }

};