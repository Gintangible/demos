var H5_loading = function ( images, firstPage ) {
    var me = this;
    if( this._images === undefined ){//首次进入
        this._images = ( images || [] ).length;
        this._loaded = 0;
        for( var i = 0, len = images.length;  i < len; i++ ){
            var img = new Image();
            img.onload = function () {
                me.loader();
            };
            img.src = images[i];
        }
        $("#rate").text("0%");
        return this;
    }else{
        this._loaded++;
        $("#rate").text( ( ( this._loaded/this._images* 100 ) >> 0 ) + "%" );
        if( this._loaded < this._images ){
            return this;
        }
    }

    this.el.fullpage({
        onLeave: function (index, nextIndex, direction) {
            $(this).find(".h5_component").trigger("onLeave");
        },
        afterLoad: function (anchorLink , index) {
            $(this).find(".h5_component").trigger("onLoad");
        }
    });
    this.page[0].find(".h5_component").trigger("onLoad");
    this.el.show();
    firstPage && $.fn.fullpage.moveTo( firstPage )

};

