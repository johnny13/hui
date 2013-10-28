! function (a) {
    a.fn.viewSwitch = function (b) {
        function f() {
			console.debug("f");
            for (var b = e.length, c = 0; b > c; c++) a(".short-desc", e[c]).removeClass(
                "fadeInDown").hide(), e[c].delay(100 * c).animate({
                width: "100%"
            }, 600, function () {
                a(".short-desc", a(this)).hide(), Modernizr.csstransitions ?
                    a(".long-desc", a(this)).css("opacity", 0).show().addClass(
                        "animated fadeInLeft") : a(".long-desc", a(this)).css(
                        "opacity", 0).show().delay(100 * a(this).data(
                        "index")).animate({
                        opacity: 1
                    }, 200)
            })
        }

        function g() {
            console.debug("g");
			for (var b = e.length, c = 0; b > c; c++) a(".long-desc", e[c]).removeClass(
                "fadeInLeft").hide(), e[c].animate({
                width: 230
            }, 300, function () {
                a(".long-desc", a(this)).hide(), Modernizr.csstransitions ?
                    a(".short-desc", a(this)).css("opacity", 0).show().addClass(
                        "animate" + a(this).data("index") + " fadeInDown") :
                    a(".short-desc", a(this)).css("opacity", 0).show().delay(
                        100 * a(this).data("index")).animate({
                        opacity: 1
                    }, 200)
            })
        }
        var c = {
            hoverEffect: !0,
            thumbContainer: ".thumb-container"
        };

        b && a.extend(c, b);
        var d = this,
            e = [];

        return d.find(c.thumbContainer).each(function (b) {
            e[b] = a(this).data("index", b), c.hoverEffect && a(this).on(
                "mouseover", function () {
                    a(this).addClass("animated pulse")
                }).on("mouseleave", function () {
                a(this).removeClass("pulse")
            })
        }), a("#grid-btn").on("click", function (b) {
            a("#list-btn").removeClass("active"), a(this).addClass("active"),
                b.preventDefault(), g()
        }), a("#list-btn").on("click", function (b) {
            a("#grid-btn").removeClass("active"), a(this).addClass("active"),
                b.preventDefault(), f()
        }), this
    }
}(jQuery);