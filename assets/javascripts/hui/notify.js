/*
HUI Notify

Based on the code from Hunter Perrin
Notify 2.0.1 sciactive.com/pnotify/


(C) 2015 Huement.com
license GPL/LGPL/MPL
*/
(function(c) {
    "function" === typeof define && define.amd ? define("pnotify", ["jquery"], c) : c(jQuery)
})(function(c) {
    var p = {
            dir1: "down",
            dir2: "left",
            push: "bottom",
            spacing1: 25,
            spacing2: 25,
            context: c("body")
        },
        f, g, h = c(window),
        m = function() {
            g = c("body");
            PNotify.prototype.options.stack.context = g;
            h = c(window);
            h.bind("resize", function() {
                f && clearTimeout(f);
                f = setTimeout(function() {
                    PNotify.positionAll(!0)
                }, 10)
            })
        };
    PNotify = function(b) {
        this.parseOptions(b);
        this.init()
    };
    c.extend(PNotify.prototype, {
        version: "2.0.1",
        options: {
            title: !1,
            title_escape: !1,
            text: !1,
            text_escape: !1,
            styling: "bootstrap3",
            addclass: "",
            cornerclass: "",
            auto_display: !0,
            width: "300px",
            min_height: "16px",
            type: "notice",
            icon: !0,
            opacity: 1,
            animation: "fade",
            animate_speed: "slow",
            position_animate_speed: 500,
            shadow: !0,
            hide: !0,
            delay: 8E3,
            mouse_reset: !0,
            remove: !0,
            insert_brs: !0,
            destroy: !0,
            stack: p
        },
        modules: {},
        runModules: function(b, a) {
            var c, e;
            for (e in this.modules)
                if (c = "object" === typeof a && e in a ? a[e] : a, "function" === typeof this.modules[e][b]) this.modules[e][b](this, "object" === typeof this.options[e] ?
                    this.options[e] : {}, c)
        },
        state: "initializing",
        timer: null,
        styles: null,
        elem: null,
        container: null,
        title_container: null,
        text_container: null,
        animating: !1,
        timerHide: !1,
        init: function() {
            var b = this;
            this.modules = {};
            c.extend(!0, this.modules, PNotify.prototype.modules);
            this.styles = "object" === typeof this.options.styling ? this.options.styling : PNotify.styling[this.options.styling];
            this.elem = c("<div />", {
                "class": "ui-pnotify " + this.options.addclass,
                css: {
                    display: "none"
                },
                mouseenter: function(a) {
                    if (b.options.mouse_reset &&
                        "out" === b.animating) {
                        if (!b.timerHide) return;
                        b.cancelRemove()
                    }
                    b.options.hide && b.options.mouse_reset && b.cancelRemove()
                },
                mouseleave: function(a) {
                    b.options.hide && b.options.mouse_reset && b.queueRemove();
                    PNotify.positionAll()
                }
            });
            this.container = c("<div />", {
                "class": this.styles.container + " ui-pnotify-container " + ("error" === this.options.type ? this.styles.error : "info" === this.options.type ? this.styles.info : "success" === this.options.type ? this.styles.success : this.styles.notice)
            }).appendTo(this.elem);
            "" !== this.options.cornerclass &&
                this.container.removeClass("ui-corner-all").addClass(this.options.cornerclass);
            this.options.shadow && this.container.addClass("ui-pnotify-shadow");
            !1 !== this.options.icon && c("<div />", {
                "class": "ui-pnotify-icon"
            }).append(c("<span />", {
                "class": !0 === this.options.icon ? "error" === this.options.type ? this.styles.error_icon : "info" === this.options.type ? this.styles.info_icon : "success" === this.options.type ? this.styles.success_icon : this.styles.notice_icon : this.options.icon
            })).prependTo(this.container);
            this.title_container =
                c("<h4 />", {
                    "class": "ui-pnotify-title"
                }).appendTo(this.container);
            !1 === this.options.title ? this.title_container.hide() : this.options.title_escape ? this.title_container.text(this.options.title) : this.title_container.html(this.options.title);
            this.text_container = c("<div />", {
                "class": "ui-pnotify-text"
            }).appendTo(this.container);
            !1 === this.options.text ? this.text_container.hide() : this.options.text_escape ? this.text_container.text(this.options.text) : this.text_container.html(this.options.insert_brs ? String(this.options.text).replace(/\n/g,
                "<br />") : this.options.text);
            "string" === typeof this.options.width && this.elem.css("width", this.options.width);
            "string" === typeof this.options.min_height && this.container.css("min-height", this.options.min_height);
            PNotify.notices = "top" === this.options.stack.push ? c.merge([this], PNotify.notices) : c.merge(PNotify.notices, [this]);
            "top" === this.options.stack.push && this.queuePosition(!1, 1);
            this.options.stack.animation = !1;
            this.runModules("init");
            this.options.auto_display && this.open();
            return this
        },
        update: function(b) {
            var a =
                this.options;
            this.parseOptions(a, b);
            this.options.cornerclass !== a.cornerclass && this.container.removeClass("ui-corner-all " + a.cornerclass).addClass(this.options.cornerclass);
            this.options.shadow !== a.shadow && (this.options.shadow ? this.container.addClass("ui-pnotify-shadow") : this.container.removeClass("ui-pnotify-shadow"));
            !1 === this.options.addclass ? this.elem.removeClass(a.addclass) : this.options.addclass !== a.addclass && this.elem.removeClass(a.addclass).addClass(this.options.addclass);
            !1 === this.options.title ?
                this.title_container.slideUp("fast") : this.options.title !== a.title && (this.options.title_escape ? this.title_container.text(this.options.title) : this.title_container.html(this.options.title), !1 === a.title && this.title_container.slideDown(200));
            !1 === this.options.text ? this.text_container.slideUp("fast") : this.options.text !== a.text && (this.options.text_escape ? this.text_container.text(this.options.text) : this.text_container.html(this.options.insert_brs ? String(this.options.text).replace(/\n/g, "<br />") : this.options.text), !1 === a.text && this.text_container.slideDown(200));
            this.options.type !== a.type && this.container.removeClass(this.styles.error + " " + this.styles.notice + " " + this.styles.success + " " + this.styles.info).addClass("error" === this.options.type ? this.styles.error : "info" === this.options.type ? this.styles.info : "success" === this.options.type ? this.styles.success : this.styles.notice);
            if (this.options.icon !== a.icon || !0 === this.options.icon && this.options.type !== a.type) this.container.find("div.ui-pnotify-icon").remove(), !1 !== this.options.icon &&
                c("<div />", {
                    "class": "ui-pnotify-icon"
                }).append(c("<span />", {
                    "class": !0 === this.options.icon ? "error" === this.options.type ? this.styles.error_icon : "info" === this.options.type ? this.styles.info_icon : "success" === this.options.type ? this.styles.success_icon : this.styles.notice_icon : this.options.icon
                })).prependTo(this.container);
            this.options.width !== a.width && this.elem.animate({
                width: this.options.width
            });
            this.options.min_height !== a.min_height && this.container.animate({
                minHeight: this.options.min_height
            });
            this.options.opacity !==
                a.opacity && this.elem.fadeTo(this.options.animate_speed, this.options.opacity);
            this.options.hide ? a.hide || this.queueRemove() : this.cancelRemove();
            this.queuePosition(!0);
            this.runModules("update", a);
            return this
        },
        open: function() {
            this.state = "opening";
            this.runModules("beforeOpen");
            var b = this;
            this.elem.parent().length || this.elem.appendTo(this.options.stack.context ? this.options.stack.context : g);
            "top" !== this.options.stack.push && this.position(!0);
            "fade" === this.options.animation || "fade" === this.options.animation.effect_in ?
                this.elem.show().fadeTo(0, 0).hide() : 1 !== this.options.opacity && this.elem.show().fadeTo(0, this.options.opacity).hide();
            this.animateIn(function() {
                b.queuePosition(!0);
                b.options.hide && b.queueRemove();
                b.state = "open";
                b.runModules("afterOpen")
            });
            return this
        },
        remove: function(b) {
            this.state = "closing";
            this.timerHide = !!b;
            this.runModules("beforeClose");
            var a = this;
            this.timer && (window.clearTimeout(this.timer), this.timer = null);
            this.animateOut(function() {
                a.state = "closed";
                a.runModules("afterClose");
                a.queuePosition(!0);
                a.options.remove && a.elem.detach();
                a.runModules("beforeDestroy");
                if (a.options.destroy && null !== PNotify.notices) {
                    var b = c.inArray(a, PNotify.notices); - 1 !== b && PNotify.notices.splice(b, 1)
                }
                a.runModules("afterDestroy")
            });
            return this
        },
        get: function() {
            return this.elem
        },
        parseOptions: function(b, a) {
            this.options = c.extend(!0, {}, PNotify.prototype.options);
            this.options.stack = PNotify.prototype.options.stack;
            var n = [b, a],
                e, f;
            for (f in n) {
                e = n[f];
                if ("undefined" == typeof e) break;
                if ("object" !== typeof e) this.options.text = e;
                else
                    for (var d in e) this.modules[d] ?
                        c.extend(!0, this.options[d], e[d]) : this.options[d] = e[d]
            }
        },
        animateIn: function(b) {
            this.animating = "in";
            var a;
            a = "undefined" !== typeof this.options.animation.effect_in ? this.options.animation.effect_in : this.options.animation;
            "none" === a ? (this.elem.show(), b()) : "show" === a ? this.elem.show(this.options.animate_speed, b) : "fade" === a ? this.elem.show().fadeTo(this.options.animate_speed, this.options.opacity, b) : "slide" === a ? this.elem.slideDown(this.options.animate_speed, b) : "function" === typeof a ? a("in", b, this.elem) : this.elem.show(a,
                "object" === typeof this.options.animation.options_in ? this.options.animation.options_in : {}, this.options.animate_speed, b);
            this.elem.parent().hasClass("ui-effects-wrapper") && this.elem.parent().css({
                position: "fixed",
                overflow: "visible"
            });
            "slide" !== a && this.elem.css("overflow", "visible");
            this.container.css("overflow", "hidden")
        },
        animateOut: function(b) {
            this.animating = "out";
            var a;
            a = "undefined" !== typeof this.options.animation.effect_out ? this.options.animation.effect_out : this.options.animation;
            "none" === a ? (this.elem.hide(),
                b()) : "show" === a ? this.elem.hide(this.options.animate_speed, b) : "fade" === a ? this.elem.fadeOut(this.options.animate_speed, b) : "slide" === a ? this.elem.slideUp(this.options.animate_speed, b) : "function" === typeof a ? a("out", b, this.elem) : this.elem.hide(a, "object" === typeof this.options.animation.options_out ? this.options.animation.options_out : {}, this.options.animate_speed, b);
            this.elem.parent().hasClass("ui-effects-wrapper") && this.elem.parent().css({
                position: "fixed",
                overflow: "visible"
            });
            "slide" !== a && this.elem.css("overflow",
                "visible");
            this.container.css("overflow", "hidden")
        },
        position: function(b) {
            var a = this.options.stack,
                c = this.elem;
            c.parent().hasClass("ui-effects-wrapper") && (c = this.elem.css({
                left: "0",
                top: "0",
                right: "0",
                bottom: "0"
            }).parent());
            "undefined" === typeof a.context && (a.context = g);
            if (a) {
                "number" !== typeof a.nextpos1 && (a.nextpos1 = a.firstpos1);
                "number" !== typeof a.nextpos2 && (a.nextpos2 = a.firstpos2);
                "number" !== typeof a.addpos2 && (a.addpos2 = 0);
                var e = "none" === c.css("display");
                if (!e || b) {
                    var f, d = {},
                        k;
                    switch (a.dir1) {
                        case "down":
                            k =
                                "top";
                            break;
                        case "up":
                            k = "bottom";
                            break;
                        case "left":
                            k = "right";
                            break;
                        case "right":
                            k = "left"
                    }
                    b = parseInt(c.css(k).replace(/(?:\..*|[^0-9.])/g, ""));
                    isNaN(b) && (b = 0);
                    "undefined" !== typeof a.firstpos1 || e || (a.firstpos1 = b, a.nextpos1 = a.firstpos1);
                    var l;
                    switch (a.dir2) {
                        case "down":
                            l = "top";
                            break;
                        case "up":
                            l = "bottom";
                            break;
                        case "left":
                            l = "right";
                            break;
                        case "right":
                            l = "left"
                    }
                    f = parseInt(c.css(l).replace(/(?:\..*|[^0-9.])/g, ""));
                    isNaN(f) && (f = 0);
                    "undefined" !== typeof a.firstpos2 || e || (a.firstpos2 = f, a.nextpos2 = a.firstpos2);
                    if ("down" === a.dir1 && a.nextpos1 + c.height() > (a.context.is(g) ? h.height() : a.context.prop("scrollHeight")) || "up" === a.dir1 && a.nextpos1 + c.height() > (a.context.is(g) ? h.height() : a.context.prop("scrollHeight")) || "left" === a.dir1 && a.nextpos1 + c.width() > (a.context.is(g) ? h.width() : a.context.prop("scrollWidth")) || "right" === a.dir1 && a.nextpos1 + c.width() > (a.context.is(g) ? h.width() : a.context.prop("scrollWidth"))) a.nextpos1 = a.firstpos1, a.nextpos2 += a.addpos2 + ("undefined" === typeof a.spacing2 ? 25 : a.spacing2), a.addpos2 = 0;
                    if (a.animation &&
                        a.nextpos2 < f) switch (a.dir2) {
                        case "down":
                            d.top = a.nextpos2 + "px";
                            break;
                        case "up":
                            d.bottom = a.nextpos2 + "px";
                            break;
                        case "left":
                            d.right = a.nextpos2 + "px";
                            break;
                        case "right":
                            d.left = a.nextpos2 + "px"
                    } else "number" === typeof a.nextpos2 && c.css(l, a.nextpos2 + "px");
                    switch (a.dir2) {
                        case "down":
                        case "up":
                            c.outerHeight(!0) > a.addpos2 && (a.addpos2 = c.height());
                            break;
                        case "left":
                        case "right":
                            c.outerWidth(!0) > a.addpos2 && (a.addpos2 = c.width())
                    }
                    if ("number" === typeof a.nextpos1)
                        if (a.animation && (b > a.nextpos1 || d.top || d.bottom || d.right ||
                                d.left)) switch (a.dir1) {
                            case "down":
                                d.top = a.nextpos1 + "px";
                                break;
                            case "up":
                                d.bottom = a.nextpos1 + "px";
                                break;
                            case "left":
                                d.right = a.nextpos1 + "px";
                                break;
                            case "right":
                                d.left = a.nextpos1 + "px"
                        } else c.css(k, a.nextpos1 + "px");
                        (d.top || d.bottom || d.right || d.left) && c.animate(d, {
                        duration: this.options.position_animate_speed,
                        queue: !1
                    });
                    switch (a.dir1) {
                        case "down":
                        case "up":
                            a.nextpos1 += c.height() + ("undefined" === typeof a.spacing1 ? 25 : a.spacing1);
                            break;
                        case "left":
                        case "right":
                            a.nextpos1 += c.width() + ("undefined" === typeof a.spacing1 ?
                                25 : a.spacing1)
                    }
                }
                return this
            }
        },
        queuePosition: function(b, a) {
            f && clearTimeout(f);
            a || (a = 10);
            f = setTimeout(function() {
                PNotify.positionAll(b)
            }, a);
            return this
        },
        cancelRemove: function() {
            this.timer && window.clearTimeout(this.timer);
            "closing" === this.state && (this.elem.stop(!0), this.state = "open", this.animating = "in", this.elem.css("height", "auto").animate({
                width: this.options.width,
                opacity: this.options.opacity
            }, "fast"));
            return this
        },
        queueRemove: function() {
            var b = this;
            this.cancelRemove();
            this.timer = window.setTimeout(function() {
                    b.remove(!0)
                },
                isNaN(this.options.delay) ? 0 : this.options.delay);
            return this
        }
    });
    c.extend(PNotify, {
        notices: [],
        removeAll: function() {
            c.each(PNotify.notices, function() {
                this.remove && this.remove()
            })
        },
        positionAll: function(b) {
            f && clearTimeout(f);
            f = null;
            c.each(PNotify.notices, function() {
                var a = this.options.stack;
                a && (a.nextpos1 = a.firstpos1, a.nextpos2 = a.firstpos2, a.addpos2 = 0, a.animation = b)
            });
            c.each(PNotify.notices, function() {
                this.position()
            })
        },
        styling: {
            jqueryui: {
                container: "ui-widget ui-widget-content ui-corner-all",
                notice: "ui-state-highlight",
                notice_icon: "ui-icon ui-icon-info",
                info: "",
                info_icon: "ui-icon ui-icon-info",
                success: "ui-state-default",
                success_icon: "ui-icon ui-icon-circle-check",
                error: "ui-state-error",
                error_icon: "ui-icon ui-icon-alert"
            },
            bootstrap2: {
                container: "alert",
                notice: "",
                notice_icon: "icon-exclamation-sign",
                info: "alert-info",
                info_icon: "icon-info-sign",
                success: "alert-success",
                success_icon: "icon-ok-sign",
                error: "alert-error",
                error_icon: "icon-warning-sign"
            },
            bootstrap3: {
                container: "alert",
                notice: "alert-warning",
                notice_icon: "glyphicon glyphicon-exclamation-sign",
                info: "alert-info",
                info_icon: "glyphicon glyphicon-info-sign",
                success: "alert-success",
                success_icon: "glyphicon glyphicon-ok-sign",
                error: "alert-danger",
                error_icon: "glyphicon glyphicon-warning-sign"
            }
        }
    });
    PNotify.styling.fontawesome = c.extend({}, PNotify.styling.bootstrap3);
    c.extend(PNotify.styling.fontawesome, {
        notice_icon: "fa fa-exclamation-circle",
        info_icon: "fa fa-info",
        success_icon: "fa fa-check",
        error_icon: "fa fa-warning"
    });
    document.body ? m() : c(m);
    return PNotify
});
(function(c) {
    "function" === typeof define && define.amd ? define("pnotify.buttons", ["jquery", "pnotify"], c) : c(jQuery, PNotify)
})(function(c, e) {
    e.prototype.options.buttons = {
        closer: !0,
        closer_hover: !0,
        sticker: !0,
        sticker_hover: !0,
        labels: {
            close: "Close",
            stick: "Stick"
        }
    };
    e.prototype.modules.buttons = {
        myOptions: null,
        closer: null,
        sticker: null,
        init: function(a, b) {
            var d = this;
            this.myOptions = b;
            a.elem.on({
                mouseenter: function(b) {
                    !d.myOptions.sticker || a.options.nonblock && a.options.nonblock.nonblock || d.sticker.trigger("pnotify_icon").css("visibility",
                        "visible");
                    !d.myOptions.closer || a.options.nonblock && a.options.nonblock.nonblock || d.closer.css("visibility", "visible")
                },
                mouseleave: function(a) {
                    d.myOptions.sticker_hover && d.sticker.css("visibility", "hidden");
                    d.myOptions.closer_hover && d.closer.css("visibility", "hidden")
                }
            });
            this.sticker = c("<div />", {
                "class": "ui-pnotify-sticker",
                css: {
                    cursor: "pointer",
                    visibility: b.sticker_hover ? "hidden" : "visible"
                },
                click: function() {
                    a.options.hide = !a.options.hide;
                    a.options.hide ? a.queueRemove() : a.cancelRemove();
                    c(this).trigger("pnotify_icon")
                }
            }).bind("pnotify_icon",
                function() {
                    c(this).children().removeClass(a.styles.pin_up + " " + a.styles.pin_down).addClass(a.options.hide ? a.styles.pin_up : a.styles.pin_down)
                }).append(c("<span />", {
                "class": a.styles.pin_up,
                title: b.labels.stick
            })).prependTo(a.container);
            (!b.sticker || a.options.nonblock && a.options.nonblock.nonblock) && this.sticker.css("display", "none");
            this.closer = c("<div />", {
                "class": "ui-pnotify-closer",
                css: {
                    cursor: "pointer",
                    visibility: b.closer_hover ? "hidden" : "visible"
                },
                click: function() {
                    a.remove(!1);
                    d.sticker.css("visibility",
                        "hidden");
                    d.closer.css("visibility", "hidden")
                }
            }).append(c("<span />", {
                "class": a.styles.closer,
                title: b.labels.close
            })).prependTo(a.container);
            (!b.closer || a.options.nonblock && a.options.nonblock.nonblock) && this.closer.css("display", "none")
        },
        update: function(a, b) {
            this.myOptions = b;
            !b.closer || a.options.nonblock && a.options.nonblock.nonblock ? this.closer.css("display", "none") : b.closer && this.closer.css("display", "block");
            !b.sticker || a.options.nonblock && a.options.nonblock.nonblock ? this.sticker.css("display",
                "none") : b.sticker && this.sticker.css("display", "block");
            this.sticker.trigger("pnotify_icon");
            b.sticker_hover ? this.sticker.css("visibility", "hidden") : a.options.nonblock && a.options.nonblock.nonblock || this.sticker.css("visibility", "visible");
            b.closer_hover ? this.closer.css("visibility", "hidden") : a.options.nonblock && a.options.nonblock.nonblock || this.closer.css("visibility", "visible")
        }
    };
    c.extend(e.styling.jqueryui, {
        closer: "ui-icon ui-icon-close",
        pin_up: "ui-icon ui-icon-pin-w",
        pin_down: "ui-icon ui-icon-pin-s"
    });
    c.extend(e.styling.bootstrap2, {
        closer: "icon-remove",
        pin_up: "icon-pause",
        pin_down: "icon-play"
    });
    c.extend(e.styling.bootstrap3, {
        closer: "glyphicon glyphicon-remove",
        pin_up: "glyphicon glyphicon-pause",
        pin_down: "glyphicon glyphicon-play"
    });
    c.extend(e.styling.fontawesome, {
        closer: "fa fa-times",
        pin_up: "fa fa-pause",
        pin_down: "fa fa-play"
    })
});
(function(d) {
    "function" === typeof define && define.amd ? define("pnotify.confirm", ["jquery", "pnotify"], d) : d(jQuery, PNotify)
})(function(d, e) {
    e.prototype.options.confirm = {
        confirm: !1,
        prompt: !1,
        prompt_class: "",
        prompt_default: "",
        prompt_multi_line: !1,
        align: "right",
        buttons: [{
            text: "Ok",
            addClass: "",
            promptTrigger: !0,
            click: function(b, a) {
                b.remove();
                b.get().trigger("pnotify.confirm", [b, a])
            }
        }, {
            text: "Cancel",
            addClass: "",
            click: function(b) {
                b.remove();
                b.get().trigger("pnotify.cancel", b)
            }
        }]
    };
    e.prototype.modules.confirm = {
        container: null,
        prompt: null,
        init: function(b, a) {
            this.container = d('<div style="margin-top:5px;clear:both;" />').css("text-align", a.align).appendTo(b.container);
            a.confirm || a.prompt ? this.makeDialog(b, a) : this.container.hide()
        },
        update: function(b, a) {
            a.confirm ? (this.makeDialog(b, a), this.container.show()) : this.container.hide().empty()
        },
        afterOpen: function(b, a) {
            a.prompt && this.prompt.focus()
        },
        makeDialog: function(b, a) {
            var e = !1,
                h = this,
                f, c;
            this.container.empty();
            a.prompt && (this.prompt = d("<" + (a.prompt_multi_line ?
                'textarea rows="5"' : 'input type="text"') + ' style="margin-bottom:5px;clear:both;" />').addClass(b.styles.input + " " + a.prompt_class).val(a.prompt_default).appendTo(this.container));
            for (var k in a.buttons) {
                f = a.buttons[k];
                e ? this.container.append(" ") : e = !0;
                c = d('<button type="button" />').addClass(b.styles.btn + " " + f.addClass).text(f.text).appendTo(this.container).on("click", function(g) {
                    return function() {
                        "function" == typeof g.click && g.click(b, a.prompt ? h.prompt.val() : null)
                    }
                }(f));
                a.prompt && !a.prompt_multi_line &&
                    f.promptTrigger && this.prompt.keypress(function(b) {
                        return function(a) {
                            13 == a.keyCode && b.click()
                        }
                    }(c));
                b.styles.text && c.wrapInner('<span class="' + b.styles.text + '"></span>');
                b.styles.btnhover && c.hover(function(a) {
                    return function() {
                        a.addClass(b.styles.btnhover)
                    }
                }(c), function(a) {
                    return function() {
                        a.removeClass(b.styles.btnhover)
                    }
                }(c));
                if (b.styles.btnactive) c.on("mousedown", function(a) {
                    return function() {
                        a.addClass(b.styles.btnactive)
                    }
                }(c)).on("mouseup", function(a) {
                    return function() {
                        a.removeClass(b.styles.btnactive)
                    }
                }(c));
                if (b.styles.btnfocus) c.on("focus", function(a) {
                    return function() {
                        a.addClass(b.styles.btnfocus)
                    }
                }(c)).on("blur", function(a) {
                    return function() {
                        a.removeClass(b.styles.btnfocus)
                    }
                }(c))
            }
        }
    };
    d.extend(e.styling.jqueryui, {
        btn: "ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only",
        btnhover: "ui-state-hover",
        btnactive: "ui-state-active",
        btnfocus: "ui-state-focus",
        input: "",
        text: "ui-button-text"
    });
    d.extend(e.styling.bootstrap2, {
        btn: "btn",
        input: ""
    });
    d.extend(e.styling.bootstrap3, {
        btn: "btn btn-default",
        input: "form-control"
    });
    d.extend(e.styling.fontawesome, {
        btn: "btn btn-default",
        input: "form-control"
    })
});
(function(e) {
    "function" === typeof define && define.amd ? define("pnotify.desktop", ["jquery", "pnotify"], e) : e(jQuery, PNotify)
})(function(e, d) {
    var c, f = function(a, b) {
        f = "Notification" in window ? function(a, b) {
            return new Notification(a, b)
        } : "mozNotification" in navigator ? function(a, b) {
            return navigator.mozNotification.createNotification(a, b.body, b.icon).show()
        } : "webkitNotifications" in window ? function(a, b) {
            return window.webkitNotifications.createNotification(b.icon, a, b.body)
        } : function(a, b) {
            return null
        };
        return f(a,
            b)
    };
    d.prototype.options.desktop = {
        desktop: !1,
        icon: null,
        tag: null
    };
    d.prototype.modules.desktop = {
        tag: null,
        icon: null,
        genNotice: function(a, b) {
            this.icon = null === b.icon ? "http://sciactive.com/pnotify/includes/desktop/" + a.options.type + ".png" : !1 === b.icon ? null : b.icon;
            if (null === this.tag || null !== b.tag) this.tag = null === b.tag ? "PNotify-" + Math.round(1E6 * Math.random()) : b.tag;
            a.desktop = f(a.options.title, {
                icon: this.icon,
                body: a.options.text,
                tag: this.tag
            });
            "close" in a.desktop || (a.desktop.close = function() {
                a.desktop.cancel()
            });
            a.desktop.onclick = function() {
                a.elem.trigger("click")
            };
            a.desktop.onclose = function() {
                "closing" !== a.state && "closed" !== a.state && a.remove()
            }
        },
        init: function(a, b) {
            b.desktop && (c = d.desktop.checkPermission(), 0 == c && this.genNotice(a, b))
        },
        update: function(a, b, d) {
            0 == c && b.desktop && this.genNotice(a, b)
        },
        beforeOpen: function(a, b) {
            0 == c && b.desktop && a.elem.css({
                left: "-10000px",
                display: "none"
            })
        },
        afterOpen: function(a, b) {
            0 == c && b.desktop && (a.elem.css({
                left: "-10000px",
                display: "none"
            }), "show" in a.desktop && a.desktop.show())
        },
        beforeClose: function(a, b) {
            0 == c && b.desktop && a.elem.css({
                left: "-10000px",
                display: "none"
            })
        },
        afterClose: function(a, b) {
            0 == c && b.desktop && (a.elem.css({
                left: "-10000px",
                display: "none"
            }), a.desktop.close())
        }
    };
    d.desktop = {
        permission: function() {
            "undefined" !== typeof Notification && "requestPermission" in Notification ? Notification.requestPermission() : "webkitNotifications" in window && window.webkitNotifications.requestPermission()
        },
        checkPermission: function() {
            return "undefined" !== typeof Notification && "permission" in Notification ?
                "granted" == Notification.permission ? 0 : 1 : "webkitNotifications" in window ? window.webkitNotifications.checkPermission() : 1
        }
    };
    c = d.desktop.checkPermission()
});