!function(e){e.fn.fullpage=function(n){function o(e){e.find(".fp-slides").after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>'),"#fff"!=n.controlArrowColor&&(e.find(".fp-controlArrow.fp-next").css("border-color","transparent transparent transparent "+n.controlArrowColor),e.find(".fp-controlArrow.fp-prev").css("border-color","transparent "+n.controlArrowColor+" transparent transparent")),n.loopHorizontal||e.find(".fp-controlArrow.fp-prev").hide()}function t(){e("body").append('<div id="fp-nav"><ul></ul></div>'),ce=e("#fp-nav"),ce.css("color",n.navigationColor),ce.addClass(n.navigationPosition);for(var o=0;o<e(".fp-section").length;o++){var t="";n.anchors.length&&(t=n.anchors[o]);var i='<li><a href="#'+t+'"><span></span></a>',l=n.navigationTooltips[o];void 0!==l&&""!=l&&(i+='<div class="fp-tooltip '+n.navigationPosition+'">'+l+"</div>"),i+="</li>",ce.find("ul").append(i)}}function i(){e(".fp-section").each(function(){var n=e(this).find(".fp-slide");n.length?n.each(function(){N(e(this))}):N(e(this))}),e.isFunction(n.afterRender)&&n.afterRender.call(this)}function l(){var o;if(!n.autoScrolling||n.scrollBar){var t=e(window).scrollTop(),i=0,l=Math.abs(t-e(".fp-section").first().offset().top);e(".fp-section").each(function(n){var o=Math.abs(t-e(this).offset().top);l>o&&(i=n,l=o)}),o=e(".fp-section").eq(i)}if((!n.autoScrolling||n.scrollBar)&&!o.hasClass("active")){xe=!0;var a=e(".fp-section.active"),s=a.index(".fp-section")+1,r=R(o),c=o.data("anchor"),f=o.index(".fp-section")+1,d=o.find(".fp-slide.active");if(d.length)var p=d.data("anchor"),u=d.index();o.addClass("active").siblings().removeClass("active"),he||(e.isFunction(n.onLeave)&&n.onLeave.call(a,s,f,r),e.isFunction(n.afterLoad)&&n.afterLoad.call(o,c,f)),M(c,0),n.anchors.length&&!he&&(se=c,W(u,p,c,f)),clearTimeout(be),be=setTimeout(function(){xe=!1},100)}n.scrollBar&&(clearTimeout(ye),ye=setTimeout(function(){he||(e(".fp-section.active").is(o)&&(ge=!0),v(o),ge=!1)},1e3))}function a(e){return e.find(".fp-slides").length?e.find(".fp-slide.active").find(".fp-scrollable"):e.find(".fp-scrollable")}function s(n,o){if(we[n]){var t,i;if("down"==n?(t="bottom",i=e.fn.fullpage.moveSectionDown):(t="top",i=e.fn.fullpage.moveSectionUp),o.length>0){if(!z(t,o))return!0;i()}else i()}}function r(o){var t=o.originalEvent;if(!c(o.target)){n.autoScrolling&&o.preventDefault();var i=e(".fp-section.active"),l=a(i);if(!he&&!fe){var r=J(t);Ae=r.y,ke=r.x,i.find(".fp-slides").length&&Math.abs(Te-ke)>Math.abs(Ce-Ae)?Math.abs(Te-ke)>e(window).width()/100*n.touchSensitivity&&(Te>ke?we.right&&e.fn.fullpage.moveSlideRight():we.left&&e.fn.fullpage.moveSlideLeft()):n.autoScrolling&&Math.abs(Ce-Ae)>e(window).height()/100*n.touchSensitivity&&(Ce>Ae?s("down",l):Ae>Ce&&s("up",l))}}}function c(o,t){t=t||0;var i=e(o).parent();return t<n.normalScrollElementTouchThreshold&&i.is(n.normalScrollElements)?!0:t==n.normalScrollElementTouchThreshold?!1:c(i,++t)}function f(o){var t=o.originalEvent;n.scrollBar&&e("html,body").stop();var i=J(t);Ce=i.y,Te=i.x}function d(o){if(n.autoScrolling){o=window.event||o;var t=Math.max(-1,Math.min(1,o.wheelDelta||-o.deltaY||-o.detail));n.scrollBar&&(o.preventDefault?o.preventDefault():o.returnValue=!1);var i=e(".fp-section.active"),l=a(i);return he||(0>t?s("down",l):s("up",l)),!1}n.scrollBar&&e("html,body").stop()}function p(o){var t=e(".fp-section.active"),i=t.find(".fp-slides");if(i.length&&!fe){var l=i.find(".fp-slide.active"),a=null;if(a="prev"===o?l.prev(".fp-slide"):l.next(".fp-slide"),!a.length){if(!n.loopHorizontal)return;a="prev"===o?l.siblings(":last"):l.siblings(":first")}fe=!0,x(i,a)}}function u(){e(".fp-slide.active").each(function(){Z(e(this))})}function v(o,t,i){var l=o.position();if("undefined"!=typeof l){var a={element:o,callback:t,isMovementUp:i,dest:l,dtop:l.top,yMovement:R(o),anchorLink:o.data("anchor"),sectionIndex:o.index(".fp-section"),activeSlide:o.find(".fp-slide.active"),activeSection:e(".fp-section.active"),leavingSection:e(".fp-section.active").index(".fp-section")+1,localIsResizing:ge};if(!(a.activeSection.is(o)&&!ge||n.scrollBar&&e(window).scrollTop()===a.dtop)){if(a.activeSlide.length)var s=a.activeSlide.data("anchor"),r=a.activeSlide.index();n.autoScrolling&&n.continuousVertical&&"undefined"!=typeof a.isMovementUp&&(!a.isMovementUp&&"up"==a.yMovement||a.isMovementUp&&"down"==a.yMovement)&&(a=m(a)),o.addClass("active").siblings().removeClass("active"),he=!0,W(r,s,a.anchorLink,a.sectionIndex),e.isFunction(n.onLeave)&&!a.localIsResizing&&n.onLeave.call(a.activeSection,a.leavingSection,a.sectionIndex+1,a.yMovement),h(a),se=a.anchorLink,n.autoScrolling&&M(a.anchorLink,a.sectionIndex)}}}function h(o){if(n.css3&&n.autoScrolling&&!n.scrollBar){var t="translate3d(0px, -"+o.dtop+"px, 0px)";V(t,!0),setTimeout(function(){S(o)},n.scrollingSpeed)}else{var i=g(o);e(i.element).animate(i.options,n.scrollingSpeed,n.easing).promise().done(function(){S(o)})}}function g(e){var o={};return n.autoScrolling&&!n.scrollBar?(o.options={top:-e.dtop},o.element="."+me):(o.options={scrollTop:e.dtop},o.element="html, body"),o}function m(n){return n.isMovementUp?e(".fp-section.active").before(n.activeSection.nextAll(".fp-section")):e(".fp-section.active").after(n.activeSection.prevAll(".fp-section").get().reverse()),_(e(".fp-section.active").position().top),u(),n.wrapAroundElements=n.activeSection,n.dest=n.element.position(),n.dtop=n.dest.top,n.yMovement=R(n.element),n}function w(n){n.wrapAroundElements&&n.wrapAroundElements.length&&(n.isMovementUp?e(".fp-section:first").before(n.wrapAroundElements):e(".fp-section:last").after(n.wrapAroundElements),_(e(".fp-section.active").position().top),u())}function S(o){w(o),e.isFunction(n.afterLoad)&&!o.localIsResizing&&n.afterLoad.call(o.element,o.anchorLink,o.sectionIndex+1),setTimeout(function(){he=!1,e.isFunction(o.callback)&&o.callback.call(this)},ae)}function b(){var e=window.location.hash.replace("#","").split("/"),n=e[0],o=e[1];n&&D(n,o)}function y(){if(!xe){var e=window.location.hash.replace("#","").split("/"),n=e[0],o=e[1];if(n.length){var t="undefined"==typeof se,i="undefined"==typeof se&&"undefined"==typeof o&&!fe;(n&&n!==se&&!t||i||!fe&&re!=o)&&D(n,o)}}}function x(o,t){var i=t.position(),l=o.find(".fp-slidesContainer").parent(),a=t.index(),s=o.closest(".fp-section"),r=s.index(".fp-section"),c=s.data("anchor"),f=s.find(".fp-slidesNav"),d=t.data("anchor"),p=ge;if(n.onSlideLeave){var u=s.find(".fp-slide.active"),v=u.index(),h=I(v,a);p||"none"===h||e.isFunction(n.onSlideLeave)&&n.onSlideLeave.call(u,c,r+1,v,h)}t.addClass("active").siblings().removeClass("active"),"undefined"==typeof d&&(d=a),!n.loopHorizontal&&n.controlArrows&&(s.find(".fp-controlArrow.fp-prev").toggle(0!=a),s.find(".fp-controlArrow.fp-next").toggle(!t.is(":last-child"))),s.hasClass("active")&&W(a,d,c,r);var g=function(){p||e.isFunction(n.afterSlideLoad)&&n.afterSlideLoad.call(t,c,r+1,d,a),fe=!1};if(n.css3){var m="translate3d(-"+i.left+"px, 0px, 0px)";A(o.find(".fp-slidesContainer"),n.scrollingSpeed>0).css(ee(m)),setTimeout(function(){g()},n.scrollingSpeed,n.easing)}else l.animate({scrollLeft:i.left},n.scrollingSpeed,n.easing,function(){g()});f.find(".active").removeClass("active"),f.find("li").eq(a).find("a").addClass("active")}function C(){if(T(),de){if("text"!==e(document.activeElement).attr("type")){var n=e(window).height();Math.abs(n-Le)>20*Math.max(Le,n)/100&&(e.fn.fullpage.reBuild(!0),Le=n)}}else clearTimeout(Be),Be=setTimeout(function(){e.fn.fullpage.reBuild(!0)},500)}function T(){if(n.responsive){var o=ue.hasClass("fp-responsive");e(window).width()<n.responsive?o||(e.fn.fullpage.setAutoScrolling(!1,"internal"),e("#fp-nav").hide(),ue.addClass("fp-responsive")):o&&(e.fn.fullpage.setAutoScrolling(Se.autoScrolling,"internal"),e("#fp-nav").show(),ue.removeClass("fp-responsive"))}}function A(e){var o="all "+n.scrollingSpeed+"ms "+n.easingcss3;return e.removeClass("fp-notransition"),e.css({"-webkit-transition":o,transition:o})}function k(e){return e.addClass("fp-notransition")}function B(n,o){var t=825,i=900;if(t>n||i>o){var l=100*n/t,a=100*o/i,s=Math.min(l,a),r=s.toFixed(2);e("body").css("font-size",r+"%")}else e("body").css("font-size","100%")}function L(o,t){n.navigation&&(e("#fp-nav").find(".active").removeClass("active"),o?e("#fp-nav").find('a[href="#'+o+'"]').addClass("active"):e("#fp-nav").find("li").eq(t).find("a").addClass("active"))}function E(o){n.menu&&(e(n.menu).find(".active").removeClass("active"),e(n.menu).find('[data-menuanchor="'+o+'"]').addClass("active"))}function M(e,n){E(e),L(e,n)}function z(e,n){return"top"===e?!n.scrollTop():"bottom"===e?n.scrollTop()+1+n.innerHeight()>=n[0].scrollHeight:void 0}function R(n){var o=e(".fp-section.active").index(".fp-section"),t=n.index(".fp-section");return o==t?"none":o>t?"up":"down"}function I(e,n){return e==n?"none":e>n?"left":"right"}function N(e){e.css("overflow","hidden");var o,t=e.closest(".fp-section"),i=e.find(".fp-scrollable");i.length?o=i.get(0).scrollHeight:(o=e.get(0).scrollHeight,n.verticalCentered&&(o=e.find(".fp-tableCell").get(0).scrollHeight));var l=ve-parseInt(t.css("padding-bottom"))-parseInt(t.css("padding-top"));o>l?i.length?i.css("height",l+"px").parent().css("height",l+"px"):(n.verticalCentered?e.find(".fp-tableCell").wrapInner('<div class="fp-scrollable" />'):e.wrapInner('<div class="fp-scrollable" />'),e.find(".fp-scrollable").slimScroll({allowPageScroll:!0,height:l+"px",size:"10px",alwaysVisible:!0})):P(e),e.css("overflow","")}function P(e){e.find(".fp-scrollable").children().first().unwrap().unwrap(),e.find(".slimScrollBar").remove(),e.find(".slimScrollRail").remove()}function H(e){e.addClass("fp-table").wrapInner('<div class="fp-tableCell" style="height:'+F(e)+'px;" />')}function F(e){var o=ve;if(n.paddingTop||n.paddingBottom){var t=e;t.hasClass("fp-section")||(t=e.closest(".fp-section"));var i=parseInt(t.css("padding-top"))+parseInt(t.css("padding-bottom"));o=ve-i}return o}function V(e,n){n?A(ue):k(ue),ue.css(ee(e)),setTimeout(function(){ue.removeClass("fp-notransition")},10)}function D(n,o){var t;"undefined"==typeof o&&(o=0),t=isNaN(n)?e('[data-anchor="'+n+'"]'):e(".fp-section").eq(n-1),n===se||t.hasClass("active")?q(t,o):v(t,function(){q(t,o)})}function q(e,n){if("undefined"!=typeof n){var o=e.find(".fp-slides"),t=o.find('[data-anchor="'+n+'"]');t.length||(t=o.find(".fp-slide").eq(n)),t.length&&x(o,t)}}function U(e,o){e.append('<div class="fp-slidesNav"><ul></ul></div>');var t=e.find(".fp-slidesNav");t.addClass(n.slidesNavPosition);for(var i=0;o>i;i++)t.find("ul").append('<li><a href="#"><span></span></a></li>');t.css("margin-left","-"+t.width()/2+"px"),t.find("li").first().find("a").addClass("active")}function W(e,o,t,i){var l="";n.anchors.length?(e?("undefined"!=typeof t&&(l=t),"undefined"==typeof o&&(o=e),re=o,O(l+"/"+o)):"undefined"!=typeof e?(re=o,O(t)):O(t),Y(location.hash)):Y("undefined"!=typeof e?i+"-"+e:String(i))}function O(e){if(n.recordHistory)location.hash=e;else if(de||pe)history.replaceState(void 0,void 0,"#"+e);else{var o=window.location.href.split("#")[0];window.location.replace(o+"#"+e)}}function Y(n){n=n.replace("/","-").replace("#",""),e("body")[0].className=e("body")[0].className.replace(/\b\s?fp-viewing-[^\s]+\b/g,""),e("body").addClass("fp-viewing-"+n)}function X(){var e,n=document.createElement("p"),o={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(n,null);for(var t in o)void 0!==n.style[t]&&(n.style[t]="translate3d(1px,1px,1px)",e=window.getComputedStyle(n).getPropertyValue(o[t]));return document.body.removeChild(n),void 0!==e&&e.length>0&&"none"!==e}function Q(){document.addEventListener?(document.removeEventListener("mousewheel",d,!1),document.removeEventListener("wheel",d,!1)):document.detachEvent("onmousewheel",d)}function j(){document.addEventListener?(document.addEventListener("mousewheel",d,!1),document.addEventListener("wheel",d,!1)):document.attachEvent("onmousewheel",d)}function K(){if(de||pe){var n=G();e(document).off("touchstart "+n.down).on("touchstart "+n.down,f),e(document).off("touchmove "+n.move).on("touchmove "+n.move,r)}}function $(){if(de||pe){var n=G();e(document).off("touchstart "+n.down),e(document).off("touchmove "+n.move)}}function G(){var e;return e=window.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"}}function J(e){var n=[];return n.y="undefined"!=typeof e.pageY&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,n.x="undefined"!=typeof e.pageX&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,n}function Z(n){e.fn.fullpage.setScrollingSpeed(0,"internal"),x(n.closest(".fp-slides"),n),e.fn.fullpage.setScrollingSpeed(Se.scrollingSpeed,"internal")}function _(e){if(n.scrollBar)ue.scrollTop(e);else if(n.css3){var o="translate3d(0px, -"+e+"px, 0px)";V(o,!1)}else ue.css("top",-e)}function ee(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}}function ne(n,o){switch(o){case"up":we.up=n;break;case"down":we.down=n;break;case"left":we.left=n;break;case"right":we.right=n;break;case"all":e.fn.fullpage.setAllowScrolling(n)}}function oe(){_(0),e("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove(),e(".fp-section").css({height:"","background-color":"",padding:""}),e(".fp-slide").css({width:""}),ue.css({height:"",position:"","-ms-touch-action":"","touch-action":""}),e(".fp-section, .fp-slide").each(function(){P(e(this)),e(this).removeClass("fp-table active")}),k(ue),k(ue.find(".fp-easing")),ue.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(function(){e(this).replaceWith(this.childNodes)}),e("html, body").scrollTop(0)}function te(e,o,t){n[e]=o,"internal"!==t&&(Se[e]=o)}function ie(){n.continuousVertical&&(n.loopTop||n.loopBottom)&&(n.continuousVertical=!1,le("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),n.continuousVertical&&n.scrollBar&&(n.continuousVertical=!1,le("warn","Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),e.each(n.anchors,function(n,o){(e("#"+o).length||e('[name="'+o+'"]').length)&&le("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")})}function le(e,n){console&&console[e]&&console[e]("fullPage: "+n)}n=e.extend({menu:!1,anchors:[],navigation:!1,navigationPosition:"right",navigationColor:"#000",navigationTooltips:[],slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,easing:"easeInQuart",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,normalScrollElements:null,scrollOverflow:!1,touchSensitivity:5,normalScrollElementTouchThreshold:5,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,controlArrowColor:"#fff",verticalCentered:!0,resize:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,sectionSelector:".section",slideSelector:".slide",afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null},n),ie(),e.extend(e.easing,{easeInQuart:function(e,n,o,t,i){return t*(n/=i)*n*n*n+o}});var ae=600;e.fn.fullpage.setAutoScrolling=function(o,t){te("autoScrolling",o,t);var i=e(".fp-section.active");n.autoScrolling&&!n.scrollBar?(e("html, body").css({overflow:"hidden",height:"100%"}),e.fn.fullpage.setRecordHistory(n.recordHistory,"internal"),ue.css({"-ms-touch-action":"none","touch-action":"none"}),i.length&&_(i.position().top)):(e("html, body").css({overflow:"visible",height:"initial"}),e.fn.fullpage.setRecordHistory(!1,"internal"),ue.css({"-ms-touch-action":"","touch-action":""}),_(0),e("html, body").scrollTop(i.position().top))},e.fn.fullpage.setRecordHistory=function(e,n){te("recordHistory",e,n)},e.fn.fullpage.setScrollingSpeed=function(e,n){te("scrollingSpeed",e,n)},e.fn.fullpage.setMouseWheelScrolling=function(e){e?j():Q()},e.fn.fullpage.setAllowScrolling=function(n,o){"undefined"!=typeof o?(o=o.replace(" ","").split(","),e.each(o,function(e,o){ne(n,o)})):n?(e.fn.fullpage.setMouseWheelScrolling(!0),K()):(e.fn.fullpage.setMouseWheelScrolling(!1),$())},e.fn.fullpage.setKeyboardScrolling=function(e){n.keyboardScrolling=e},e.fn.fullpage.moveSectionUp=function(){var o=e(".fp-section.active").prev(".fp-section");o.length||!n.loopTop&&!n.continuousVertical||(o=e(".fp-section").last()),o.length&&v(o,null,!0)},e.fn.fullpage.moveSectionDown=function(){var o=e(".fp-section.active").next(".fp-section");o.length||!n.loopBottom&&!n.continuousVertical||(o=e(".fp-section").first()),o.length&&v(o,null,!1)},e.fn.fullpage.moveTo=function(n,o){var t="";t=isNaN(n)?e('[data-anchor="'+n+'"]'):e(".fp-section").eq(n-1),"undefined"!=typeof o?D(n,o):t.length>0&&v(t)},e.fn.fullpage.moveSlideRight=function(){p("next")},e.fn.fullpage.moveSlideLeft=function(){p("prev")},e.fn.fullpage.reBuild=function(o){ge=!0;var t=e(window).width();ve=e(window).height(),n.resize&&B(ve,t),e(".fp-section").each(function(){var o=e(this).find(".fp-slides"),t=e(this).find(".fp-slide");n.verticalCentered&&e(this).find(".fp-tableCell").css("height",F(e(this))+"px"),e(this).css("height",ve+"px"),n.scrollOverflow&&(t.length?t.each(function(){N(e(this))}):N(e(this))),t.length&&x(o,o.find(".fp-slide.active"))});var i=e(".fp-section.active");i.index(".fp-section")&&v(i),ge=!1,e.isFunction(n.afterResize)&&o&&n.afterResize.call(ue),e.isFunction(n.afterReBuild)&&!o&&n.afterReBuild.call(ue)};var se,re,ce,fe=!1,de=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/),pe="ontouchstart"in window||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,ue=e(this),ve=e(window).height(),he=!1,ge=!1,me="fullpage-wrapper",we={up:!0,down:!0,left:!0,right:!0},Se=e.extend(!0,{},n);e.fn.fullpage.setAllowScrolling(!0),n.css3&&(n.css3=X()),e(this).length?(ue.css({height:"100%",position:"relative"}),ue.addClass(me)):le("error","Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();"),e(n.sectionSelector).each(function(){e(this).addClass("fp-section")}),e(n.slideSelector).each(function(){e(this).addClass("fp-slide")}),n.navigation&&t(),e(".fp-section").each(function(t){var i=e(this),l=e(this).find(".fp-slide"),a=l.length;if(t||0!==e(".fp-section.active").length||e(this).addClass("active"),e(this).css("height",ve+"px"),(n.paddingTop||n.paddingBottom)&&e(this).css("padding",n.paddingTop+" 0 "+n.paddingBottom+" 0"),"undefined"!=typeof n.sectionsColor[t]&&e(this).css("background-color",n.sectionsColor[t]),"undefined"!=typeof n.anchors[t]&&e(this).attr("data-anchor",n.anchors[t]),a>1){var s=100*a,r=100/a;l.wrapAll('<div class="fp-slidesContainer" />'),l.parent().wrap('<div class="fp-slides" />'),e(this).find(".fp-slidesContainer").css("width",s+"%"),n.controlArrows&&o(e(this)),n.slidesNavigation&&U(e(this),a),l.each(function(o){e(this).css("width",r+"%"),n.verticalCentered&&H(e(this))});var c=i.find(".fp-slide.active");c.length?Z(c):l.eq(0).addClass("active")}else n.verticalCentered&&H(e(this))}).promise().done(function(){e.fn.fullpage.setAutoScrolling(n.autoScrolling,"internal");var o=e(".fp-section.active").find(".fp-slide.active");o.length&&(0!==e(".fp-section.active").index(".fp-section")||0===e(".fp-section.active").index(".fp-section")&&0!==o.index())&&Z(o),n.fixedElements&&n.css3&&e(n.fixedElements).appendTo("body"),n.navigation&&(ce.css("margin-top","-"+ce.height()/2+"px"),ce.find("li").eq(e(".fp-section.active").index(".fp-section")).find("a").addClass("active")),n.menu&&n.css3&&e(n.menu).closest(".fullpage-wrapper").length&&e(n.menu).appendTo("body"),n.scrollOverflow?("complete"===document.readyState&&i(),e(window).on("load",i)):e.isFunction(n.afterRender)&&n.afterRender.call(ue),T();var t=window.location.hash.replace("#","").split("/"),l=t[0];if(l.length){var a=e('[data-anchor="'+l+'"]');!n.animateAnchor&&a.length&&(n.autoScrolling?_(a.position().top):(_(0),Y(l),e("html, body").scrollTop(a.position().top)),M(l,null),e.isFunction(n.afterLoad)&&n.afterLoad.call(a,l,a.index(".fp-section")+1),a.addClass("active").siblings().removeClass("active"))}e(window).on("load",function(){b()})});var be,ye,xe=!1;e(window).on("scroll",l);var Ce=0,Te=0,Ae=0,ke=0;e(window).on("hashchange",y),e(document).keydown(function(o){if(n.keyboardScrolling&&n.autoScrolling&&(40!=o.which&&38!=o.which||o.preventDefault(),!he))switch(o.which){case 38:case 33:e.fn.fullpage.moveSectionUp();break;case 40:case 34:e.fn.fullpage.moveSectionDown();break;case 36:e.fn.fullpage.moveTo(1);break;case 35:e.fn.fullpage.moveTo(e(".fp-section").length);break;case 37:e.fn.fullpage.moveSlideLeft();break;case 39:e.fn.fullpage.moveSlideRight();break;default:return}}),e(document).on("click touchstart","#fp-nav a",function(n){n.preventDefault();var o=e(this).parent().index();v(e(".fp-section").eq(o))}),e(document).on("click touchstart",".fp-slidesNav a",function(n){n.preventDefault();var o=e(this).closest(".fp-section").find(".fp-slides"),t=o.find(".fp-slide").eq(e(this).closest("li").index());x(o,t)}),n.normalScrollElements&&(e(document).on("mouseenter",n.normalScrollElements,function(){e.fn.fullpage.setMouseWheelScrolling(!1)}),e(document).on("mouseleave",n.normalScrollElements,function(){e.fn.fullpage.setMouseWheelScrolling(!0)})),e(".fp-section").on("click touchstart",".fp-controlArrow",function(){e(this).hasClass("fp-prev")?e.fn.fullpage.moveSlideLeft():e.fn.fullpage.moveSlideRight()}),e(window).resize(C);var Be,Le=ve;e.fn.fullpage.destroy=function(o){e.fn.fullpage.setAutoScrolling(!1,"internal"),e.fn.fullpage.setAllowScrolling(!1),e.fn.fullpage.setKeyboardScrolling(!1),e(window).off("scroll",l).off("hashchange",y).off("resize",C),e(document).off("click","#fp-nav a").off("mouseenter","#fp-nav li").off("mouseleave","#fp-nav li").off("click",".fp-slidesNav a").off("mouseover",n.normalScrollElements).off("mouseout",n.normalScrollElements),e(".fp-section").off("click",".fp-controlArrow"),o&&oe()}}}(jQuery);