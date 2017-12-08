var H5ComponentRing = function (name , cfg) {
    return
    var component = new H5ComponentBase( name, cfg),
        datas = cfg.data;

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
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.arc( r, r, r, 0, 2 * Math.PI );
    ctx.fill();
    ctx.stroke();

    //绘制一个数据层
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    $(canvas).css( "zIndex", 2 );
    component.append( canvas );
    var sAngel = 1.5 * Math.PI; //设置起始角度
    ctx.beginPath();
    ctx.fillStyle = bgc;
    ctx.moveTo( r, r );
    ctx.arc( r, r, r, sAngel, sAngel +  aAngel * item.per );
    ctx.fill();

        //加入项目名称
        var text = $("<div class='text'></div>");
        text.text( item.name );
        var per = $("<div class='per'></div>");
        per.text( item.per * 100 + "%" );
        text.append( per );
        var x = r + Math.sin( .5 * Math.PI - sAngel ) * r,
            y = r + Math.cos( .5 * Math.PI - sAngel ) * r;

        text.css( "opacity", 0 );

        component.append( text );

    //绘制蒙版层，做动画
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    $(canvas).css( "zIndex", 3 );
    component.append( canvas );

    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;


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
        ctx.stroke();
        if( per >= 1 ){
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