var H5ComponentPolyline = function (name , cfg) {
    var component = new H5ComponentBase( name, cfg),
        datas = cfg.data,
        len = datas.length,
        ctxCfg = cfg.ctx;

    //绘制网格线
    var w = cfg.width,
        h = cfg.height;

    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    component.append( canvas );

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = ctxCfg.bdcolor;

    //水平线网格线数量 step
    for( var i = 0, step = ctxCfg.step; i < step + 1; i++ ){
        var horWidth = ( h / step ) * i;
        ctx.moveTo( 0, horWidth );
        ctx.lineTo( w, horWidth );
    }

    //垂直线
    var text_w = w / ( len + 1) >> 0;
    for( var i = 0, step = len + 1; i < step + 1; i++ ){
        var verWidth = ( w / step) * i;
        ctx.moveTo( verWidth, 0 );
        ctx.lineTo( verWidth, h );

        //输出文本
        if( datas[i] ){
            var text = $("<div class='text'></div>");
            text.text( datas[i].name );
            text.css({
                width : text_w / 2,
                left : ( verWidth + text_w / 2 ) / 2
            });
            component.append( text );
        }
    }
    ctx.stroke();

    //加入画布——数据层
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    component.append( canvas );

    /*
    * 绘制折线以及对应数据+阴影
    * @param { float } per

    * */
    function draw( per ) {
        // 清空画布
        ctx.clearRect( 0, 0, w, h );
        //绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = ctxCfg.lineColor;

        //绘制点
        var row_w = w /  ( len + 1 );

        for(var i = 0; i < len; i++ ){
            var item = datas[i],
                x = row_w * ( i + 1),
                y = h * ( 1 - item.per * per) ;
            ctx.moveTo( x, y );
            ctx.arc( x, y, 5, 0, 2 * Math.PI );
        }

        //连线
        ctx.moveTo( row_w, h * ( 1 - datas[0].per * per) );
        for(var i = 0; i < len; i++ ){
            var item = datas[i],
                x = row_w * ( i + 1),
                y = h * ( 1 - item.per * per ) ;
            ctx.lineTo( x, y );
        }
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba( 255, 255, 255, 0)";

        //绘制阴影
        ctx.lineTo( x, h );
        ctx.lineTo( row_w, h );
        ctx.fillStyle = ctxCfg.bgColor;
        ctx.fill();

        //项目数据
        for(var i = 0; i < len; i++ ){
            var item = datas[i],
                x = row_w * ( i + 1),
                y = h * ( 1 - item.per * per) ;
            ctx.fillStyle = item.bgc ? item.bgc : "#595959";
            ctx.fillText( ( ( item.per *  100 ) >> 0 ) + "%", x - 10, y - 10 );//去掉小数点
        }
        ctx.stroke();
    }

    component.on( "onLoad", function () {
        //折线图生长动画
        var s = 0;
        for( var i = 0; i < 100; i++ ){
            setTimeout( function () {
                s += .01;
                draw( s );
            }, i * 10 );
        }
    });
    component.on( "onLeave", function () {
        //折线图退出动画
        var s = 0;
        for( var i = 0; i < 100; i++ ){
            setTimeout( function () {
                s -= .01;
                draw( s );
            }, i * 10 );
        }
    });

    return component;
};