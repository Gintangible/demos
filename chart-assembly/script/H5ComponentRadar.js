var H5ComponentRadar = function (name , cfg) {
    var component = new H5ComponentBase( name, cfg),
        datas = cfg.data,
        len = datas.length,
        radarCfg = cfg.radar;

    //绘制背景层
    var w = cfg.width,
        h = cfg.height;

    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    component.append( canvas );

    var r = w / 2;

    //绘制网格背景
    var isColor  = false;
    for( var s = 10; s > 0; s-- ){
        ctx.beginPath();
        for( var i = 0; i < len + 1; i++ ){
            var rad = 2 * Math.PI * i / len ,
                x = r + Math.sin( rad ) * r * ( s / 10 ),
                y = r + Math.cos( rad ) * r * ( s / 10 );
            ctx.lineTo( x, y );
        }

        ctx.closePath();
        ctx.fillStyle = ( isColor = !isColor ) ? radarCfg.bgColor1 : radarCfg.bgColor2;
        ctx.fill();
    }

    //绘制伞骨
    for( var i = 0; i < len; i++ ){
        var item = datas[i],
            rad = 2 * Math.PI * i / len ,
            x = r + Math.sin( rad ) * r,
            y = r + Math.cos( rad ) * r;
        ctx.moveTo( r, r );
        ctx.lineTo( x, y );

        //输出项目名称
        var text = $("<div class='text'></div>");
        text.text( item.name );
        text.css( "transition", "all .5s " + i * .1 + "s" );

        if( x > w / 2){
            text.css( 'left',x / 2 );
        }else {
            text.css( 'right', ( w - x ) / 2 );
        }

        if( item.bgc ){
            text.css( "color", item.bgc );
        }

        if( y > w / 2){
            text.css( 'top',y / 2 );
        }else {
            text.css( 'bottom', ( h - y ) / 2 );
        }

        text.css( "opacity", 0 );
        component.append( text );
    }
    ctx.strokeStyle = radarCfg.borderColor;
    ctx.stroke();

    /*
    * 绘制折线以及对应数据+阴影
    * @param { float } per
    * */
    var canvas2 = document.createElement("canvas"),
        ctx2 = canvas2.getContext("2d");

    canvas2.width = w;
    canvas2.height = h;
    component.append( canvas2 );
    var draw = function ( per ) {
        if( per >= 1 ){
            component.find(".text").css( "opacity", 1 );
        }
        if( per <= 1 ){
            component.find(".text").css( "opacity", 0 );
        }
        ctx2.clearRect( 0, 0, w, h );
        //输出数据的折线
        ctx2.beginPath();
        for( var i = 0; i < len ; i++ ){
            var rate = datas[i].per,
                rad = 2 * Math.PI * i / len ,
                x = r + Math.sin( rad ) * r * rate * per,
                y = r + Math.cos( rad ) * r * rate * per;
            ctx2.lineTo( x, y );
        }
        ctx2.closePath();
        ctx2.fillStyle = radarCfg.conColor;
        ctx2.strokeStyle = '#000';
        ctx2.fill();
        ctx2.stroke();
    };

    component.on( "onLoad", function () {
        //雷达图生长动画
        var s = 0;
        for( var i = 0; i < 100; i++ ){
            setTimeout( function () {
                s += .01;
                draw( s );
            }, i * 10 );
        }
    });
    component.on( "onLeave", function () {
        //雷达图退出动画
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