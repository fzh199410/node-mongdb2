/**
 * Created by fuzhihong on 16/11/30.
 */
$(function(){
    $('#douban').blur(function(){
        var douban=$(this);
        var id=douban.val();
        if(id){
            $.ajax({
                url:'https://api.douban.com/v2/movie/subject/'+id,
                cache:true,
                type:'get',
                dataType:'jsonp',
                crossDomain:true,
                jsonp:'callback',
                success:function(data){
                    $('#inputTitle').val(data.title)
                    $('#inputDirector').val(data.directors[0].name)
                    $('#inputCountry').val(data.countries[0])
                    $('#inputPoster').val(data.images.large)
                    $('#inputYear').val(data.year)
                    $('#inputCatetoryName').val(data.genres[0])
                    $('#inputSummary').val(data.summary)
                }
            })
        }

    })
})