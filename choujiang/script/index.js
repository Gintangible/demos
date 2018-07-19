;(function(doc){


    var actUserId = 0,

        url = '//hd.2144.cn/',

        query = {
            
                add : function(){

                        var isEvent = 'addEventListener' in document;

                        return isEvent ? function(ele,type,handler){

                            ele.addEventListener(type, handler, false);

                        } : function(ele,type,handler){

                            ele.attachEvent('on' + type,handler);

                        };

                }(),

                remove : function(){

                        var isEvent = 'addEventListener' in document;

                        return isEvent ? function(ele,type,handler){

                            ele.removeEventListener(type, handler, false);

                        } : function(ele,type,handler){

                            ele.detachEvent('on' + type,handler);

                        };
                }(),
                
                getEvent : function(event){

                        return event || window.event;

                },
                
                getTarget : function(event){

                        var e  = query.getEvent(event);

                        return e.target || e.srcElement;

                },

                preventDefault : function(event){
                    
                        var e  = query.getEvent(event);
                    
                        if(e.preventDefault){

                                e.preventDefault();

                        }else{

                                e.returnValue = false;

                        }
                },

                stopPropagation: function(event){

                        var e  = query.getEvent(event);

                        if(e.stopPropagation){

                                e.stopPropagation();

                        }else{

                                e.cancelBubble = true;

                        }
                    
                },
                
                addClass : function(node,classname){

                        if(node.classList){

                            node.classList.add(classname);

                        }else{

                            if(node.className.indexOf(classname) == -1 ) node.className += ' ' + classname;

                        }
                },

                removeClass : function(node,classname){
                        
                        if(node.classList){

                            node.classList.remove(classname);

                        }else{

                            var reg = eval("/\\s*"+ classname +"/ig");

                            node.className = node.className.replace(reg,'');

                        }
                },

                getByClass : function(Classname,ele){

                        var ele = ele ? ele : document;

                        return ele.querySelectorAll ? ele.querySelectorAll('.'+Classname) : (function(ele){

                                var ele = ele.getElementsByTagName('*'),

                                    Result = [],

                                    re = new RegExp('\\b'+Classname+'\\b','i'),

                                    i = 0;
                                   
                                    for(;i < ele.length;i++){

                                            if(re.test(ele[i].className)){

                                                    Result.push(ele[i]);

                                            }
                                    }
                                   
                                    return Result;

                        }(ele));

                },
                toArray:function(arr){


                    var reduced = [];

                    try{

                        reduced = Array.prototype.slice.call(arr,0);

                    }catch(ex){

                        for (var i = 0,len = arr.length; i < len; i++){

                            reduced[i] = arr[i];

                        }
                    }

                    return reduced;
                },
                forEach : function(){
                        return  function(ary,callback){
                                if(typeof ary.forEach == "function"){

                                    ary.forEach(function(value,index,a){
                                        callback.call(ary,value,index,a);
                                    });

                                }else{// 对于古董浏览器，如IE6-IE8
                                    for(var k = 0, length = ary.length; k < length; k++) {
                                        callback.call(ary,ary[k],k,ary);
                                    }
                                }

                        };
                }()

        },
        packMove = function(){
                //packMove(box,{left:768,height:800,...,},{duration:500,ease:tween.linear},callback());
                var getStyle = function(el, style){
                        if(/msie/i.test(navigator.userAgent)){
                            style = style.replace(/\-(\w)/g, function(all, letter){
                                return letter.toUpperCase();
                            });
                            var value = el.currentStyle[style];
                            (value == "auto")&&(value = "0px" );
                            return value;
                        }else{
                            return document.defaultView.getComputedStyle(el,null).getPropertyValue(style);
                        }
                    };


                var setOpacity = function(el,i){

                        if(document.addEventListener){

                            el.style.opacity = i;

                            return;
                        }

                        el.style.filter = 'alpha(opacity='+ i * 100 +')';
                }

                var getOpacity = function(el){

                        var value;

                        if(document.addEventListener){
                            value = el.style.opacity;
                            return value;
                        }

                        var ary = el.style.filter.match(/alpha\(opacity:(.*)\)/);

                        value = ary ? ary[1] : 100;

                        return value / 100;
                      
                    };


                function move(elem,json,options,callback){

                      options = options || {};

                      options.duration = options.duration || 2000;

                      var start = {},distance = {};

                      for(var atrr in json){

                 

                        start[atrr] = atrr == "opacity" ? getOpacity(elem) : parseInt(getStyle(elem, atrr));

                        distance[atrr] = json[atrr] - start[atrr];

                        var speed = (json[atrr] - start[atrr])/options.duration;

                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                        var startTime = new Date().getTime();

                        (function(atrr){

                          setTimeout(function(){

                            var newTime = new Date().getTime();

                            var easetime = (newTime - startTime)/options.duration;

                            if (atrr == "opacity") {

                                setOpacity(elem, start[atrr]/100 + easetime * distance[atrr]/100 );

                            }else{
                               elem.style[atrr] = Math.ceil(start[atrr] + easetime * distance[atrr]) + "px";
                            }


                            if(options.duration <= (newTime - startTime)){

                              elem.style[atrr] = json[atrr] + "px";

                              if(callback){

                                callback();

                              }

                            }else{
                              setTimeout(arguments.callee,25);
                            }
                          },25)

                        })(atrr);

                      }

                }

                return move;
        }(),

        copyToClipboard = function (target) {

            var ele = target && target.parentNode.getElementsByTagName('input')[0],

                txt = ele && ele.value;

            if (window.clipboardData) {

                window.clipboardData.clearData();

                window.clipboardData.setData("Text", txt);

                alert("复制成功！");

            }else{

                try{

                    ele.select();

                    doc.execCommand('Copy');

                    alert("复制成功！");

                }catch(err){

                    alert("复制操作不被支持，请双击礼包码复制！");

                }
            }
        },

        Popup = function(){

                var maskEle = function(){

                        var divEle = doc.createElement('div');
                       
                        divEle.className = 'pop-mask';

                        return doc.body.appendChild(divEle);

                    }(),

                    show = function(obj){

                            var str = '';

                            if(obj.msg){

                                str = '<div class="pop-tips">'+  obj.msg +'</div>';
                            }

                            if(obj['code']){

                                str = '<div class="lb-wrap"><input class="pop-txt" value="'+ obj['code'] +'" readonly><span class="copy-btn">复制</span></div>';
                            }

                            if( obj._gameName){

                                str = '<div class="pop-desc">'+ obj._gameName +'</div><div class="pop-btns"><span class="enter-btn" v="695||'+ obj["index"] +'">立即领取</span><span class="vip-btn" v="696||'+ obj["index"] +'">VIP4额外领取</span></div>';
                            }

                            if(obj.giftName){

                                str = '<div class="pop-tips">恭喜您获得<b>'+ obj.giftName +'</b>！</div>';
                            }

                            


                            if(obj.jl){


                                    var str1 = '',

                                        data = obj.jl,

                                        len = data.length,

                                        allpage = Math.ceil(len/7);

                                    if(allpage > 1){

                                        str1 = '<div class="_popup_btn"><i class="_popup_btn_pre">上一页</i><b>1</b>/<em>'+ allpage +'</em><i class="_popup_btn_next">下一页</i></div><div class="pop_lxkf"><a href="http://kf.2144.cn/">联系客服</a></div>';
                                    }



                                   for(var j = 0; j<len; j++){


                                      if(data[j].type == 0){ //卡玛
                                           
                                            str += '<li>'+ data[j].name +'：<input class="pop-txt" value="'+ data[j].code +'" readonly><span class="copy-btn">复制</span></li>';

                                        }

                                        if(data[j].type == 1){//实物

                                            str += '<li>恭喜获得<em>'+ data[j].name +'</em></li>';
                                        }

                                        if( (j+1)%7==0  && (j+1)<len){
                                            str += '</ul><ul class="hidden">';
                                        }
                                    }
                              

                                    str = '<div class="lb-items"><ul>'+ str +'</ul></div>'+str1;
                            }


                            maskEle.innerHTML = '<div class="pop-wrap"><div class="pop-title"><i class="pop-close"></i>'+ obj.title +'</div>'+  str +'</div>';

                            maskEle.style.display = 'block';

                            query.addClass(maskEle,'_fadeIn');

                            var ele = query.getByClass('pop-wrap',maskEle)[0];

                            ele.style.marginTop = '-' + (ele.offsetHeight / 2) + 'px';

                    },

                    popHidden = function(){

                            query.removeClass(maskEle,'_fadeIn');

                            query.addClass(maskEle,'_fadeOut');

                            setTimeout(function(){

                                maskEle.style.display = 'none';

                                query.removeClass(maskEle,'_fadeOut');

                            },300);
                    },
                    tabShow = function(target,curindex){


                        curindex--;

                        query.forEach( query.toArray(target.getElementsByTagName('ul')),function(item,index){

                               item.style.display = curindex == index ? 'block' : 'none';

                        });


                        var ele = query.getByClass('pop-wrap',maskEle)[0];

                        ele.style.marginTop = '-' + (ele.offsetHeight / 2) + 'px';

                    },
                    prevFun = function(target){

                            var ele = target.parentNode,

                                b = ele.getElementsByTagName('b')[0],

                                index = b.innerHTML,

                                len =  ele.getElementsByTagName('em')[0].innerHTML;

                            index--;

                            if(index == 0) index = len;


                            b.innerHTML = index;

                            tabShow( target.parentNode.parentNode,index );

                    },

                    nextFun = function(target){

                            var ele = target.parentNode,

                                b = ele.getElementsByTagName('b')[0],

                                index = b.innerHTML,

                                len =  ele.getElementsByTagName('em')[0].innerHTML;

                            index++;

                            if(index > len) index = 1;


                            b.innerHTML = index;

                            tabShow( target.parentNode.parentNode,index );

                    }, 

                    clickEvent = function (event) {

                        var target = query.getTarget(event);


                        if(target.className == 'pop-close'){

                            popHidden();

                            return;
                        }

                        if(target.className == 'enter-btn' || target.className == 'vip-btn'){

                            OneActController.achieveGift( target );

                            return;
                        }

                      

                        if(target.className == 'copy-btn'){

                            copyToClipboard( target );

                            return;
                        }


                        if(target.className == '_popup_btn_pre'){

                            prevFun( target );
                            return;
                        }


                        if(target.className == '_popup_btn_next'){

                            nextFun( target );

                            return;
                        }


                    };

                query.add(maskEle,'click',clickEvent);

                return {

                    show : show

                };


        }(),

        actInfo = function () {//页面初始化数据

         
                IO.jsonp(url + 'actQuery/actInfo',{act_id:702},function (data) {

                        var b = query.getByClass('act-sub-step1');


                        doc.getElementById('user-box').getElementsByTagName('span')[0].innerHTML = data.money;


                        query.getByClass('act-sub-item')[0].getElementsByTagName('b')[0].innerHTML = data.score;

                        b[1].getElementsByTagName('b')[0].innerHTML = data.score;

                        b[2].getElementsByTagName('b')[0].innerHTML = data.score;

                        query.getByClass('fixed-my')[0].innerHTML = '现有积分：' + data.score;

                        TwoActController.achieveGift( data.moonCake );

                   
                });
                
        },

        resetData = function(){

                query.getByClass('act-sub-item')[0].getElementsByTagName('b')[0].innerHTML = 0;

                TwoActController.resetGift();

                query.getByClass('fixed-my')[0].innerHTML = '';
        },

        userController = function () {//用户控制器

                var loginUrl = '//ptlogin.2144.cn/ptlogin',

                    userBox = doc.getElementById('user-box'),

                    userLoginFun = function () {//用户登录

                        IO.jsonp(loginUrl + '/getuser',{
                            t:Math.random()
                        }, function (data) {

                            if(data.isGuest == 0){

                                actUserId = data.id;

                                userBox.innerHTML = '亲爱的<a href="http://my.2144.cn/">'+ data.username +'</a>，欢迎来到2144，您已充值<span>0</span>元。<i class="act-logout">注销</i>';

                                actInfo();

                                return;
                            }

                            userLogoutFun();
                            
                        });
                    },
                    
                    userLogoutFun = function () {//用户注销

                        if( actUserId ){

                            IO.jsonp(loginUrl + "/ajaxlogout", function (data){

                                callback(data);

                            });

                        }
                        
                        actUserId = 0;

                        userBox.innerHTML = '您还没有登录哦~<i class="act-login-btn">登录</i>';

                        resetData();

                    },

                    clickEvent = function (event) {//点击事件

                        var target = query.getTarget(event);

                        if(target.className == 'act-login-btn'){

                            _jsiframeShow(0);

                            return;
                        }

                        if(target.className == 'act-reg-btn'){
                            _jsiframeShow(1);
                            return;
                        }

                        if(target.className == 'act-logout'){
                            userLogoutFun();
                            return;
                        }

                    };


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

                query.add(doc.body,'click',clickEvent);

        }(),

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

        OneActController = function () {//活动一控制器

            var wrap = query.getByClass("act-hotGame")[0],

                slideWrap = wrap.getElementsByTagName('ul')[0],

                liEle = slideWrap.getElementsByTagName('li'),

                len = 3,

                index = 0,

                w = liEle[0].offsetWidth + 26,

                exeFun = function(){

                        var obj = arguments.callee;

                        if(obj.state) return;

                        obj.state = true;

                        packMove(slideWrap,{'left':-index*w},{duration:300},function(){

                            obj.state = false;

                        });

                },

                popShow = function( target ){

                    var wrap = query.getByClass('extend-img',target.parentNode.parentNode),

                        i = 0,

                        len = wrap.length;

                    for(;i < len; i++){

                        if(wrap[i] == target){

                            Popup.show({

                                title : '2144双节礼包',

                                _gameName : target.alt,

                                index : i

                            });

                            break;
                        }

                    }

                    

                },

                achieveGift = function (target) {

                    var ary = target.getAttribute('v').split('||');

                    if( target.state ) return;

                    target.state = true;

                    IO.jsonp(url + 'actCommon/getCardRepeat',{

                        act_id: ary[0],
                        id : ary[1]

                    }, function (data) {


                        target.state = false;

                        if(data.status == 0){

                            Popup.show({

                                title : '激活码领取',

                                code : data.code
                            });

                            return;
                        }

                        Popup.show({

                            title : '温馨提示',

                            msg : data.msg

                        });
                        

                    });
                },

                clickEvent = function (event) {

                    var target = query.getTarget(event);

                    if(target.className == 'next-btn'){

                        if(index > len) return;

                        index++;

                        

                        exeFun();

                        return;
                    }


                    if(target.className == 'perv-btn'){

                        if(index == 0) return;

                        index--;

                        exeFun();

                        return;
                       
                    }


                    if(target.nodeName.toLowerCase() == 'img' && target.className.indexOf('extend-img') > -1){

                        if(!actUserId){

                            _jsiframeShow(0);
                            
                            return;
                        }


                        popShow( target );

                        return;
                       
                    }


                    

                },

                imgShow = function(target){

                    query.forEach(query.toArray(target.parentNode.children),function(item){

                        item.className = item == target ? 'cur' : '';

                    });

                },

                mouseEvent = function(event){

                    var target = query.getTarget(event);

                    if(target.nodeName.toLowerCase() == 'li'){

                        imgShow( target );

                        return;
                    }

                    if(target.className == 'normal'){

                        imgShow( target.parentNode );

                        return;
                    }

                    if(target.className == 'logo-wrap'){

                        imgShow( target.parentNode );

                        return;
                    }


                    if(target.nodeName.toLowerCase() == 'img' && target.parentNode.className == 'logo-wrap'){

                        // if(!actUserId){

                        //     _jsiframeShow(0);
                            
                        //     return;
                        // }

                        imgShow( target.parentNode.parentNode );

                        return;
                    }



                };

            query.add(doc.body,'click',clickEvent);

            query.add(wrap,'mouseover',mouseEvent);


            return{

                achieveGift : achieveGift

            };



        }(),
        TwoActController = function () {//活动二控制器

            var wrap = query.getByClass('moonCake-item')[0],

                ele = wrap.children,

                winningItems = function () {

                    var str = '',

                        ele = doc.getElementById('marquee182_1');


                  
                    IO.jsonp(url + 'actQuery/actlog',{

                        act_id: 697,

                        user_log : 0

                    }, function (data) {


                        if(data.status != 0) return;

                        query.forEach(data.data,function(item){


                                str += '<li>'+ item.username +'领取了'+ item.name +'</li>';

                        });

                        ele.innerHTML = str;


                        if( ele.offsetHeight > ele.parentNode.offsetHeight ) marqueeStart(182,"up");


                    });
                }(),
                achieveGift = function (data) {

                    query.forEach(data,function(item,index){

                            if(item){

                                query.addClass(ele[index],'cur');

                            }

                    });
                   
                },
                getAllGift = function (target) {

                    var i = 0,

                        ele = target.parentNode.children,

                        len = ele.length,

                        place_id = 0;

                    if( target.state ) return;

                    for(;i < len; i++){

                        if(ele[i] == target){

                            place_id = i;

                            break;
                        }

                    }

                    target.state = true;

                    IO.jsonp(url + 'actCommon/standardLottery',{

                        act_id: 697,

                        place_id : place_id

                    }, function (data) {


                        target.state = false;

                        if(data.status == 0){

                            Popup.show({

                                title : '中奖提示',

                                giftName : data['name']

                            });

                            

                            query.addClass(target,'cur');

                            return;
                        }

                        Popup.show({

                            title : '温馨提示',

                            msg : data.msg

                        });

                        actInfo();
                        

                    });
                },

                resetGift = function(){

                    query.forEach(query.toArray(ele),function(item){

                        query.removeClass(item,'cur');

                    });

                },
                clickEvent = function (event) {

                    var target = query.getTarget(event);

                    if(target.className == 'moonCake-btn'){

                        if(target.parentNode.className.indexOf('cur') > -1) return;

                        if(!actUserId){

                            _jsiframeShow(0);
                            
                            return;
                        }

                        getAllGift( target.parentNode );

                        return;
                    }




                };

            query.add(wrap,'click',clickEvent);

            return{

                achieveGift : achieveGift,

                resetGift : resetGift

            };

        }(),

        ThreeActController = function () {//活动三控制器

                var wrap = query.getByClass('draw-main')[0],

                    act_id = 0,

                    winningItems = function () {

                        var str = '',

                            ele = doc.getElementById('marquee183_1');


                      
                        IO.jsonp(url + 'actQuery/actlog',{

                            act_id: 702,

                            user_log : 0

                        }, function (data) {


                            if(data.status != 0) return;

                            query.forEach(data.data,function(item){


                                    str += '<li>'+ item.username +'领取了'+ item.name +'</li>';

                            });

                            ele.innerHTML = str;


                            if( ele.offsetHeight > ele.parentNode.offsetHeight ) marqueeStart(183,"up");


                        });
                    }(),

                    tabShow = function( target ){


                        query.forEach( query.toArray(target.parentNode.getElementsByTagName('i')),function(item){

                                if(item == target){

                                    query.addClass(item,'cur');

                                }else{
                                    query.removeClass(item,'cur');
                                }

                        });



                    },
                    drawRun = function (data,target) {

                        query.forEach( query.toArray( query.getByClass('draw-item',wrap) ),function(item,index){

                            var num = data.data[index],

                                ulEle = query.getByClass('item-con',item)[0],

                                liEle = query.getByClass('draw-con-item',item),

                                size = liEle.length,

                                tops = liEle[num + (size - 7)].offsetTop;

                            setTimeout(function () {

                                ulEle.style.top = 0;

                                packMove(ulEle,{'top':-tops},{duration:300},function(){


                                    if(index == data.data.length - 1 ){

                                            if(data.status == 0){

                                                 Popup.show({

                                                    title : '中奖提示',

                                                    giftName : data.msg

                                                });

                                             }


                                             if(data.status == -2){

                                                 Popup.show({

                                                    title:'温馨提示',

                                                    msg:data.msg

                                                });

                                             }


                                            actInfo();


                                            target.state = false;
                                    }

                                   

                                });

                            },index * 100);

                        });
                    },
                    //摇摇机
                    drawFun = function(target){

                            if(target.state) return;

                            target.state = true;

                            IO.jsonp(url + 'actCommon/slotLottery',{

                                act_id:act_id

                            },function (data) {

                                    if(data.status == 0 || data.status == -2){

                                        drawRun(data,target);

                                    }else{

                                        Popup.show({

                                            title:'温馨提示',

                                            msg:data.msg

                                        });

                                        target.state = false;
                                    }

                            });
                    },
                    clickEvent = function (event) {

                        var target = query.getTarget(event);

                        if(target.nodeName.toLowerCase() == 'i' && target.className.indexOf('integral') > -1){

                            act_id = target.getAttribute('v');

                            tabShow( target );

                            return;
                        }

                        if(target.className == 'draw-lottery'){

                            if(!actUserId){
                                _jsiframeShow(0);
                                return;
                            }
                            if(!act_id){
                                Popup.show({
                                    title:'温馨提示',
                                    msg:'好汉！请先押注！'
                                });
                                return;
                            }

                            drawFun( target );

                            return;
                        }




                    };

                query.add(wrap,'click',clickEvent);

        }(),
        FourActController = function () {//活动四控制器

                var wrap = query.getByClass('act-integral')[0],

                    achieveGift = function (target) {


                        var i = 0,

                            liEle = target.parentNode,

                            ele = liEle.parentNode.children,

                            len = ele.length,

                            id = 0;

                        if( target.state ) return;

                        for(;i < len; i++){

                            if(ele[i] == liEle){

                                id = i;

                                break;
                            }

                        }

                        target.state = true;

                        IO.jsonp(url + 'actCommon/getCardRepeat',{

                            act_id: 701,
                            id : id

                        }, function (data) {


                            target.state = false;

                            if(data.status == 0){

                                 Popup.show({

                                    title : '中奖提示',

                                    giftName : data['name']

                                });

                                getNums();

                                actInfo();

                                return;
                            }

                            Popup.show({

                                title : '温馨提示',

                                msg : data.msg

                            });
                            

                        });
                    },

                    showNums = function(data){

                        var ele = wrap.getElementsByTagName('em');

                        query.forEach(data,function(item,index){


                            ele[index].innerHTML = item;



                        });

                    },

                    getNums = function(){

                        IO.jsonp(url + 'actQuery/actInfo',{

                            act_id: 701

                        }, function (data) {

                            if(data.status != 0) return;

                             showNums( data.rewardNum );

                        });                             

                    },

                    clickEvent = function (event) {

                        var target = query.getTarget(event);

                        if(target.className == 'exchange-btn'){

                            if(!actUserId){

                                _jsiframeShow(0);
                                
                                return;
                            }

                            achieveGift( target );

                            return;
                        }




                    };


                getNums();

                query.add(wrap,'click',clickEvent);
                 
        }(),
        fixedFun = function(){

            var wrap = function(){

                     var ele = doc.createElement('div');

                    ele.className = 'fixedNav';

                    ele.innerHTML = '<span class="fixed-my"></span><a href="#act-step1" v="act-step1" target="_self" class="fix-nav1" >精品游戏迎国庆</a><a href="#act-step2" v="act-step2" target="_self" class="fix-nav2">月饼盛宴出惊喜</a><a href="#act-step3"  v="act-step3" target="_self" class="fix-nav3">国庆拉霸转豪礼</a><a href="#act-step4" v="act-step4"  target="_self" class="fix-nav4">玩转积分兑好礼</a><span class="fixed-top">返回顶部</span>';

                    return doc.body.appendChild(ele);
                    
                }(),

                getDataFun = function (target) {

                    if(target.state) return;

                    target.state = true;

                    IO.jsonp(url + 'actQuery/actLog',{

                        act_id:'695,696,697,701,702'

                    }, function (data) {

                        target.state = false;
                       
                        if(data.status == 0){
                            

                            if(!data.data.length){

                                Popup.show({

                                    title:'温馨提示',

                                    msg:'您还没有奖品记录，赶快去领取吧~~~'

                                });

                                return;
                            }

                            Popup.show({

                                title:'我的礼包',

                                jl:data.data

                            });

                            return;
                        }

                        Popup.show({

                            title:'温馨提示',

                            msg:data.msg

                        });
                        
                           
                        
                    });
                },

                top = query.getByClass('act-step1')[0].offsetTop,

                scrollFun = function(){
                        var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;

                        if( scrollTop > top ){

                            if(wrap.className.indexOf('cur') == -1){

                                query.addClass(wrap,'cur');

                            }

                        }else{

                            if(wrap.className.indexOf('cur') > -1){

                                query.removeClass(wrap,'cur');

                            }
                        }
                },

                goTo = function(scrollTop,state){

                    var speed = 33,

                        returnTop = scrollTop - speed,

                        returnTopOnce = function(){

                            if(returnTop > speed){

                                window.scrollTo(0,returnTop);

                                returnTop -= speed;

                                return;
                            }

                            clearInterval(t);
                            
                            if(state){
                                    window.scrollTo(0,0);
                            }else{
                                    window.scrollTo(0,scrollTop);
                            }
                            
                          
                        },

                        t = setInterval(returnTopOnce,1);
                        
                },

                clickEvent = function (event) {

                    var target = query.getTarget(event);

                    if(target.className == 'fixed-top'){

                        goTo( doc.documentElement.scrollTop || doc.body.scrollTop, true );

                        return;
                    }


                    if(target.className == 'fixed-my'){

                        if(!actUserId){

                            _jsiframeShow(0);

                            return;
                        }

                        getDataFun( target );

                        return;
                    }




                    if(target.nodeName.toLowerCase() == 'a'){

                        query.preventDefault( event );

                        goTo( doc.getElementById( target.getAttribute('v') ).offsetTop );

                        return;
                    }

                };

            scrollFun();

            query.add(wrap,'click',clickEvent);
           
            query.add(window,'scroll',scrollFun);


        }(),
        lazyLoad = function() {//图片延迟加载,前面有一个壁纸滚动用到innerHTML复制img标签，所以加载代码移到后面来了

            var map_element    = {},

                element_obj    = [],

                download_count = 0,

                last_offset    = -1,

                doc = document,

                doc_body = doc.body,

                doc_element = null,

                lazy_load_tag = "img",

                imagesrcname = 'a',

                thissrolltop = 400;
                // imageurlarray = new Array();
                // imageurlarray[0] = 'http://img.2144.cn/';
                // imageurlarray[1] = 'http://i1.2144.cn/';
                // imageurlarray[2] = 'http://i2.2144.cn/';
                // imageurlarray[3] = 'http://i3.2144.cn/';
                // imageurlarray[4] = 'http://i4.2144.cn/';
            function initVar() { 

                doc_element   = doc.compatMode == 'BackCompat' ? doc_body : doc.documentElement;

                //lazy_load_tag = tags || ["img", "iframe"]; 
            }

            function initElementMap(){

                //for (var i = 0, len = lazy_load_tag.length; i < len; i++) { 

                    var el = doc.getElementsByTagName(lazy_load_tag); 

                    for (var j = 0, len2 = el.length; j < len2; j++) { 

                        if (typeof el[j] == "object" && el[j].getAttribute(imagesrcname)){

                            element_obj.push(el[j]); 

                        } 
                    } 
                //} 

                for (var i = 0, len = element_obj.length; i < len; i++) {

                    var o_img = element_obj[i],

                        t_index = getAbsoluteTop(o_img);


                    
                    if (map_element[t_index]){

                        map_element[t_index].push(i);

                    }else{

                        var t_array = []; 

                        t_array[0] = i;

                        map_element[t_index] = t_array; 

                        download_count++;

                    } 
                } 
            }


            function initDownloadListen(){

                if (!download_count) return;

                var getscrolltop = doc_body.scrollTop;

                if(getscrolltop == 0){

                    getscrolltop = doc.documentElement.scrollTop;

                }

                var visio_offset = getscrolltop + doc_element.clientHeight; 

                if (last_offset == visio_offset){

                    setTimeout(initDownloadListen,200);

                    return; 
                }

                last_offset = visio_offset;

                var visio_height = doc_element.clientHeight + thissrolltop,

                    img_show_height = visio_height + getscrolltop; 
                // var allurlnum = parseInt(imageurlarray.length);
                // if(allurlnum <= 0)
                // {
                //  allurlnum = 1;
                // }
                var j = 0;

                for (var key in map_element) {

                        if (img_show_height > key){

                            var t_o = map_element[key],

                                img_vl = t_o.length; 

                            for (var l = 0; l < img_vl; l++) { 
                                // var u_j = j % allurlnum;
                                // var thisurl = imageurlarray[u_j];
                                //if(element_obj[t_o[l]].getAttribute(imagesrcname).indexOf('http://') != -1) thisurl='';
                                element_obj[t_o[l]].src = element_obj[t_o[l]].getAttribute(imagesrcname);

                                element_obj[t_o[l]].removeAttribute(imagesrcname);

                                j++; 
                            }

                            delete map_element[key];

                            download_count--;

                        }
                }
                
                setTimeout(initDownloadListen, 200); 
            }


            function getAbsoluteTop(element) {

                if (arguments.length != 1 || element == null){ 

                    return null; 

                }


                var offsetTop = element.offsetTop,

                    current = element.offsetParent;

                while(current !== null){

                    offsetTop += current.offsetTop;

                    current = current.offsetParent;

                }
                return offsetTop; 
            }

            function init(){

                initVar();

                initElementMap(); 

                initDownloadListen(); 
            }

            init();

        }();


}(document));