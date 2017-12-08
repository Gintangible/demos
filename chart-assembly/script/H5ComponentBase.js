//基本图文组件

var H5ComponentBase = function (name, cfg ) {
    var cfg = cfg || {},
        id = ( 'h5_c_' + Math.random() ).replace("." ,"_"),
        //把当前的组件类型添加到样式中进行标记
        cls = ' h5_component_' + cfg.type,
        //h5_component: 表明是一个组件 h5_component_base：表明这是某个类型的组件 h5_component_name_xxx：自定义组件名，用于附加样式
        component = $('<div class="h5_component h5_component_name_' + name + cls + '" id="' + id +'"></div>');

    cfg.text    && component.text(cfg.text);
    cfg.width   && component.width(cfg.width / 2);
    cfg.height  && component.height(cfg.height / 2);

    cfg.css && component.css( cfg.css );
    cfg.bg  && component.css("backgroundImage", "url(" + cfg.bg + ")");

    if( cfg.center === true){
        component.css({
            marginLeft: (cfg.width / 4 * -1) + "px",
            left: "50%",
            position: "absolute"
        })
    }

    // ...添加很多自定义的参数
    if( cfg.events ){
        var events = cfg.events;
        for( k in events ){
            component.on( k, events[k] );
        }
    }


    component.on("onLoad",function () {
        setTimeout( function () {
            component.addClass(cls + '_load').removeClass(cls + '_leave');
            cfg.animateIn &&  component.animate( cfg.animateIn );
        }, cfg.delay)

        return false;
    });

    component.on("onLeave",function () {
        setTimeout( function () {
            component.addClass(cls + '_leave').removeClass(cls + '_load');
            cfg.animateOut && component.animate( cfg.animateOut );
        }, cfg.delay)
        return false;
    });

    return component;
}
