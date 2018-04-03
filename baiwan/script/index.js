!(function (doc, $) {
    // 禁止用户选中
    !function () {
        /**
         * 判断浏览器是否支持user-select样式
         */
        var supportUserSelect = function () {
            var style = document.body.style,
                props = ['userSelect', 'msUserSelect'],
                i, l, ret = false;
            for (i = 0, l = props.length; i < l; i++) {
                if (style[props[i]] !== undefined) {
                    ret = true;
                    break;
                }
            }
            return ret;
        };
        // 如果用户不支持user-select那么就做兼容处理
        if (supportUserSelect()) {
            document.body.onselectstart = function () {
                return false;
            };
        }
    } ();


    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback/*, thisArg*/) {
            var T, k;
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            // 1. Let O be the result of calling toObject() passing the
            // |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get() internal
            // method of O with the argument "length".
            // 3. Let len be toUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If isCallable(callback) is false, throw a TypeError exception. 
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let
            // T be undefined.
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // 6. Let k be 0.
            k = 0;

            // 7. Repeat while k < len.
            while (k < len) {
                var kValue;
                // a. Let Pk be ToString(k).
                //    This is implicit for LHS operands of the in operator.
                // b. Let kPresent be the result of calling the HasProperty
                //    internal method of O with argument Pk.
                //    This step can be combined with c.
                // c. If kPresent is true, then
                if (k in O) {
                    // i. Let kValue be the result of calling the Get internal
                    // method of O with argument Pk.
                    kValue = O[k];
                    // ii. Call the Call internal method of callback with T as
                    // the this value and argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined.
        };
    }

    var URL = '//web.2144.cn/',
        actUserId = 0,
        info = {},
        userName = null,
        actID = 0;

    var query = function () {
        var copyToClipboard = function (ele) {
            var txt = ele && ele.val();

            if (!txt) return;

            if (window.clipboardData) {
                window.clipboardData.clearData();
                window.clipboardData.setData("Text", txt);
                alert("复制成功！");

            } else {
                try {
                    ele.select();
                    doc.execCommand('Copy');
                    alert("复制成功！");
                } catch (err) {
                    alert("复制操作不被支持，请双击礼包码复制！");
                }
            }
        },
            format = function (s) {
                return (0..toFixed(2) + s).slice(-2);
            };

        return {
            copyToClipboard: copyToClipboard,
            format: format
        }

    } ();

    var msgShow = function () {
        function show(con, wrap) {
            var html = $('<div class="msg-pop">' + con + '</div>');

            html.appendTo(wrap);

            autoHide(wrap);
        }

        function autoHide(wrap) {
            setTimeout(function () {
                wrap.find('.msg-pop').remove();
            }, 1000);
        }

        return {
            show: show
        }

    } ();


    var layer = function () {

        var layerFactory = function (props) {
            var Class = {};
            Class.width = 600;
            Class.height = 200;

            Class.init = function () {
                this.create();
            }

            Class.create = function () {
                var self = this,
                    element = this.getLayerBox();

                element.find(".pop-wrap").css({
                    marginTop: -self.height / 2,
                    marginLeft: -self.width / 2,
                    width: self.width,
                    height: self.height
                })

                this.close(element);

                $("body").append(element);
            }


            Class.getLayerBox = function () {
                var element = $('<div class="pop-mask"><div class="pop-wrap"></div></div>')

                return element;
            }

            Class.hide = function () {
                $(".pop-mask").remove();
            }

            Class.close = function (element) {
                var self = this;

                element.find(".pop-wrap").append('<span class="pop-close"></span>');
                element.find(".pop-close").on("click", function () {
                    self.hide();
                })
            }

            Class.show = function () { throw new Error('must override show method.') };


            for (var k in props) {
                Class[k] = props[k];
            }

            // Object.keys(props).forEach(function (k) {
            //     Class[k] = props[k];
            // });

            return Class;
        };

        var actLayer = layerFactory({//活动须知
            width: 674,
            height: 502,
            show: function () {

                this.init();

                $(".pop-wrap").append('<h3>活动须知</h3>' +
                    '<div class="pop-rule_box">' +
                    '    <ul class="pop-rule_list">' +
                    '        <li>1、每场活动共12题，每题2-4个答案选项，从中选出你认为正确的唯一选项；</li>' +
                    '        <li>2、每题答题时间只有10秒，超时或者回答错误的用户将被淘汰；</li>' +
                    '        <li>3、如果用户持有复活卡，在用户该场次第一次回答错误后，复活卡会自动使用，用户将可以继续 参与答题。没答或者超时直接被淘汰，无法使用复活卡。（每场活动仅限使用3张复活卡）' +
                    '        </li>' +
                    '        <li>4、答对12题的用户（含使用复活卡用户）瓜分该场次的现金，如果超过1个用户答对所有题目， 奖励将由所有获胜者平分。' +
                    '        </li>' +
                    '        <li>5、结果公布：每场活动获奖名单将在活动结束后的当期活动结束页面及时公布。</li>' +
                    '    </ul>' +
                    '    <div class="pop-cash_rule">' +
                    '        <p>提现须知：</p>' +
                    '        <ul>' +
                    '            <li>' +
                    '1、用户登录后，在活动页面，即可查看个人在活动期间所有答题奖励和可提现金额，点击“提现”按钮即可进行提现操作。' +
                    '            </li>' +
                    '            <li>' +
                    '                2、奖金达到 30元(含30元)时候，可全部提现到支付宝。为保障账号安全，提现到支付宝需要绑定本人手机号。第一次提现成功后，支付宝账号不可更改。 ' +
                    '            </li>' +
                    '        </ul>' +
                    '    </div>' +
                    '</div>');

                $(".pop-wrap").find('.pop-rule_box').customScrollbar({
                    hScroll: false,
                    updateOnWindowResize: true
                })

            }
        }),
            shareLayer = layerFactory({//邀请好友
                width: 682,
                height: 292,
                show: function (uid) {
                    this.init();

                    $(".pop-wrap").append('<h3>邀请好友</h3>' +
                        '<div class="pop-inv_box">' +
                        '    <div class="pop-inv_bg"></div>' +
                        '    <div class="pop-inv_input">' +
                        '        <i>生成邀请链接：</i><input readonly type="text" value="http://static.2144.cn/act/onlineanswer2/invite.html?inviter=' + uid + '&pos=97506"><span>复制</span>' +
                        '    </div>' +
                        '    <p>友情建议：复制邀请链接并QQ分享给好友</p>' +
                        '</div>');

                    this.event();
                },
                event: function () {
                    $(".pop-inv_input span").on("click", function () {
                        query.copyToClipboard($(".pop-inv_input input"));
                    })
                }
            }),
            phoneLayer = layerFactory({//绑定手机号
                width: 442,
                height: 262,
                show: function () {
                    this.init();

                    $(".pop-wrap").append('<h3>绑定手机号</h3>' +
                        '<div class="pop-phone_box">' +
                        '     <div class="pop-input_box">' +
                        '         <i>输入手机号：</i><input class="pop-phone_phone" type="text"><span class="pop-phone_cap">发送验证码</span>' +
                        '     </div>' +
                        '     <div class="pop-input_box">' +
                        '         <i>验证码：</i><input class="pop-phone_code" type="text">' +
                        '     </div>' +
                        '     <span class="pop-phone_btn">确认提交</span>' +
                        '</div>');

                    this.event();
                },
                sendCap: function (phone, callback) {
                    $.ajax({
                        type: "GET",
                        url: '//my.2144.cn/Api/SendMsg/mobile/' + phone + '/type/1',
                        dataType: "jsonp",
                        success: function (data) {
                            callback && callback(data);
                        }
                    });
                },
                bindMobile: function (mobile, code, callback) {
                    $.ajax({
                        type: "GET",
                        url: '//my.2144.cn/Api/UpdateSafe',
                        data: {
                            mobile: mobile,
                            code: code,
                            type: 1
                        },
                        dataType: "jsonp",
                        success: function (data) {
                            callback && callback(data);
                        }
                    });
                },
                capPhone: function (phone, callback) {
                    $.ajax({
                        type: "GET",
                        url: URL + 'onlineAnswer/checkphone',
                        data: {
                            phone: phone
                        },
                        dataType: "jsonp",
                        success: function (data) {
                            callback && callback(data);
                        }
                    });

                },

                event: function () {
                    var self = this,
                        wrap = $('.pop-phone_box')

                    $('.pop-phone_cap').on('click', function () {
                        var phone = $('.pop-phone_phone').val();

                        if (!phone) {
                            msgShow.show('请输入手机号', wrap);
                            return;
                        }

                        self.capPhone(phone, function (data) {
                            if (data.status) {
                                msgShow.show('手机号已绑定过', wrap);
                                return;
                            }
                            self.sendCap(phone, function (data) {
                                msgShow.show(data.msg, wrap);
                            });
                        })


                    })


                    $(".pop-phone_btn").on("click", function () {
                        var phone = $('.pop-phone_phone').val(),
                            code = $('.pop-phone_code').val();

                        if (!phone) {
                            msgShow.show('请输入手机号', wrap);
                            return;
                        }
                        if (!code) {
                            msgShow.show("请输入验证码", wrap);
                            return;
                        }
                        self.bindMobile(phone, code, function (data) {
                            msgShow.show(data.msg, wrap);
                            if (data.status != 'error') {
                                taskList.getTaskList();
                                taskList.phoneTask();
                                self.hide();
                            }
                        });
                    })
                }
            }),
            // status,

            rewardLayer = layerFactory({//提现
                width: 442,
                height: 302,
                getPhoneState: function (callback) {
                    $.ajax({
                        type: "GET",
                        url: URL + 'onlineAnswer/moneyaccount',
                        dataType: "jsonp",
                        success: function (data) {
                            callback && callback(data);
                            // status = data;
                        }
                    });
                },
                show: function () {
                    this.init();
                    var self = this;

                    this.getPhoneState(function (data) {
                        var readOnly = data.status == 0 ? " readonly" : "";

                        $(".pop-wrap").append('<h3>提现</h3>' +
                            '<div class="pop-cash_box">' +
                            '    <div class="pop-input_box">' +
                            '        <i>支付宝账号：</i><input class="pop-cash_account" value="' + (data.status == 0 ? data.account : "") + '" type="text" ' + readOnly + '>' +
                            '    </div>' +
                            '    <div class="pop-input_box">' +
                            '        <i>手机号：</i><input class="pop-cash_phone" value="' + (data.status == 0 ? data.phone : "") + '" type="text" ' + readOnly + '>' +
                            '    </div>' +
                            '    <span class="pop-cash_btn">确认提交</span>' +
                            '    <p class="pop-cash_intro">' +
                            '        处理需要1~2个工作日，请耐心等待 <br>' +
                            '        如有疑问，可联系客服QQ：800062144' +
                            '    </p>' +
                            '</div>');

                        self.event();
                    });



                },
                postAccount: function (account, phone, callback) {
                    $.ajax({
                        type: "GET",
                        url: URL + 'onlineAnswer/getMoney',
                        data: {
                            account: account,
                            phone: phone,
                        },
                        dataType: "jsonp",
                        success: function (data) {
                            callback && callback(data);
                        }
                    });
                },
                event: function () {
                    var wrap = $(".pop-cash_box"),
                        self = this;
                    $('.pop-cash_btn').on('click', function () {
                        var account = $('.pop-cash_account').val(),
                            phone = $('.pop-cash_phone').val();

                        if (!account) {
                            msgShow.show('请输入支付宝账号', wrap);
                            return;
                        }
                        if (!phone) {
                            msgShow.show("请输入手机号", wrap);
                            return;
                        }
                        self.postAccount(account, phone, function () {
                            msgShow.show('提现申请提交成功', wrap);
                            setTimeout(function () {
                                self.hide();
                            }, 2000)
                        });
                    })
                }
            }),

            noRewardLayer = layerFactory({
                width: 442,
                height: 200,
                show: function () {
                    this.init();
                    $(".pop-wrap").append('<h3>提现</h3>' +
                        '<div class="pop-cash_box">' +
                        '    <div class="pop-input_box" style="text-align: center">' +
                        '       提现金额不足30元，不可提现' +
                        '    </div>' +
                        '    <p class="pop-cash_intro">' +
                        '        如有疑问，可联系客服QQ：800062144' +
                        '    </p>' +
                        '</div>');
                }
            }),

            lawLayer = layerFactory({//法律
                width: 674,
                height: 502,
                show: function () {
                    this.init();

                    $(".pop-wrap").append('<h3>法律声明</h3>' +
                        '<div class="pop-law_box">' +
                        '    <ul>' +
                        '        <li>1、用户参与【百万冲冲冲】活动前请详细阅读活动规则及相关条款。凡参与本次活动，则视为该用户已阅读、理解并同意活动规则及全部法律声明条款。</li>' +
                        '        <li>2、本活动奖金获取和发放条件，由活动举办方根据活动需要在法律许可范围内设定。</li>' +
                        '        <li>3、禁止用户以任何不正当手段及/或舞弊行为参与本活动，一经发现，活动举办方有权取消该活动参与及获奖资格，有权收回用户已取得的答题奖金、追讨已提现的奖金金额，并保留追究该用户法律责任的权利。不正当手段及/或舞弊行为包括但不限以下：通过非官网客户端入口参与；篡改数据，伪造用户参与；骚乱平台秩序、使用插件、外挂或通过第三方工具、第三方获取答案答题、刷取复活卡对活动进行干扰、破坏或其他影响及活动举办方认为的其他不正当手段及/或舞弊行为。</li>' +
                        '       <li>4、如遇不可抗力因素、相关政策、活动调整等原因导致本活动调整、暂停举办方或无法进行的，举办方有权随时决定修改、暂停、取消或终止本活动，无需为此承担法律任何责任。</li>' +
                        '        <li>5、因第三方通过各种不当手段攻击或篡改系统等或举办方系统故障致使答题结果或者系统数据发生错误，活动举办方不负责任何法律责任。</li>' +
                        '        <li>6、活动期间，因用户操作不当或用户所在地区网络故障、支付平台网络故障、网络营业商故障等非活动举办方所能控制的原因导致的用户无法参与活动、或参与失败、活动举办方无需为此承担任何法律责任。</li>' +
                        '        <li>7、请用户务必在官方制定活动页面参与本次活动。任何人或第三方冒用活动举办方名义从事类似活动或恶意通知用户获奖，造成用户损失的，活动举办方无需为此承担任何法律责任。</li>' +
                        '        <li>8、用户同意‘百万冲冲冲’有权将您的个人信息包括但不限于姓名（昵称、帐号）、头像（包括不限于肖像）、所获奖金数额、获奖排名等在‘百万冲冲冲’活动页面上予以公示，您同意并知晓‘百万冲冲冲’的上述行为，理解并自愿承担‘百万冲冲冲’全部或者部分公示获奖用户上述信息的行为造成或可能造成的影响。</li>' +
                        '        <li>9、‘百万冲冲冲’题目覆盖极广，囊括了天文、地理、历史、体育、科技、娱乐、影视等方面，举办方将尽可能范围内确保题目及答案的准确性和客观性，并在法律允许的范围内，对相关题目及答案保留最终解释权。</li>' +
                        '        <li>10、活动举办方可根据活动举办的实施情况，在法律允许的范围内，对本活动规则进行变动或调整，相关变动或挑战将公布在活动规则页面上，并于公布时即时生效，该用户继续参与该活动则视为对上述变动或者调整的活动规则予以同意。如果该用户拒绝上述活动规则的变更或调整，则可以选择放弃参与变更后的该活动。</li>' +
                        '        <li>11、对本次活动举办方在法律上允许的范围内拥有最终解释权。</li>' +
                        '    </ul>' +
                        '</div>');


                    $(".pop-wrap").find('.pop-law_box').customScrollbar({
                        hScroll: false,
                        updateOnWindowResize: true
                    })
                }
            }),

            noAnswerLayer = layerFactory({
                width: 442,
                height: 200,
                show: function (str, refreshStr) {
                    this.init();
                    $(".pop-wrap").append('<h3>温馨提示</h3>' +
                        '<div class="pop-cash_box">' +
                        '    <p style="width: 390px;margin: 0 auto;">' +
                        str +
                        '    </p>' +
                        '    <p style="margin-top: 20px;text-align: center">' +
                        (refreshStr ? refreshStr : '        如有疑问，可联系客服QQ：800062144') +
                        '    </p>' +
                        '</div>');
                }
            }),

            endPage = layerFactory({
                width: 373,
                height: 438,
                show: function (data) {
                    var self = this;
                    this.init();
                    $(".pop-wrap").addClass('pop-endWrap');
                    $(".pop-wrap").append('<div class="pop-endWrap-con">' +
                        '    <p class="pop-endWrap-intro">我击败了<i>' + data.count + '</i> 位对手 <br>答题成功，赢得了 <i>' + data.money + '</i> 元奖金</p>' +
                        '    <p class="pop-endWrap-money">本期奖金 <br> <i>￥' + data.total + '</i></p>' +
                        '    <span>邀请好友可得答题复活卡</span>' +
                        '</div>');

                    $('.pop-wrap .pop-endWrap-con span').on('click', function () {
                        self.hide();
                        shareLayer.show(info.uid);
                    })
                }
            }),

            apologizeLayer = layerFactory({
                width: 442,
                height: 220,
                show: function () {
                    this.init();
                    $(".pop-wrap").append('<h3>致歉信</h3>' +
                        '<div class="pop-rule_list">' +
                        '    <p style="width: 350px;margin: 0 auto;">' +
                        '      亲爱的玩家,您好：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;非常抱歉，首次官网答题出现异常，经过调试暂时无法解决，后续调试好会再次开放，给您带来的不便敬请您谅解。' +
                        '    </p>' +
                        '    <p style="margin-top: 20px;text-align: center">' +
                        '        如有疑问，可联系客服QQ：800062144' +
                        '    </p>' +
                        '</div>');
                }
            });


        // rewardLayer.show();
        // noAnswerLayer.show('非常抱歉，参加活动超时，您已不能答题，敬请期待下一期。');

        // endPage.show({count: 10, total: 1, money: 1});

        var popEvent = function () {
            $(".act3-rule_info").on("click", function () {
                actLayer.show();
            })
            $(".getCard-item1 span").on("click", function () {
                if (!actUserId) {
                    _jsiframeShow(0);
                    return;
                }
                shareLayer.show(info.uid);
            })

            $(".getCard-item3 span").on("click", function () {
                noAnswerLayer.show('游戏正在接入中，敬请期待');
            })

            $(".getCard-item2 span").on("click", function () {
                if (!actUserId) {
                    _jsiframeShow(0);
                    return;
                }

                var status = $(this).attr('v');

                if (status == 2) return;

                if (status == 1) {
                    taskList.phoneTask();
                    return;
                }

                phoneLayer.show();
            })

            $(".getCard-item4 span").on("click", function () {
                if (!actUserId) {
                    _jsiframeShow(0);
                    return;
                }

                var status = $(this).attr('v');

                if (status == 2) return;

                if (status == 1) {
                    taskList.phoneTask();
                    return;
                }

                if (status == 0) {
                    phoneLayer.show();
                    return;
                }
                noAnswerLayer.show('您不是被邀请注册用户，无法完成此项任务。去“邀请好友”可以获得更多复活卡哟');
            })

            $(".act1-reward span").on("click", function () {
                var money = $('.act1-reward i').html().slice(1);

                if (!actUserId) {
                    _jsiframeShow(0);
                    return;
                }

                if (money < 30) {
                    noRewardLayer.show();
                    return;
                }
                rewardLayer.show();
            })
            $('.act3-rule_law').on('click', function () {
                lawLayer.show();
            })
        } ();

        return {
            noAnswerLayer: noAnswerLayer,
            endPage: endPage
        }

    } ();

    var userStatus = function () {

        var LOGINURL = '//ptlogin.2144.cn/ptlogin';

        function userLoginFn() {
            $.ajax({
                type: "GET",
                url: LOGINURL + "/getuser",
                data: {
                    t: Math.random()
                },
                dataType: "jsonp",
                success: function (data) {

                    answerFn.isRenderQuestion(data);

                    if (data.isGuest == 0) {

                        // WRAP.html('<div class="act-user">亲爱的' + data.username + '，欢迎来到2144~<i class="act-logout">注销</i></div>');
                        actUserId = data.id;
                        userName = data.username;
                        taskList.getTaskList();

                        return;
                    }
                    userLogoutFn();
                }
            })
        }

        function userLogoutFn() {
            if (actUserId) {
                IO.jsonp(LOGINURL + "/ajaxlogout", function (data) {
                    callback(data);
                });
            }

            actUserId = 0;
            $('.act-header_box ').html('<div class="act-user">您还没有登录哦~<i class="act-login-btn">登录</i></div>');
        }

        $('.act-header_box').on("click", ".act-logout", function () {
            userLogoutFn();
        }).on("click", ".act-login-btn, .no-login", function () {
            _jsiframeShow(0);
        })

        if (typeof Login != 'undefined') {
            Login.actLogin = function () {
                userLoginFn();
            };
        }

        if (typeof Logout != 'undefined') {
            Logout.actLogout = function () {
                userLogoutFn();
            };
        }

        userLoginFn();

    } ();

    var answerFn = function () {

        var BOX = $('.act-header_box');

        function getTime(callback) {
            $.ajax({
                type: "GET",
                url: URL + 'onlineanswer/subject.php',
                dataType: "jsonp",
                success: function (data) {
                    callback && callback(data);
                }
            });
        };

        function renderTit(userData, data) {
            renderTitLeft(userData, data);
            renderTitRight(data.money);
        }

        function renderTitLeft(userData, data) {
            var WRAP = $('.act-tit_left'),
                now = data.current_timestamp,
                start = data.timestamp,
                disTime = start - now - 120,
                tID = null,
                finish = data.finish;


            if (disTime > 150 * 60) {
                var timestamp = new Date(start * 1000),
                    day = timestamp.getDate(),
                    h = timestamp.getHours(),
                    m = timestamp.getMinutes(),
                    seconds = Math.floor(disTime);

                tID = setInterval(function () {
                    seconds--;
                    if (seconds <= 0) {
                        clearInterval(tID);
                        isRenderQuestion(userData);
                    }
                }, 1000)

                WRAP.html('下一期 <i>' + day + '日 ' + query.format(h) + ':' + query.format(m) + '</i>');
                
                return;
            }

            if (disTime > 0 && disTime <= 150 * 60) {
                var seconds = Math.floor(disTime);

                tID = setInterval(function () {
                    var h = Math.floor(seconds / 60 / 60),
                        m = Math.floor((seconds - 60 * h * 60) / 60),
                        s = seconds - m * 60 - h * 60 * 60;

                    seconds--;
                    if (seconds <= 0) {
                        clearInterval(tID);
                        isRenderQuestion(userData);
                    }

                    WRAP.html(query.format(h) + ':' + query.format(m) + ':' + query.format(s) + '<i>开始答题</i>');

                }, 1000)
                return;
            }

            if (disTime <= 0 && !finish) {
                WRAP.html('答题进行中...');
            }

            if (finish) {
                endDataShow(function (data) {
                    WRAP.html('答题已结束 <p>本期<b>' + data.final_count + '人</b>答题成功，每人赢得<b>' + data.money + '</b>元奖金，下一期敬请关注</p>');
                })
            }

        }

        function renderTitRight(money) {
            var WRAP = $('.act-tit_right');
            WRAP.html('奖金 <span>￥' + money + '</span>');
        }



        function renderLogin(userData, data) {
            var WRAP = $('.act-header'),
                startTime = data.timestamp,
                nowTime = data.current_timestamp,
                disTime = startTime - nowTime,
                finish = data.finish;

            actID = data.act_id;

            if (userData.isGuest) {

                BOX.html('<div class="act-user">您还没有登录哦~<i class="act-login-btn">登录</i></div>');

                if (disTime <= 60 * 10) {
                    BOX.html('<div class="act-user"><i class="no-login">登录答题</i></div>');
                    return;
                }

                return;
            }

            if (!finish && disTime <= 60 * 12) {
                WRAP.addClass('act-header-reg');
            }

            if (disTime > 60 * 2 && disTime <= 60 * 12) {
                BOX.html('<div class="act-QAs">' +
                    '    <ul class="act-QAs_intro">' +
                    '        <li><span class="act3-QAs_listbg1"></span>每场共12题，10秒内选出你认为正确的唯一选项</li>' +
                    '        <li><span class="act3-QAs_listbg2"></span>超时或者回答错误你将会被淘汰</li>' +
                    '        <li><span class="act3-QAs_listbg3"></span>答对12题，瓜分本期奖金</li>' +
                    '    </ul>' +
                    '</div');
                return;
            }

            if (disTime > 0 && disTime <= 60 * 2) {
                var seconds = Math.floor(disTime);
                tID = setInterval(function () {
                    var m = Math.floor(seconds / 60),
                        s = seconds - m * 60;

                    seconds--;
                    if (seconds <= 0) {
                        clearInterval(tID);
                        isRenderQuestion(userData);
                    }

                    BOX.html('<div class="act-QAs_downTime">答题将在 <i>' + query.format(m) + ':' + query.format(s) + '</i>s 后正式开始，<br>请不要离开当前页面。</div');

                }, 1000)

                return;
            }


            if (data.subject && disTime <= 0 && !data.finish && disTime >= -10) {
                renderQuestion(BOX, data);
                return;
            }

            if ((disTime > 60 * 12) || (disTime < -10)) {
                WRAP.removeClass('act-header-reg');
                BOX.html('<div class="act-user">亲爱的' + userName + '，欢迎来到2144~<i class="act-logout">注销</i></div>');
            }

            if (disTime < -10 && disTime > -192) {
                WRAP.removeClass('act-header-reg');
                layer.noAnswerLayer.show('答题正在进行中，将在11：35分结束，敬请期待下一期。', '答题进行中，3分钟后刷新页面查看结果');
                return;
            }

        }

        function getQuestion(callback) {
            $.ajax({
                type: "GET",
                url: URL + 'onlineanswer/subject.php',
                dataType: "jsonp",
                success: function (data) {
                    callback && callback(data);
                }
            });
        };

        function renderTime(times, str, callback) {
            var tID = null;

            tID = setInterval(function () {
                var timeWrap = BOX.find('.act-QAs_time');
                times--;
                timeWrap.html('<i>' + times + '</i>' + str);
                if (times <= 0) {
                    clearInterval(tID);
                    callback && callback();
                }
            }, 1000)
        }


        function renderQuestion(box, data) {
            var subject = data.subject,
                nowTime = data.current_timestamp,
                startTime = subject.start_time,
                downTime = (10 - (nowTime - startTime));

            box.html('<div class="act-QAs" onselectstart="return false">' +
                '    <div class="act-QAs_list">' +
                '        <p v="' + subject.subject_token + '">' + subject.title + '</p>' +
                '        <div class="act-QAs-answer">' +
                '            <span v="1">' + subject.answer_list["1"] + '<i></i></span>' +
                '            <span v="2">' + subject.answer_list["2"] + '<i></i></span>' +
                '            <span v="3">' + subject.answer_list["3"] + '<i></i></span>' +
                '            <span v="4">' + subject.answer_list["4"] + '<i></i></span>' +
                '        </div>' +
                '    </div>' +
                '    <div class="act-QAs_time"><i>10</i>秒后公布答案</div>' +
                '    <div class="act-QAs_card"> 复活卡 x<i>' + info.card_count + '</i></div>' +
                '</div>');

            renderTime((downTime >= 0 ? downTime : 0), '秒后公布答案', function () {

                box.append('<div class="act-QAs_loading"></div>')
                box.addClass('no-answer');

                setTimeout(function () {
                    box.removeClass('no-answer');
                    getAnswer(function (data) {
                        renderAnswer(data);
                    })
                }, 3000)

            })

        }

        function putAnswer(v, subject_token, callback) {
            $.ajax({
                type: "GET",
                url: URL + 'onlineanswer/answer.php',
                data: {
                    uid: info.uid,
                    token: info.token,
                    subject_token: subject_token,
                    answer: v
                },
                dataType: "jsonp",
                success: function (data) {
                    callback && callback(data);
                }
            });
        }


        function getAnswer(callback) {
            var subject_token = $('.act-QAs_list p').attr('v');
            $.ajax({
                type: "GET",
                url: URL + 'onlineanswer/result.php',
                data: {
                    subject_token: subject_token,
                    token: info.token,
                    uid: info.uid
                },
                dataType: "jsonp",
                success: function (data) {
                    callback && callback(data);
                }
            });
        }

        function renderAnswer(data) {
            var wrap = $('.act-QAs-answer'),
                sltSpan = wrap.find('span.cur'),
                curSpan = wrap.find('span').eq(data.answer - 1);

            if (data.status == -1) {
                msgShow.show("服务器异常", BOX);
                return;
            }

            BOX.find('.act-QAs_loading').remove();


            for (var i in data.count) {
                wrap.find('i').eq(i - 1).html(data.count[i]);
            }


            if (sltSpan && sltSpan.attr('v') != data.answer) {
                sltSpan.addClass('fail');
            }

            curSpan.addClass('suc');

            if (data.fail == 1) {
                msgShow.show("您已被淘汰", BOX);
                setTimeout(function () {
                    $('.act-header').removeClass("act-header-reg");
                    BOX.html('<div class="act-user">亲爱的' + userName + '，欢迎来到2144~<i class="act-logout">注销</i></div>');
                    layer.noAnswerLayer.show('您已答错，请再接再砺，答题将在11：35分结束。敬请期待下一期。', '答题进行中，3分钟后刷新页面查看结果');
                }, 2000);
                return;
            }

            if (data.card) {
                msgShow.show("自动为您复活x1", BOX);
                info.card_count--;
                if (info.card_count <= 0) info.card_count = 0;
                $('.act-QAs_card').html('复活卡 x<i>' + info.card_count + '</i>')
                $('.act1-card_num i').html(info.card_count);
            }


            if (data.url) {
                renderTime(3, '秒后进入下一题', function () {
                    getQuestion(function (data) {
                        renderQuestion(BOX, data);
                    });
                })
                return;
            }

            msgShow.show("恭喜您全部答对！", BOX);

            setTimeout(function () {
                $('.act-header').removeClass("act-header-reg");
                BOX.html('<div class="act-user">亲爱的' + userName + '，欢迎来到2144~<i class="act-logout">注销</i></div>');

                $('.act-tit_left').html('答题已结束');

                endDataShow(function (data) {
                    layer.endPage.show(data);
                })
            }, 5000);

            taskList.getTaskList();
            return;

        }
        function endDataShow(callback) {
            $.ajax({
                type: "GET",
                url: URL + 'onlineAnswer/result',
                data: {
                    act: actID
                },
                dataType: "jsonp",
                success: function (data) {
                    callback && callback(data);
                }
            })
        }

        function isRenderQuestion(userData) {
            getTime(function (data) {
                renderTit(userData, data);
                renderLogin(userData, data);
            })
        }


        $('.act-header_box').on('click', '.act-QAs-answer span', function () {
            if ($('.act-header_box').hasClass('no-answer')) return;
            if ($(this).hasClass('cur') || $(this).siblings().hasClass('cur')) return;
            $(this).addClass('cur').siblings().removeClass('cur');
            putAnswer($(this).attr('v'), $('.act-header_box p').attr('v'));

        })

        return {
            isRenderQuestion: isRenderQuestion
        }

    } ();




    var taskList = function () {

        function getTaskList(callback) {
            $.ajax({
                type: "GET",
                url: URL + 'onlineAnswer/info',
                dataType: "jsonp",
                success: function (data) {
                    if (data.status == 0) {
                        info = data;
                        myInfo(data.money, data.card_count);
                        renderCard1(data);
                        renderCard2(data.bind_status);
                        renderCard3(data.level_task);
                        renderCard4(data.from_friend, data.bind_status);
                    }
                }
            })
        }


        function renderCard1(data) {
            var WRAP = $('.getCard-item1');
            WRAP.find('h3 i').html(data.invite_count);

            WRAP.find('.register_count').html(data.register_count);

            WRAP.find('.invite_count').html(data.invite_count);
        }

        function renderCard2(status) {
            var WRAP = $('.getCard-item2 span');

            if (!status) {
                WRAP.removeAttr('v');
                WRAP.html('绑定手机');
                return;
            }


            WRAP.html('领取奖励');

            if (status == 2) {
                WRAP.html('已领取');
            }

            WRAP.attr('v', status);

        }

        function renderCard3(data) {
            var WRAP = $('.getCard-item3 ul'),
                str = '';


            // data.forEach(function (item) {
            //     str += '<li>散人传说 ' + item.level + '级 复活卡+1' + (item.status == 1 ? '<i v="' + item.task + '">领取</i>' : "") + '</li>';
            // })

            WRAP.html(str + '<li>(游戏正在接入中，敬请期待)</li>');
        }

        function renderCard4(friend, bind_status) {
            var WRAP = $('.getCard-item4 ul'),
                button = $('.getCard-item4 span');


            WRAP.find('i').removeClass('success');
            button.removeAttr('v');
            button.html('绑定手机协助好友');

            if (friend) {
                WRAP.find('i').eq(0).addClass('success');
                button.attr('v', bind_status);
                if (bind_status) {
                    WRAP.find('i').addClass('success');
                    button.html('领取奖励');
                    if (bind_status == 2) {
                        button.html('已领取');
                    }
                }
            }

        }

        function myInfo(money, num) {
            var cardNum = $('.act1-card_num i'),
                moneyWrap = $('.act1-reward i');

            cardNum.html(num);
            moneyWrap.html('￥' + money);
        }


        function phoneTask() {
            $.ajax({
                type: "GET",
                url: URL + 'onlineAnswer/bindPhone',
                dataType: "jsonp",
                success: function (data) {
                    getTaskList();
                }
            })
        }

        function levelTask(v, callback) {
            $.ajax({
                type: "GET",
                url: URL + 'onlineAnswer/levelTask',
                data: {
                    task_id: v
                },
                dataType: "jsonp",
                success: function (data) {
                    callback && callback();
                }
            })
        }

        $('.getCard-item3').on('click', 'i', function () {
            var v = $(this).attr('v');

            levelTask(v, function () {
                getTaskList();
            });
        })

        getTaskList();

        return {
            phoneTask: phoneTask,
            getTaskList: getTaskList
        }

    } ();




    // rankList
    var rankList = function () {
        var buttton = $('.act3-rank_tit span');

        function rankList(callback) {
            $.ajax({
                type: "GET",
                url: URL + 'onlineAnswer/list',
                dataType: "jsonp",
                success: function (data) {
                    callback && callback(data);
                }
            })
        }

        function renderWeek(data) {
            var wrap = $('.act3-rank_weekList'),
                str = '';

            $.each(data, function (index, item) {
                str += '<li><strong>' + item.rank + '</strong> <i>' + item.username + '</i> <b>' + item.money + '</b></li>';
            })

            wrap.html(str);
            // wrap.customScrollbar({
            //     hScroll: false,
            //     updateOnWindowResize: true
            // })
        }


        function renderTotal(data) {
            var wrap = $('.act3-rank_totalList'),
                str = '';

            $.each(data, function (index, item) {
                str += '<li><strong>' + item.rank + '</strong> <i>' + item.username + '</i> <b>' + item.money + '</b></li>';
            })

            wrap.html(str);
            // wrap.customScrollbar({
            //     hScroll: false,
            //     updateOnWindowResize: true
            // })
        }

        rankList(function (data) {
            renderWeek(data.week);
            renderTotal(data.total);
        })

        buttton.eq(0).addClass('cur');

        buttton.on('click', function () {
            var index = $(this).index();
            // dataFn = dataAry[index - 1];
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.act3-rank_box').find('ul').addClass('hidden').eq(index).removeClass('hidden');

            // if (index && !dataFn.state) {
            //     dataFn();
            //     dataFn.state = true;
            // }

        })

    } ();





} (document, $));