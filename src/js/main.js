console.log('start')

$(function click(){
    $('.js-click').click(function(){
        $(this).toggleClass('on');
    });
});