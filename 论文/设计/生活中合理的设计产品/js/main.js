$(function () {
    //��ҳ�����Ӳ˵�
    var nav = $(".navbar li");
    nav.hover(function(){
        $(this).find("ul").slideToggle(300);
    });
    //�ֲ�ͼ
    var slide = $(".slide");
    var img = $(".slide a");
    var i = 0;
    var n = 1;
    var left = $(".left");
    var right = $(".right");
    var ul = $(".slide ul");
    var li = $(".slide ul li");
    //����ͼƬ����,��ֵi
    img.each(function () {
        i++;
        $(this).addClass("slide"+i);
    });
    //�����Զ��ֲ�����
    function changeImg(){
        var s = n%i+1;
        slide.find(".slide"+s).show().siblings("a").hide();
        li.each(function(){
            $(this).removeClass("active");
        });
        $(".li"+s).addClass("active");
        n++;
    }
    var loop = setInterval(changeImg,3000);
    //��꾭��ֹͣ�ֲ�
    slide.hover(function(){
        clearInterval(loop);
    },function(){
        loop = setInterval(changeImg,3000);
    });
    //���Ҽ�ͷ�л�
    left.click(function(){
        if(n==1){
            n=3;
        }else{
            n-=2;
        }
        changeImg();
    });
    right.click(function(){
        changeImg();
    });
    //СԲ���Զ�ˮƽ����
    var ml = -i/2*22+'px';
    ul.css("margin-left",ml);
    //СԲ�����л�
    li.click(function(){
        var m = $(this).index();
        n=m;
        changeImg();
    });
    //��Ʒչʾѡ�
    var tab = $(".item1 ul li");
    var tabs = $(".tab");
    tab.hover(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        tabs.addClass("hide");
        $(".tab"+index).removeClass("hide");
    });
    //��Ʒչʾ�ֲ�ͼ
    var ol = $(".fengcai-pic ul li");
    var pics = $(".pic");
    var title = $(".title");
    title.text($(".pic:eq(0) img").attr("alt"));
    ol.click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        pics.hide();
        $(".pic"+index).show();
        title.text($(".i"+index).attr("alt"));
    });
    //��Ʒ����
    $("#select1 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectA").remove();
        } else {
            var copyThisA = $(this).clone();
            if ($("#selectA").length > 0) {
                $("#selectA a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisA.attr("id", "selectA"));
            }
        }
    });

    $("#select2 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectB").remove();
        } else {
            var copyThisB = $(this).clone();
            if ($("#selectB").length > 0) {
                $("#selectB a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisB.attr("id", "selectB"));
            }
        }
    });

    $("#selectA").live("click", function () {
        $(this).remove();
        $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
    });

    $("#selectB").live("click", function () {
        $(this).remove();
        $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
    });

    $(".select dd").live("click", function () {
        if ($(".select-result dd").length > 1) {
            $(".select-no").hide();
        } else {
            $(".select-no").show();
        }
    });
    //����չʾ
    $('#Container').mixItUp();
    $(document).ready(function() {
        $(".fancybox").fancybox();
    });
});