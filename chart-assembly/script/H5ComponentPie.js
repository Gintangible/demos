var H5ComponentPie = function (name , cfg) {
    var component = new H5ComponentBase( name, cfg),
        datas = cfg.data,
        len = datas.length;

    //绘制背景层
    var w = cfg.width,
        h = cfg.height;

    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    $(canvas).css( "zIndex", 1 );
    component.append( canvas );

    var r = w / 2;
    //加入一个底图层
    ctx.beginPath();
    ctx.fillStyle = "#eee";
    ctx.arc( r, r, r, 0, 2 * Math.PI );
    ctx.fill();

    //绘制一个数据层
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    $(canvas).css( "zIndex", 2 );
    component.append( canvas );

    var colors = [ "red", "green", "blue", "gray"];//备用颜色
    var sAngel = 1.5 * Math.PI; //设置起始角度
    var eAngel = 0;
    var aAngel = 2 * Math.PI;//100%圆的角度

    for( var i = 0; i < len; i++ ){
        var item = datas[i],
            bgc = item.bgc || colors.pop();
        eAngel = sAngel +  aAngel * item.per;
        ctx.beginPath();
        ctx.fillStyle = bgc;
        ctx.moveTo( r, r );
        ctx.arc( r, r, r, sAngel, eAngel );
        ctx.fill();
        sAngel = eAngel;

        //加入项目名称
        var text = $("<div class='text'></div>");
        text.text( item.name );
        var per = $("<div class='per'></div>");
        per.text( item.per * 100 + "%" );
        text.append( per );
        var x = r + Math.sin( .5 * Math.PI - sAngel ) * r,
            y = r + Math.cos( .5 * Math.PI - sAngel ) * r;

        if( x > w / 2 ){
            text.css(  "left", x / 2 );
        }else{
            text.css(  "right", ( w - x ) / 2 );
        }
        if( y > h / 2 ){
            text.css(  "top", y / 2 );
        }else{
            text.css(  "bottom", ( h - y ) / 2 );
        }

        text.css( "opacity", 0 );
        component.append( text );
    }

    //绘制蒙版层，做动画
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    $(canvas).css( "zIndex", 3 );
    component.append( canvas );

    ctx.fillStyle = "#eee";

    var draw = function ( per ) {
        ctx.clearRect( 0, 0, w, h );
        ctx.beginPath();
        ctx.moveTo( r, r );
        if( per <=0 ){
            ctx.arc( r, r, r, 0, 2 * Math.PI );
        }else{
            ctx.arc( r, r, r, sAngel,sAngel + 2 * Math.PI * per, true );
        }
        ctx.fill();
        if( per >= 1 ){
            component.find(".text").css( "transition", "all 0s" );
            H5ComponentPie.reSort(component.find(".text"));
            component.find(".text").css( "transition", "all 1s" );
            component.find(".text").css( "opacity", 1 );
        }
        if( per <=  1){
            component.find(".text").css( "opacity", 0 );
        }
    };
    draw( 0 );
    component.on( "onLoad", function () {
        //pie图生长动画
        var s = 0;
        for( var i = 0; i < 100; i++ ){
            setTimeout( function () {
                s += .01;
                draw( s );
            }, i * 10 );
        }
    });
    component.on( "onLeave", function () {
        //pie图退出动画
        var s = 1;
        for( var i = 0; i < 100; i++ ){
            setTimeout( function () {
                s -= .01;
                draw( s );
            }, i * 10 );
        }
    });

    return component;
};

//重排项目文本元素
H5ComponentPie.reSort = function ( list ) {
    //1.检测相交
    var compare = function ( domA, domB ) {
        var offsetA = $(domA).offset(),
            shadowA_x = [ offsetA.left, offsetA.left + $(domA).width() ],
            shadowA_y = [ offsetA.top, offsetA.top + $(domA).height() ];
        var offsetB = $(domB).offset(),
            shadowB_x = [ offsetB.left, offsetB.left + $(domB).width() ],
            shadowB_y = [ offsetB.top, offsetB.top + $(domB).height() ];
         //x and y
        var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] ) || ( shadowA_x[1] > shadowB_x[0] && shadowA_x[1] < shadowB_x[1] );
        var intersect_y = ( shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] ) || ( shadowA_y[1] > shadowB_y[0] && shadowA_y[1] < shadowB_y[1] );
        return intersect_x && intersect_y;
    };

    //2.错开重排
    var reset = function ( domA, domB ) {
        if( $(domA).top != "auto"){
            $(domA).css({
                top: paeseInt($(domA).top) + $(domB).height()
            })
        }
        if( $(domA).bottom != "auto"){
            $(domA).css({
                bottom: paeseInt($(domA).bottom) + $(domB).height()
            })
        }
    };

    //定义将要重排的元素
    var willReset = [list[0]];
    $.each( list, function ( index, item ) {
       if( compare( willReset[willReset.length-1], item ) ){
            willReset.push(item);
       }
    });
    if( willReset.length > 1 ){
        $.each( willReset, function (i, domA) {
            if( willReset[i+1] ){
                reset(domA, willReset[i+1] );
            }
        });
        H5ComponentPie.reSort( willReset );
    }
};

















