/**
 * Created by fuzhihong on 16/11/23.
 */

$(function () {
    commentsForm=$('#commentsForm')
    $('.comment').on('click',function(){
        var target=$(this)
        var toId=target.data('tid')
        var commentId=target.data('cid')
        if($('#toId').length>0&&$('#commentId').length>0){
            $('#toId').val(toId);
            $('#commentId').val(commentId);
        }else{

            $('<input>').attr({
                type:'hidden',
                id:'toId',
                name:'comment[tid]',
                value:toId
            }).appendTo(commentsForm)
            $('<input>').attr({
                type:'hidden',
                id:'commentId',
                name:'comment[cid]',
                value:commentId
            }).appendTo(commentsForm)
        }

    })
})