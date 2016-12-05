/**
 * Created by fuzhihong on 16/11/19.
 */

var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var MovieSchema=new Schema({
    director:String,
    title:String,
    catetory: {
        type: ObjectId,
        ref: 'Catetory'
    },
    pv: {
        type: Number,
        default:0
    },
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
});
MovieSchema.statics={
    fetch:function(cb){
        return this.find({})
                    .sort('meta.updateAt')
                    .exec(cb)
    },
    findById:function(id,cb){
        return this.findOne({_id:id}).exec(cb)
    },
    findByTitle:function(title,cb){
        return this.find({title:title}).exec(cb)
    }
};
module.exports=MovieSchema