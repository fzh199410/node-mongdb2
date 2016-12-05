/**
 * Created by fuzhihong on 16/11/28.
 */
var Movie=require('../models/movie');
var underscore=require('underscore');
var Comment=require('../models/comment');
var Catetory=require('../models/catetory');

var fs=require('fs');
var path=require('path')
// detail page
exports.detail=function(req,res){
    var id=req.params.id;
    Movie.update({_id:id},{$inc:{pv:1}},function(err){
        console.log(err)
    })
    Movie.findById(id,function(err,result){
        Comment
            .find({movie:id})
            //通过from:{type:ObjectId,ref:'User'}, 查询user表里对应的name
            .populate('from','name')
            .populate('reply.from reply.to','name')
            .exec(function(err,comments){
                console.log(comments)
                res.render('detail',{
                    title:result.title,
                    movie:result,
                    comments:comments
                })
            })
    })
};

//新建或者修改电影
exports.save=function(req,res){
    var id=req.body.movie._id;
    var movieObj=req.body.movie;
    var _movie;
    if(req.poster){
        movieObj.poster=req.poster
    }
    if(id){
        Movie.findById(id,function(err,movie){
            console.log(movie)
            if(err){
            }else{

            }
            _movie=underscore.extend(movie,movieObj);
            console.log(_movie)
            _movie=new Movie(_movie);
            _movie.save(function(err,movie){
                res.redirect('/detail/'+movie.id)
            })

        })
    }else{
        _movie=new Movie(movieObj);
        var _catetoryId=_movie.catetory;
        var _catetoryName=movieObj.catetoryName;
        _movie.save(function(err,movie){
           if(_catetoryId){
               Catetory.findByCondition({_id:_catetoryId},function(err,catetory){
                   catetory.movies.push(_movie._id);
                   catetory.save(function(err,result){
                       movie.catetory=catetory._id;
                       movie.save(function(err,moviemodified){
                           res.redirect('/detail/'+movie._id)
                       })

                   })
               })
           }else if(_catetoryName){
               Catetory.findOne({name:_catetoryName},function(err,hasCatetory){
                   if(hasCatetory){
                       Catetory.findByCondition({name:_catetoryName},function(err,catetory){
                           catetory.movies.push(_movie._id);
                           catetory.save(function(err,result){
                               movie.catetory=hasCatetory._id;
                               movie.save(function(err,moviemodified){
                                   res.redirect('/detail/'+movie._id)
                               })
                           })
                       })
                   }else{
                       var catetory=new Catetory({
                           name:_catetoryName,
                           movies:[movie._id]
                       })
                       catetory.save(function(err,catetory){
                           movie.catetory=catetory._id;
                           movie.save(function(err,moviemodified){
                               res.redirect('/detail/'+movie._id)
                           })
                       })
                   }
               })

           }
        })
    }
};
//admin poster save
exports.savePoster=function(req,res,next){
    var posterData=req.files.uploadPoster;
    var filePath=posterData.path;
    var originalFilename=posterData.originalFilename
    if(originalFilename){
        fs.readFile(filePath,function(err,data){
            var timestamp=Date.now()
            var type=posterData.type.split('/')[1]
            var poster=timestamp+'.'+type
            var newPath=path.join(__dirname,'../../','/public/upload/'+poster)
            fs.writeFile(newPath,data,function(err){
                req.poster=poster;
                next()
            })
        })
    }else{
        next()
    }
};


// list page
exports.list=function(req,res){
    Movie.fetch(function(err,result){
        res.render('list',{
            title:'小电影 列表页',
            movies:result
        })
    })
};

// admin page
exports.create=function(req,res){
    Catetory.find({},function(err,catetories){
        res.render('admin',{
            title:'小电影 后台',
            movie:{},
            catetories:catetories
        })
    });

};

//更新电影
exports.update=function(req,res){
    var id=req.params.id;

    if(id){
        Movie.findById(id,function(err,movie){
            Catetory.find({},function(err,catetories){
                res.render('admin',{
                    title:movie.title,
                    movie:movie,
                    catetories:catetories
                })
            });
        })
    }
};

//list delete
exports.del=function(req,res){
    var id=req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){console.log(err)}
            else{
                res.json({success:1})
            }
        })
    }

};