//基本图文组件

var H5ComponentPoint = function (name, cfg ) {
    var component = new H5ComponentBase( name, cfg),
        base = cfg.data[0].per; //以第一个数据的 比例大小
    $.each(cfg.data, function (index, item) {

        var point = $('<div class="point point_' + index + '"></div>'),
            per = ( item.per / base * 100 )  + "%",
            name = $('<div class="name">'+ item.name + '</div>'),
            rate = $('<div class="per">'+ ( item.per *100 ) + '%</div>');

        name.append( rate )
        point.append( name );

        item.project  && point.text(item.project)
        item.css       && point.css(item.css)

        point.width(per).height(per);
        point.css( "transition", "all 1s " + index * .5 + "s");
        component.append( point )
    });

    return component;
};
