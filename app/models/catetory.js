/**
 * Created by fuzhihong on 16/11/30.
 */
var mongoose=require('mongoose');

var CatetorySchema=require('../schemas/catetory');

var Catetory=mongoose.model('Catetory',CatetorySchema);

module.exports=Catetory;