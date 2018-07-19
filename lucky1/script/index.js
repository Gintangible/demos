/**
 * Created by 2144 on 2016/9/6.
 */
;(function(win,doc,undefined){
    var Ajuan = (function (win,doc,undefined) {
        var _a,
            emptyArray = [],
            ajuan = {},
            emptyObject = {},
            core_toString = Object.prototype.toString,
            trimReg = /(^\s*)|(\s*$)/g,
            rclass = /[\t\r\n]/g,
            isArray = Array.isArray ||
                function(object){ return object instanceof Array };
        function Z(dom, selector) {
            var i,
                len = dom ? dom.length : 0;
            for (i = 0; i < len; i++) this[i] = dom[i]
            this.length = len;
            this.selector = selector || '';
        }
        function type(obj) {
            return obj == null ? String(obj) :
            emptyObject[emptyObject.toString.call(obj)] || "object"
        }
        ajuan.Z = function (dom,selector) {
            return new Z(dom,selector);
        };
        ajuan.isZ = function (object) {
            return object instanceof ajuan.Z
        };
        ajuan.init = function (selector) {
            var dom;
            if(!selector) return ajuan.Z();
            else if(typeof selector == 'string'){
                selector = selector.replace(trimReg,'');
                dom = ajuan.qsa(doc, selector)
            }else if(ajuan.isZ(selector)){
                return selector;
            }else if(type(selector) == "object"){
                if(isArray(selector)){
                    dom = selector;
                }else{
                    dom = [selector], selector = null;
                }
            }
            return ajuan.Z(dom,selector);
        };
        ajuan.qsa= function (element, selector) {
            var found,
                maybeID = selector.indexOf('#') > -1 ? true: false,//是否为ID
                maybeClass = !maybeID && selector.indexOf('.') > -1;//是否为class
            if(maybeID){
                found =  [element.getElementById(selector.replace('#',''))];
            }else if(maybeClass){
                found = element.querySelectorAll ? element.querySelectorAll(selector) : (function(ele){
                    selector = selector.replace('.','');
                    var ele = ele.getElementsByTagName('*'),
                        Result = [],
                        arr = [];
                    for(var i=0;i<ele.length;i++) {
                        arr = ele[i].className.split(' ');
                        for (var j=0;j<arr.length;j++) {
                            if(arr[j] == selector) {
                                Result.push(ele[i]);
                            }
                        }
                    }
                    return Result;
                }(element));
            }else{
                found = element.getElementsByTagName(selector);
            }
            return found;
        };
        ajuan.isFunction = function (obj) {
            return ajuan.type(obj) === "function";
        };
        ajuan.type = function (obj) {
            return obj == null ?
                String( obj ) :
            emptyObject[ core_toString.call(obj) ] || "object";
        };
        ajuan.each = function( obj, callback, args ) {
            var name,
                i = 0,
                length = obj.length,
                isObj = length === undefined || ajuan.isFunction( obj );
            if ( args ) {
                if ( isObj ) {
                    for ( name in obj ) {
                        if ( callback.apply( obj[ name ], args ) === false ) {
                            break;
                        }
                    }
                } else {
                    for ( ; i < length; ) {
                        if ( callback.apply( obj[ i++ ], args ) === false ) {
                            break;
                        }
                    }
                }
            } else {
                if ( isObj ) {
                    for ( name in obj ) {
                        if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
                            break;
                        }
                    }
                } else {
                    for ( ; i < length; ) {
                        if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
                            break;
                        }
                    }
                }
            }
            return obj;
        };
        //入口
        _a = function (selector) {
            return ajuan.init(selector);
        };
        //遍历
        _a.each = ajuan.each;
        //判断浏览器是否是IE，如果是IE则返回IE版本号，反之则返回false
        _a.IETester = function (userAgent) {
            var UA = userAgent || navigator.userAgent;
            if (/msie/i.test(UA)) {
                return UA.match(/msie (\d+\.\d+)/i)[1];
            } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
                return UA.match(/rv:(\d+\.\d+)/)[1];
            }
            return false;
        };
        //去除前后空格
        _a.trim = function (str) {
            return str.replace(trimReg,'');
        };
        //获取event事件
        _a.event = function (event) {
            return event ? event : win.event;
        };
        //获取target
        _a.target = function (event) {
            var event = _a.event(event);
            return event.target || event.srcElement;
        };
        //阻止浏览器默认事件
        _a.preventDefault = function(event){
            var event = _a.event(event);
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        };
        //阻止冒泡事件
        _a.stopPropagation = function(event){
            var event = _a.event(event);
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        };
        //包含的方法
        _a.fn = {
            constructor: ajuan.Z,
            length: 0,
            forEach: emptyArray.forEach,
            reduce: emptyArray.reduce,
            push: emptyArray.push,
            sort: emptyArray.sort,
            splice: emptyArray.splice,
            indexOf: emptyArray.indexOf,
            //设置属性
            data: function (key,value) {
                return  key && value ? this.each(function () {
                    this.setAttribute(key,value);
                }):(0 in this ? this[0].getAttribute(key) : null);
            },
            //查找子元素
            find: function (selector) {
                var findEle = [];
                this.each(function () {
                    selector = selector.replace(trimReg,'');
                    //findEle.push.apply( findEle , ajuan.qsa(this, selector)) ;
                    var arr = ajuan.qsa(this, selector);
                    _a.each(arr, function (index,item) {
                        findEle.push(item);
                    })
                });
                return ajuan.Z(findEle,selector);
            },
            //改变元素内容
            html: function (htmlStr) {
                if(typeof htmlStr != 'undefined'){
                    return this.each(function () {
                        this.innerHTML = htmlStr;
                    })
                }else{
                    return 0 in this ? this[0].innerHTML : null;
                }
            },
            //显示元素
            show: function () {
                return this.each(function () {
                    this.style.display = 'block';
                });
            },
            //隐藏元素
            hide: function () {
                return this.each(function () {
                    this.style.display = 'none';
                });
            },
            //事件移除
            unbind: function(type,handler){
                return this.each(function () {
                    if(this.removeEventListener){
                        this.removeEventListener(type, handler, false);
                    }else if(this.attachEvent){
                        this.detachEvent('on' + type,handler);
                    }else{
                        this["on" + type] = null;
                    }
                });
            },
            //事件绑定
            on: function (type,handler) {
                return this.each(function () {
                    if(this.addEventListener){
                        this.addEventListener(type, handler, false);
                    }else if(this.attachEvent){
                        this.attachEvent('on' + type,handler);
                    }else{
                        this['on' + type] = handler;
                    }
                });
            },
            //添加样式
            addClass: function( className ) {
                className = _a.trim(className);
                if(!className) return this;
                return this.each(function () {
                    if(_a(this).hasClass(className)) return;
                    if(this.classList){
                        this.classList.add(className);
                    }else{
                        this.className = _a.trim(this.className + ' ' + className);
                    }
                });
            },
            //删除样式
            removeClass: function (className) {
                className = _a.trim(className);
                if(!className) return this;
                return this.each(function () {
                    if(!_a(this).hasClass(className)) return;
                    if(this.classList){
                        this.classList.remove(className);
                    }else{
                        this.className = _a.trim(this.className.replace(className,''));
                    }
                });
            },
            //判断是否有样式
            hasClass: function (className) {
                var className = " " + className + " ",
                    i = 0,
                    l = this.length;
                for ( ; i < l; i++ ) {
                    if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                        return true;
                    }
                }
                return false;
            },
            //遍历
            each: function (callback,args) {
                return ajuan.each( this, callback, args );
            }
        };
        ajuan.Z.prototype = Z.prototype = _a.fn;
        return _a;
    }(win,doc));
    if(typeof define === 'function' && define.amd){
        define('Ajuan',[],function(){return Ajuan});
    }else{
        win.Ajuan = Ajuan;
        win._a === undefined && ( win._a = Ajuan);
    }
}(this,document));
;(function (win,doc,_a,undefined) {
    var clickEvent,
        options,
        IE = _a.IETester(),
        DEFAULT = {
            maskIdName:'_popup_mask',
            popupIdName:'_popup',
            closeClassNameArr:['_popup_close','_popup_btn_sure'],
            animate:{
                isAnimate:true,
                closeAnimate:'_fadeOut',
                openAnimate:'_bounceIn',
                animateTime:300
            }
        },
        recordObj = {
            ary : [],
            index : 1,
            page : 6,
            allpage : 0,
            type : 'jl',
            getDatas : function(index){
                var start = (index - 1) * this.page,
                    end = start + this.page;
                if(end > this.ary.length) end = this.ary.length;
                var ary = this.ary.slice(start,end),
                    str = '';
                if(recordObj.type == 'jl'){
                    _a(ary).each(function () {
                        var item = this;
                        if(item.type == 0){ //卡玛
                            //var name = item.code_name || item.name;
                            var name = item.name;
                            str += '<li class="_popup_record_item"><em title="'+ name +'" class="_popup_record_name">'+ name +'</em>' +
                            '<input class="_popup_record_card" value="'+ item.code +'" readonly="readonly"><i class="_popup_record_copy_btn">复制</i></li>';
                        }else if(item.type == 1){//实物
                            str += '<li class="_popup_record_item"><em title="'+ item.name +'" class="_popup_record_name">'+ item.name +'</em>' +
                            '<span class="_popup_record_card">'+ item.code +'</span><a class="_popup_link" href="http://kf.2144.cn/" target="_blank">联系客服</a></li>';
                        }
                    });
                    _a('._popup_record_con')[0].innerHTML = str;
                }else if(recordObj.type == 'cyjl'){
                    _a(ary).each(function (index, item) {
                        var isT = '';
                        if(item.prize == 0 ){
                            isT = '未中奖';
                        }else if(item.prize == 1 ){
                            isT = '中奖';
                        }else{
                            isT = '未开奖';
                        }
                        str += '<li class="_popup_record_item_2"><span class="_popup_record_item1">第'+ item.stage +'期</span>' +
                        '<span class="_popup_record_item2">'+ item.count +'</span><span class="_popup_record_item3">'+ isT +'</span></li>';
                    });
                    _a('._popup_record_con_2')[0].innerHTML = str;
                }
                if(recordObj.allpage <= 1) return;
                _a('._popup_strong')[0].innerHTML = index;
                var prevEle = _a('._popup_btn_pre')[0],
                    nextEle = _a('._popup_btn_next')[0];
                prevEle.style.display = index > 1 ? 'inline-block' : 'none';
                nextEle.style.display = index == recordObj.allpage ? 'none' : 'inline-block';
            }
        };
    function ajuanPopup(opt){
        options = opt || {};
        this.maskIdName = options.maskIdName || DEFAULT.maskIdName;
        this.popupIdName = options.popupIdName || DEFAULT.popupIdName;
        this.closeClassNameArr = options.closeClassNameArr || DEFAULT.closeClassNameArr;
        this.animate = options.animate || DEFAULT.animate;
    }
    ajuanPopup.prototype = {
        //初始化
        init: function(){
            createEle(this);
            addEvent(this);
            return this;
        },
        //弹出弹窗
        pop: function (obj) {
            insertPop(this,obj);
        },
        //关闭弹窗
        close: function () {
            closePop(this)
        },
        //销毁弹窗
        destroy: function(){
            destroyPop(this);
        },
        //复制的方法
        copyToClipboard: function (target) {
            var ele = target && target.parentNode.getElementsByTagName('input')[0],
                txt = (ele && ele.value);
            if (window.clipboardData) {
                window.clipboardData.clearData();
                window.clipboardData.setData("Text", txt);
                alert("复制成功！");
            } else {
                try{
                    ele.select();
                    doc.execCommand('Copy');
                    alert("复制成功！");
                }catch(err){
                    alert("请双击礼包码右键复制！");
                }
            }
        }
    };
    //插入内容
    function insertPop(that,obj){
        var str = '<i class="_popup_close">x</i>';
        obj = obj || {};
        switch (obj.type){
            //带确定按钮的普通提示框
            case 'ts':
                str += '<h2 class="_popup_title">'+ obj.title +'</h2>' +
                '<div class="_popup_content">' +
                '<p class="_popup_prompt">'+ obj.prompt +'</p></div>' +
                '<div class="_popup_btn"><i class="_popup_btn_sure">确定</i></div>';
                that.popupEle.innerHTML = str;
                openPopup(that);
                that.popupEle.style.marginTop = '-' + (that.popupEle.clientHeight / 2) + 'px';
                break;
            //卡玛提示
            case 'km':
                str += '<h2 class="_popup_title">'+ obj.title +'</h2>' +
                '<div class="_popup_content"><p class="_popup_card_prompt">恭喜获得 '+ obj.data.name +' </p> ' +
                '<div class="_popup_card_con"><input class="_popup_card" readonly="readonly" value="'+ obj.data.code +'">' +
                '<i class="_popup_card_copy_btn">复制</i></div></div>' +
                '<div class="_popup_btn"><i class="_popup_btn_sure">确定</i></div>';
                that.popupEle.innerHTML = str;
                openPopup(that);
                that.popupEle.style.marginTop = '-' + (that.popupEle.clientHeight / 2) + 'px';
                break;
            //实物提示
            case 'sw':
                str += '<h2 class="_popup_title">'+ obj.title +'</h2>' +
                '<div class="_popup_content"><p class="_popup_gift_prompt">恭喜你获得</p>' +
                '<p class="_popup_gift_con">'+ obj.data.name +'</p></div><div class="_popup_btn">' +
                '<a class="_popup_btn_link" href="http://kf.2144.cn/" target="_blank">赶紧联系客服吧</a></div>';
                that.popupEle.innerHTML = str;
                openPopup(that);
                that.popupEle.style.marginTop = '-' + (that.popupEle.clientHeight / 2) + 'px';
                break;
            //带保密串实物提示
            case 'bmcsw':
                str += '<h2 class="_popup_title">'+ obj.title +'</h2>' +
                '<div class="_popup_content"><p class="_popup_gift_prompt">恭喜你获得</p>' +
                '<p class="_popup_gift_con">'+ obj.data.name +'</p><div class="_popup_gift_card-con">' +
                '<i class="_popup_gift_name">保密串</i><span class="_popup_gift_card"' +
                '>'+ obj.data.code +'</span></div></div><div class="_popup_btn">' +
                '<a class="_popup_btn_link" href="http://kf.2144.cn/" target="_blank">赶紧联系客服吧</a></div>';
                that.popupEle.innerHTML = str;
                openPopup(that);
                that.popupEle.style.marginTop = '-' + (that.popupEle.clientHeight / 2) + 'px';
                break;
            //带图片圣诞
            case 'tp':
                str += '<h2 class="_popup_title">'+ obj.title +'</h2><div class="_popup_content">' +
                '<p class="_popup_card_prompt">恭喜获得</p><ul class="_popup_list_pic">' +
                '<li class="_pic_item '+ obj.data.type +'"><i class="gift-icon"></i>' +
                '<em class="prop-name">'+ obj.data.msg +'</em><em class="gift-num"></em></li></ul></div>' +
                '<div class="_popup_btn"><i class="_popup_btn_sure">确定</i></div>';
                that.popupEle.innerHTML = str;
                openPopup(that);
                that.popupEle.style.marginTop = '-' + (that.popupEle.clientHeight / 2) + 'px';
                break;
            //查询记录
            case 'jl':
                var str1 = '',
                    data = obj.data,
                    len = data.length;
                recordObj.ary = data;
                recordObj.type = 'jl';
                recordObj.allpage = Math.ceil(len/recordObj.page);
                if(recordObj.allpage > 1){
                    str1 = '<i class="_popup_btn_pre">上一页</i>' +
                    '<b id="pagenumber" class="_popup_strong">1</b>' +
                    '<em class="_popup_num">/ 共'+ recordObj.allpage +'页</em>' +
                    '<i class="_popup_btn_next">下一页</i>';
                }
                str += '<h2 class="_popup_title">'+ obj.title +'</h2><div class="_popup_content"><p class="_popup_record_title">' +
                '<span class="_popup_record_name">礼包名</span><span class="_popup_record_card">领取方式</span></p><ul class="_popup_record_con"></ul>' +
                '</div><div class="_popup_btn">' + str1 + '</div>';
                recordObj.index = 1;
                that.popupEle.innerHTML = str;
                openPopup(that);
                recordObj.getDatas(recordObj.index);
                that.popupEle.style.marginTop = '-' + (that.popupEle.clientHeight / 2) + 'px';
                break;
            //查询记录
            case 'cyjl':
                var str1 = '',
                    data = obj.data,
                    len = data.length;
                recordObj.ary = data;
                recordObj.type = 'cyjl';
                recordObj.allpage = Math.ceil(len/recordObj.page);
                if(recordObj.allpage > 1){
                    str1 = '<i class="_popup_btn_pre">上一页</i>' +
                    '<b id="pagenumber" class="_popup_strong">1</b>' +
                    '<em class="_popup_num">/ 共'+ recordObj.allpage +'页</em>' +
                    '<i class="_popup_btn_next">下一页</i>';
                }
                str += '<h2 class="_popup_title">'+ obj.title +'</h2><div class="_popup_content"><p class="_popup_record_title_2">' +
                '<span class="_popup_record_item1">期数</span><span class="_popup_record_item2">投注数</span>' +
                '<span class="_popup_record_item3">是否中奖</span></p><ul class="_popup_record_con_2"></ul>' +
                '</div><div class="_popup_btn">' + str1 + '</div>';
                recordObj.index = 1;
                that.popupEle.innerHTML = str;
                openPopup(that);
                recordObj.getDatas(recordObj.index);
                that.popupEle.style.marginTop = '-' + (that.popupEle.clientHeight / 2) + 'px';
                break;
        }
    }
    //打开
    function openPopup(that){
        if(that.animate.isAnimate){
            _a(that.popupEle).removeClass(that.animate.closeAnimate).addClass(that.animate.openAnimate);
            _a(that.maskEle).removeClass('_fadeOut').addClass('_fadeIn');
        }
        _a(that.popupEle).show();
        _a(that.maskEle).show();
    }
    //操作元素,创建元素
    function createEle(that){
        var divEle = doc.createDocumentFragment();
        //创建遮罩
        that.maskEle = doc.createElement('div');
        that.maskEle.id = that.maskIdName;
        that.maskEle.style.display = 'none';
        //创建弹窗主体
        that.popupEle = doc.createElement('div');
        that.popupEle.id = that.popupIdName;
        that.popupEle.style.display = 'none';
        //判断是否需要加入动画
        if(that.animate.isAnimate){
            _a(that.maskEle).addClass('_fadeIn');
            _a(that.popupEle).addClass(that.animate.openAnimate);
        }
        //加入
        divEle.appendChild(that.maskEle);
        divEle.appendChild(that.popupEle);
        doc.body.appendChild(divEle);
    }
    //添加事件
    function addEvent(that){
        clickEvent = function (event){
            var target = _a.target(event);
            //关闭
            _a(that.closeClassNameArr).each(function (index,item) {
                if(target.className == item){
                    closePop(that);
                    return;
                }
            });
            if(target.id == '_popup_mask'){
                closePop(that);
                return;
            }
            //复制
            if(target.className == '_popup_card_copy_btn'||
                target.className == '_popup_record_copy_btn'||
                target.className == '_popup_gift_name'){
                that.copyToClipboard(target);
                return;
            }
            if(target.className == '_popup_btn_pre'){//查看记录上一页
                recordObj.index--;
                recordObj.getDatas(recordObj.index);
                return;
            }
            if(target.className == '_popup_btn_next'){//查看记录下一页
                recordObj.index++;
                recordObj.getDatas(recordObj.index);
                return;
            }
        };
        _a(doc.body).on('click', clickEvent );
    }
    //删除事件
    function removeEvent(that){
        _a(doc.body).unbind('click',clickEvent);
    }
    //删除节点
    function removeEle(that){
        _a(that.popupEle).hide();
        _a(that.maskEle).hide();
        that.popupEle.innerHTML = '';
        doc.body.removeChild(that.popupEle);
        doc.body.removeChild(that.maskEle);
    }
    //销毁弹窗
    function destroyPop(that){
        if(IE && IE < 9){
            removeEle(that);
        }else if(that.animate.isAnimate){//判断是否需要执行动画
            _a(that.popupEle).removeClass(that.animate.openAnimate).addClass(that.animate.closeAnimate);
            _a(that.maskEle).removeClass('fadeIn').addClass('fadeOut');
            setTimeout(function () {
                removeEle(that);
            },that.animate.animateTime);
        }else{
            removeEle(that);
        }
        removeEvent(that);
    }
    //关闭弹窗
    function closePop(that){
        //判断浏览器
        if(IE && IE < 9){
            _a(that.popupEle).hide();
            _a(that.maskEle).hide();
        }else if(that.animate.isAnimate){//判断是否需要执行动画
            _a(that.popupEle).removeClass(that.animate.openAnimate).addClass(that.animate.closeAnimate);
            _a(that.maskEle).removeClass('_fadeIn').addClass('_fadeOut');
            setTimeout(function () {
                _a(that.popupEle).hide();
                _a(that.maskEle).hide();
            },that.animate.animateTime);
        }else{
            _a(that.popupEle).hide();
            _a(that.maskEle).hide();
        }
    }
    if(typeof define === 'function' && define.amd){
        define('ajuanPopup',[],function(){return ajuanPopup});
    }else{
        window.ajuanPopup = function (options) {
            return new ajuanPopup(options).init();
        };
    }
}(this,document,_a));
;(function (win,doc,_a,undefined) {
    var actUserId = 0,
        actUserName = '',
        url = 'http://hd.2144.cn/',
        loginUrl = 'http://ptlogin.2144.cn/ptlogin',
        Popup = ajuanPopup();
    //用户控制器
    var userController = (function () {
        var userBox = _a('#user-box')[0],
            //用户登录
            userLoginFun = function () {
                IO.jsonp(loginUrl + '/getuser',{
                    t:Math.random()
                }, function (data) {
                    if(data.isGuest == 0){
                        actUserId = data.id;
                        actUserName = data.username;
                        userBox.innerHTML = '欢迎您 <i>'+ actUserName +'</i>，你活动充值共<i id="act-amount">0</i>元，你已抽奖<i id="act-num">0/0</i>次。<em id="logout-btn">注销</em>';
                        InitPageController();
                    }else{
                        userLogoutFun();
                    }
                });
            },
            //用户注销
            userLogoutFun = function () {
                IO.jsonp(loginUrl + "/ajaxlogout", function (data) {
                    callback(data);
                });
                actUserId = 0;
                actUserName = '';
                userBox.innerHTML = '您还未登录， 请 <em id="login-btn">登录</em> | <em id="register-btn">注册</em>';
                setTimeout(function () {
                    InitPageController();
                },500)
            },
            //用户初始化
            initFun = function () {
                if(typeof Login != 'undefined'){
                    Login.actLogin = function(){
                        userLoginFun();
                    };
                }
                if(typeof Logout != 'undefined'){
                    Logout.actLogout = function(){
                        userLogoutFun();
                    };
                }
                userLoginFun();
                _a(doc.body).on('click',clickEvent);
            },
            //点击事件
            clickEvent = function (event) {
                var target = _a.target(event);
                if(target.id == 'login-btn'){
                    _jsiframeShow(0);
                    return;
                }
                if(target.id == 'logout-btn'){
                    userLogoutFun();
                    return;
                }
                if(target.id == 'register-btn'){
                    _jsiframeShow(1);
                    return;
                }
            };
        initFun();
    }());



    //页面初始化数据
    var InitPageController = function () {
        var times = _a('.num-time'),
            money = _a('#act-amount'),
            actnum = _a("#act-num"),
            actTime = _a(".act-time");

        IO.jsonp(url + 'actQuery/actinfo',{
            act_id:435
        },function(data){
            var num = 0;
            if(data.status == 0) {
                var usermoney = data.money,
                    usedChance = data.used_chance,
                    chance = data.chance,
                    startTime = data.start_time,
                    endTime = data.end_time;
                num = (+data.chance) - (+data.used_chance);
                if(num < 0) num = 0;
                money.html(usermoney);
                actnum.html(usedChance + "/" + chance);
                actTime.html("时间:"+ startTime + "-" + endTime.slice(5));
            };
            times.html(num);
        });


    };





    //查看记录
    var seeRecordController = (function () {
        var type = false,
            clickEvent = function (event) {
                var target = _a.target(event);
                if(target.className == 'see-record'){
                    if(!actUserId){
                        _jsiframeShow(0);
                        return;
                    }
                    if(type) return;
                    getDataFun();
                    return;
                }
            },
            getDataFun = function () {
                type = true;
                //IO.jsonp(url + 'actQuery/cardLog',{
                IO.jsonp(url + 'actQuery/actLog',{
                    act_id:435
                }, function (data) {
                    if(data.status == 0){
                        var data = data.data;
                        if(!data.length){
                            Popup.pop({
                                type:'ts',
                                title:'温馨提示',
                                prompt:'您还没有奖品记录，赶快去领取吧~~~'
                            });
                            type = false;
                            return;
                        }
                        Popup.pop({
                            type:'jl',
                            title:'我的礼包',
                            data:data
                        });
                    }else {
                        Popup.pop({
                            type:'ts',
                            title:'温馨提示',
                            prompt:data.msg
                        });
                    };
                    type = false;
                });
            },
            initFun = function () {
                _a(doc.body).on('click',clickEvent);
            };
        initFun();
    }());
    //活动一控制器
    var OneActController = (function () {
        var type = false,
            index = 8,
            ROTATE = [0,90,45,0,315,270,225,180,135],
            divEle = _a('#marquee182')[0],
            ulEle = _a('#marquee182_1')[0],
            boxEle = _a('#box-bg')[0],
            marqueeStart = function(e,t){
                var o = document.getElementById("marquee" + e),
                    n = document.getElementById("marquee" + e + "_1"),
                    s = document.getElementById("marquee" + e + "_2"),
                    marquee = function(obj,t){
                        if("up" == t){
                            if (obj.s.offsetTop - obj.o.scrollTop <= 0){
                                obj.o.scrollTop -= obj.n.offsetHeight + 20;
                            }else{
                                var r = obj.o.scrollTop;
                                obj.o.scrollTop++;
                                obj.o.scrollTop == r && (obj.o.scrollTop = 1);
                            }
                        }else{
                            obj.s.offsetWidth - obj.o.scrollLeft <= 0 ? obj.o.scrollLeft -= obj.n.offsetWidth : obj.o.scrollLeft++;
                        }
                    };
                s.innerHTML = n.innerHTML;
                var r = window.setInterval(function(){
                    marquee({o:o,n:n,s:s},t);
                },30);
                o.onmouseover = function(){
                    window.clearInterval(r);
                };
                o.onmouseout = function() {
                    r = window.setInterval(function(){
                        marquee({o:o,n:n,s:s},t);
                    },30);
                };
            },
            getDataFun = function () {
                //IO.jsonp(url + 'actQuery/rewardLog',{
                IO.jsonp(url + 'actQuery/actLog',{
                    act_id:435,
                    user_log:0
                },function (data) {
                    if(data.status == 0){
                        var str = '';
                        _a.each(data.data, function (index,item) {
                            str += '<li><span class="user-name">'+ item.username +'</span>获得<span class="prop-name">'+ item.name +'</span></li>';
                        });
                        ulEle.innerHTML = str;
                        if( ulEle.offsetHeight > divEle.offsetHeight ) marqueeStart(182,"up");
                    }
                });
            },
            init = function () {
                getDataFun();
                _a(doc.body).on('click',clickEvent);
            },
            roleAnimate = function (num,data) {
                var rotate = ROTATE[num] + 1800;
                boxEle.style.transform = 'rotate('+ rotate +'deg)';
                boxEle.style.transition = 'all 3s';
                setTimeout(function () {
                    var temp = data.type,
                        noprize = data.status;
                    initRole(num);
                    if(noprize  == -2){
                        Popup.pop({
                            type:'ts',
                            title:'温馨提示',
                            prompt:"谢谢参与"
                        });
                    }
                    if(temp == -1){
                        Popup.pop({
                            type:'ts',
                            title:'温馨提示',
                            prompt:data.msg
                        });
                    }else if(temp == 0){//卡玛
                        Popup.pop({
                            type:'km',
                            title:'温馨提示',
                            data:data
                        });
                    }else if(temp == 1){//实物

                        Popup.pop({
                            type: 'sw',
                            title: '温馨提示',
                            data: data
                        });

                    }
                    type = false;
                },3100);
            },
            initRole = function (index) {
                boxEle.style.transform = 'rotate('+ ROTATE[index] +'deg)';
                boxEle.style.transition = 'all 0s';
            },
            //转动转盘的方法
            achieveGift = function () {
                IO.jsonp(url + 'turnTable',{
                    act_id:435
                }, function (data) {
                    if(data.status == 0){
                        if( 'transform' in document.documentElement.style &&
                            'transition' in document.documentElement.style  ){
                            roleAnimate(data.id,data);
                        }else{
                            var temp = data.type;
                            if(temp == -1){
                                Popup.pop({
                                    type:'ts',
                                    title:'温馨提示',
                                    prompt:data.msg
                                });
                            }else if(temp == 0){//卡玛
                                Popup.pop({
                                    type:'km',
                                    title:'温馨提示',
                                    data:data
                                });
                            }else if(temp == 1){//实物
                                Popup.pop({
                                    type:'sw',
                                    title:'温馨提示',
                                    data:data
                                });
                            }
                            type = false;
                        }
                    }else if(data.status == -2){

                        roleAnimate(8,data);

                    }else{
                        Popup.pop({
                            type:'ts',
                            title:'温馨提示',
                            prompt:data.msg
                        });
                        type = false;
                    }

                    InitPageController();
                });
            },
            clickEvent = function (event) {
                var target = _a.target(event);
                //用户点击转盘按钮事件
                if(target.className == 'achieve-btn'){
                    if(!actUserId){
                        _jsiframeShow(0);
                        return;
                    }
                    if(type) return;
                    type = true;
                    achieveGift();
                    return;
                }
            };
        init();
    }());
}(this,document,_a));