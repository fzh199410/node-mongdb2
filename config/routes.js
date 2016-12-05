/**
 * Created by fuzhihong on 16/11/28.
 */
var Index=require('../app/controllers/index');
var Movie=require('../app/controllers/movie');
var User=require('../app/controllers/user');
var Comment=require('../app/controllers/comment');
var Catetory=require('../app/controllers/catetory')

module.exports=function(app){
    app.use(function(req,res,next){

        app.locals.user=req.session.user;

        return next();
    });
// index page
    app.get('/',Index.index);

//movie.detail
    app.get('/detail/:id',Movie.detail);
//movie.create
    app.get('/admin/movie',User.saveUrl,User.signinRequired,User.adminRequired,Movie.create);
//movie.new
    app.post('/admin/movie/new',User.saveUrl,User.signinRequired,User.adminRequired,Movie.savePoster,Movie.save);
//movie.list
    app.get('/admin/list',User.saveUrl,User.signinRequired,User.adminRequired,Movie.list);
//movie.delete
    app.delete('/admin/list',User.saveUrl,User.signinRequired,User.adminRequired,Movie.del);
//movie.update
    app.get('/admin/update/:id',User.saveUrl,User.signinRequired,User.adminRequired,Movie.update);

//signup
    app.post('/user/signup',User.signup);
//signin
    app.post('/user/signin',User.signin);
//user list
    app.get('/user/userlist',User.saveUrl,User.signinRequired,User.adminRequired,User.userlist);
//logout
    app.get('/user/logout',User.logout);
//show signin
    app.get('/signin',User.showSignin);
//show signup
    app.get('/signup',User.showSignup);

//comment
    app.post('/user/comment',User.signinRequired,Comment.save);

//catetory
    app.get('/admin/catetory/create',User.saveUrl,User.signinRequired,User.adminRequired,Catetory.create);

    app.post('/admin/catetory/save',User.saveUrl,User.signinRequired,User.adminRequired,Catetory.save);

    app.get('/admin/catetory/list',User.saveUrl,User.signinRequired,User.adminRequired,Catetory.list);

//results
    app.get('/results',Index.search)
}

