/**
 * Created by fuzhihong on 16/11/29.
 */
var Comment=require('../models/comment');

// comment
exports.save=function(req,res){
  var _comment=req.body.comment;
  var movieId=_comment.movie;

    if(_comment.cid){
        Comment.findByCondition({_id:_comment.cid},function(err,comment){
            var reply={
                from:_comment.from,
                to:_comment.tid,
                content:_comment.content
            }
            comment.reply.push(reply)
            console.log(comment)
            comment.save(function(err,comment){
                if(err){console.log(err)}

                res.redirect('/detail/'+movieId)
            })
        })
    }else{
        var comment=new Comment(_comment);
        comment.save(function(err,result){
            if(err){console.log(err)}

            res.redirect('/detail/'+movieId)
        })
    }
};
