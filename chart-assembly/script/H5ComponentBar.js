var H5ComponentBar = function (name , cfg) {
    var component = new H5ComponentBase( name, cfg);

    $.each(cfg.data, function (index, item) {
        var line = $('<div class="line"></div>'),
            name = $('<div class="name"></div>'),
            rate = $('<div class="rate"></div>'),
            bg = $('<div class="bg"></div>'),
            per = $('<div class="per"></div>'),
            width = item.per * 100 + "%";

        name.text( item.name );
        rate.css('width', width).append(bg)

        item.bgc && bg.css( "backgroundColor", item.bgc);


        per.text( width );
        line.append( name ).append( rate ).append( per );
        component.append( line );

    })

    return component;
}