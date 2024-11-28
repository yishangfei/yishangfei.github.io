! function(t) {
    function e() {
        !t(".rustrot-menu-clone-wrap").length && t(".rustrot-clone-mobile-menu").length > 0 && t("body").prepend('<div class="rustrot-menu-clone-wrap"><div class="rustrot-menu-panels-actions-wrap">' + jQuery(".header-logo").html() + '<a class="rustrot-menu-close-btn rustrot-menu-close-panels" href="#">x</a></div><div class="rustrot-menu-panels"></div></div>');
        Array();
        t(".rustrot-menu-clone-wrap .rustrot-menu-panels #rustrot-menu-panel-main").length || t(".rustrot-menu-clone-wrap .rustrot-menu-panels").append('<div id="rustrot-menu-panel-main" class="rustrot-menu-panel rustrot-menu-panel-main"><ul class="depth-01"></ul></div>'), t(".rustrot-clone-mobile-menu").each(function() {
            var e = t(this),
                s = e.attr("id");
            if (!t("#" + ("rustrot-menu-clone-" + s)).length) {
                var a = e.clone(!0);
                a.find(".menu-item").addClass("clone-menu-item"), a.find("[id]").each(function() { a.find('.vc_tta-panel-heading a[href="#' + t(this).attr("id") + '"]').attr("href", "#" + r(t(this).attr("id"), "rustrot-menu-clone-")), a.find('.rustrot-menu-tabs .tabs-link a[href="#' + t(this).attr("id") + '"]').attr("href", "#" + r(t(this).attr("id"), "rustrot-menu-clone-")), t(this).attr("id", r(t(this).attr("id"), "rustrot-menu-clone-")) }), a.find(".rustrot-menu-menu").addClass("rustrot-menu-menu-clone");
                var n = t(".rustrot-menu-clone-wrap .rustrot-menu-panels #rustrot-menu-panel-main ul");
                n.append(a.html()),
                    function e(r, s) {
                        r.find(".menu-item-has-children").length && r.find(".menu-item-has-children").each(function() {
                            var r = t(this);
                            e(r, s);
                            for (var a = "rustrot-menu-panel-" + s; t("#" + a).length;) a = "rustrot-menu-panel-" + ++s;
                            r.prepend('<a class="rustrot-menu-next-panel" href="#' + a + '" data-target="#' + a + '"></a>');
                            var n = t("<div>").append(r.find("> .submenu").clone()).html();
                            r.find("> .submenu").remove(), t(".rustrot-menu-clone-wrap .rustrot-menu-panels").append('<div id="' + a + '" class="rustrot-menu-panel rustrot-menu-sub-panel rustrot-menu-hidden">' + n + "</div>")
                        })
                    }(n, 0)
            }
        })
    }

    function r(t, e) { return e + t }
    t(document).ready(function() {
        t(document).on("click", ".menu-toggle", function() { return t(".rustrot-menu-clone-wrap").addClass("open"), !1 }), t(document).on("click", ".rustrot-menu-clone-wrap .rustrot-menu-close-panels", function() { return t(".rustrot-menu-clone-wrap").removeClass("open"), !1 }), t(document).on("click", function(e) { e.offsetX > t(".rustrot-menu-clone-wrap").width() && t(".rustrot-menu-clone-wrap").removeClass("open") }), t(document).on("click", ".rustrot-menu-next-panel", function(e) {
            t(".rustrot-menu-clone-wrap").addClass("show-sub");
            var r = t(this),
                s = r.closest(".menu-item"),
                a = r.closest(".rustrot-menu-panel"),
                n = r.attr("href");
            if (t(n).length) {
                a.addClass("rustrot-menu-sub-opened"), t(n).addClass("rustrot-menu-panel-opened").removeClass("rustrot-menu-hidden").attr("data-parent-panel", a.attr("id"));
                var o = s.find(".rustrot-menu-item-title").attr("title"),
                    i = "";
                t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-current-panel-title").length > 0 && (i = t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-current-panel-title").html()), void 0 !== o && 0 != typeof o ? t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-current-panel-title").html(o) : t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-current-panel-title").remove(), t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-prev-panel").remove(), t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened").prepend('<a data-prenttitle="' + i + '" class="rustrot-menu-prev-panel" href="#' + a.attr("id") + '" data-cur-panel="' + n + '" data-target="#' + a.attr("id") + '"> ' + o + "</a>")
            }
            e.preventDefault()
        }), t(document).on("click", ".rustrot-menu-prev-panel", function(e) {
            t(".rustrot-menu-clone-wrap").removeClass("show-sub");
            var r = t(this),
                s = r.attr("data-cur-panel"),
                a = r.attr("href");
            t(s).removeClass("rustrot-menu-panel-opened").addClass("rustrot-menu-hidden"), t(a).addClass("rustrot-menu-panel-opened").removeClass("rustrot-menu-sub-opened");
            var n = t(a).attr("data-parent-panel");
            if (void 0 === n || 0 == typeof n) t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-prev-panel").remove(), t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-current-panel-title").remove();
            else {
                t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-prev-panel").attr("href", "#" + n).attr("data-cur-panel", a).attr("data-target", "#" + n);
                var o = t("#" + n).find('.rustrot-menu-next-panel[data-target="' + a + '"]').closest(".menu-item").find(".rustrot-menu-item-title").attr("data-title");
                void 0 !== (o = t(this).data("prenttitle")) && 0 != typeof o ? t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-current-panel-title").html(o) : t(".rustrot-menu-sub-panel.rustrot-menu-panel-opened .rustrot-menu-current-panel-title").remove()
            }
            e.preventDefault()
        })
    }), t(window).load(function() { e() })
}(jQuery), jQuery, jQuery(function(t) {
    "use strict";
    t("body").on("init", ".rustrot-tabs-wrapper, .rustrot-tabs", function() {
        t(".rustrot-tab, .rustrot-tabs .panel:not(.panel .panel)").hide();
        var e = window.location.hash,
            r = window.location.href,
            s = t(this).find(".rustrot-tabs, ul.tabs").first();
        0 <= e.toLowerCase().indexOf("comment-") || "#reviews" === e || "#tab-reviews" === e || 0 < r.indexOf("comment-page-") || 0 < r.indexOf("cpage=") ? s.find("li.reviews_tab a").click() : "#tab-additional_information" === e ? s.find("li.additional_information_tab a").click() : s.find("li:first a").click()
    }).on("click", ".rustrot-tabs li a, ul.tabs li a", function(e) {
        e.preventDefault();
        var r = t(this),
            s = r.closest(".rustrot-tabs-wrapper, .rustrot-tabs");
        s.find(".rustrot-tabs, ul.tabs").find("li").removeClass("active"), s.find(".rustrot-tab, .panel:not(.panel .panel)").hide(), r.closest("li").addClass("active"), s.find(r.attr("href")).show()
    }).on("click", "a.rustrot-review-link", function() { return t(".reviews_tab a").click(), !0 }), t(".rustrot-tabs-wrapper, .rustrot-tabs").trigger("init"), 0 < t(".flex-control-nav, .rustrot-product-gallery__wrapper").length && (t(".rustrot-product-gallery__wrapper").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !1, draggable: !1, fade: !0, asNavFor: ".flex-control-nav" }), t(".flex-control-nav").slick({ vertical: !0, slidesToShow: 3, slidesToScroll: 1, asNavFor: ".rustrot-product-gallery__wrapper", dots: !1, arrows: !0, prevArrow: '<span class="fa fa-angle-up prev"></span>', nextArrow: '<span class="fa fa-angle-down next"></span>', focusOnSelect: !0, slidesMargin: 14, responsive: [{ breakpoint: 992, settings: { vertical: !1, slidesToShow: 3, prevArrow: '<span class="fa fa-angle-left prev"></span>', nextArrow: '<span class="fa fa-angle-right next"></span>' } }] })), t(document).ready(function() {
        t(document).on("click", ".comment-form-rating p.stars a", function() {
            var e = t(this),
                r = t(this).closest("#star-rating").find("#rating"),
                s = t(this).closest(".stars");
            return r.val(e.text()), e.siblings("a").removeClass("active"), e.addClass("active"), s.addClass("selected"), !1
        }), t(".rustrot-product-gallery .rustrot-product-gallery__image").zoom()
    }), $(".price_slider").each(function() {
        var t = $(this).data("min"),
            e = $(this).data("max"),
            r = $(this).data("unit"),
            s = $(this).data("value-min"),
            a = $(this).data("value-max"),
            n = $(this);
        $(this).slider({
            range: !0,
            min: t,
            max: e,
            values: [s, a],
            slide: function(t, e) {
                var s = '<button type="submit" class="button">Filter</button><div class="price_label">Price: <span class="from">' + r + e.values[0] + ' </span> — <span class="to">' + r + e.values[1] + "</span></div>";
                n.closest(".price_slider_wrapper").find(".price_slider_amount").html(s)
            }
        })
    }), $(document).on("click", function(t) {
        var e = $(t.target).closest(".rustrot-dropdown"),
            r = $(".rustrot-dropdown");
        0 < e.length ? (r.not(e).removeClass("open"), ($(t.target).is('[data-rustrot="rustrot-dropdown"]') || 0 < $(t.target).closest('[data-rustrot="rustrot-dropdown"]').length) && (e.toggleClass("open"), t.preventDefault())) : $(".rustrot-dropdown").removeClass("open")
    }), $(document).on("click", ".rustrot-tabs .tab-link a, .rustrot-accordion .panel-heading a", function(t) {
        t.preventDefault();
        var e = $(this),
            r = e.data("id"),
            s = e.attr("href"),
            a = e.data("ajax"),
            n = e.data("section"),
            o = (e.data("animate"), e.closest(".tab-link,.rustrot-accordion").find("a.loaded").attr("href"));
        1 != a || e.hasClass("loaded") ? (e.parent().addClass("active").siblings().removeClass("active"), $(s).addClass("active").siblings().removeClass("active"), e.closest(".panel-default").addClass("active").siblings().removeClass("active"), e.closest(".rustrot-accordion").find(s).slideDown(400), e.closest(".rustrot-accordion").find(".panel-collapse").not(s).slideUp(400)) : ($(s).closest(".tab-container,.rustrot-accordion").addClass("loading"), e.parent().addClass("active").siblings().removeClass("active"), $.ajax({ type: "POST", url: rustrot_ajax_frontend.ajaxurl, data: { action: "rustrot_ajax_tabs", security: rustrot_ajax_frontend.security, id: r, section_id: n }, success: function(t) { "ok" == t.success ? ($(s).html($(t.html).find(".az_tta-panel-body").html()), $(s).closest(".tab-container,.rustrot-accordion").removeClass("loading"), $('[href="' + o + '"]').removeClass("loaded"), rustrot_countdown($(s).find(".rustrot-countdown")), rustrot_init_carousel($(s).find(".owl-slick")), 0 < $(".owl-slick .product-item").length && rustrot_hover_product_item($(s).find(".owl-slick .row-item,.owl-slick .product-item.style-1,.owl-slick .product-item.style-2,.owl-slick .product-item.style-3,.owl-slick .product-item.style-4")), 0 < $(s).find(".variations_form").length && $(s).find(".variations_form").each(function() { $(this).wc_variation_form() }), $(s).trigger("rustrot_ajax_tabs_complete"), e.addClass("loaded"), $(o).html("")) : ($(s).closest(".tab-container,.rustrot-accordion").removeClass("loading"), $(s).html("<strong>Error: Can not Load Data ...</strong>")), e.closest(".panel-default").addClass("active").siblings().removeClass("active"), e.closest(".rustrot-accordion").find(s).slideDown(400), e.closest(".rustrot-accordion").find(".panel-collapse").not(s).slideUp(400) }, complete: function() { $(s).addClass("active").siblings().removeClass("active"), setTimeout(function(t) {}, 10) } }))
    }), $(document).on("click", "a.backtotop", function(t) { $("html, body").animate({ scrollTop: 0 }, 800), t.preventDefault() }), $(document).on("scroll", function() { 200 < $(window).scrollTop() ? $(".backtotop").addClass("active") : $(".backtotop").removeClass("active") }), $(document).on("click", ".quantity .quantity-plus", function(t) {
        var e = $(this).closest(".quantity").find("input.qty"),
            r = parseInt(e.val()),
            s = parseInt(e.attr("max"));
        r += parseInt(e.data("step")), s && s < r && (r = s), e.val(r), e.trigger("change"), t.preventDefault()
    }), $(document).on("change", function() {
        $(".quantity").each(function() {
            var t = $(this).find("input.qty"),
                e = t.val();
            parseInt(t.attr("max")) < e ? $(this).find(".quantity-plus").css("pointer-events", "none") : $(this).find(".quantity-plus").css("pointer-events", "auto")
        })
    }), $(document).on("click", ".quantity .quantity-minus", function(t) {
        var e = $(this).closest(".quantity").find("input.qty"),
            r = parseInt(e.val()),
            s = parseInt(e.attr("min"));
        r -= parseInt(e.data("step")), s && r < s && (r = s), !s && r < 0 && (r = 0), e.val(r), e.trigger("change"), t.preventDefault()
    })
}), jQuery(function(t) {
    "use strict";
    window.addEventListener("load", function(e) {
        var r, s, a, n;
        r = t(".rustrot-mapper"), s = t(".rustrot-pin"), a = r.data("width"), n = r.data("height"), s.each(function() {
                var e = t(this).data("top"),
                    r = t(this).data("left");
                e.substr && "%" != e.substr(-1) && (e = e / n * 100 + "px"), r.substr && "%" != r.substr(-1) && (r = r / a * 100 + "px"), t(this).css({ top: e, left: r })
            }),
            function() {
                var e = t(".rustrot-pin .action-pin");
                e.on("click", function() {
                    var e = t(this),
                        r = e.siblings(".rustrot-popup");
                    if (r.length) {
                        var s = e.closest(".rustrot-pin");
                        if (s.hasClass("actived")) return s.removeClass("actived"), void setTimeout(function() { r.removeAttr("style") }, 300);
                        var a = s.data("position");
                        r.css({ transition: "none", width: "", left: "" }), setTimeout(function() { r.css({ transition: "" }) }), r.removeClass("remove-redirect right left top bottom"), r.addClass(a);
                        var n = e[0].getBoundingClientRect(),
                            o = (r[0].getBoundingClientRect(), r.width()),
                            i = r.height(),
                            l = t(window).width(),
                            u = !1;
                        if (l < o) r.removeClass("right left top").addClass("bottom"), r.width(l), u = !0;
                        else switch (a) {
                            case "right":
                                l - (n.right + o + 8) < 0 && (o > n.right ? (r.removeClass("right").addClass("bottom"), u = !1) : r.removeClass("right").addClass("left"));
                                break;
                            case "left":
                                n.left - o + 8 < 0 && (o > n.right ? (r.removeClass("left").addClass("bottom"), u = !1) : r.removeClass("left").addClass("right"));
                                break;
                            case "top":
                                parseInt(s.css("top")) < i && r.removeClass("top").addClass("bottom");
                                break;
                            case "bottom":
                                parseInt(s.css("bottom")) < i && r.removeClass("bottom").addClass("top")
                        }
                        if (r.hasClass("top") || r.hasClass("bottom")) {
                            r.css("left", 0);
                            var c = r.offset();
                            if (c.left <= 0) r.css({ left: -c.left }), r.addClass("remove-redirect");
                            else {
                                if (u) var d = c.left + l;
                                else d = c.left + o;
                                if (l < d) {
                                    var p = l - d;
                                    r.css({ left: p }), r.addClass("remove-redirect")
                                } else r.css("left", "")
                            }
                        }
                        if (t(".content-text").css({ "max-height": o - 80 + "px", overflow: "auto" }), t(".rustrot-mapper .rustrot-pin .rustrot-popup-header h2").css("max-width", o - 10), r.hasClass("rustrot-image")) {
                            var m = r.find(".rustrot-popup-header").outerHeight(!0);
                            r.find(".rustrot-popup-main").css("height", i - m)
                        }
                        setTimeout(function() { t(".rustrot-mapper .rustrot-pin.actived").removeClass("actived"), s.addClass("actived") }, 300)
                    }
                }), t(".rustrot-pin .close-modal").on("click", function() {
                    var e = t(this).closest(".rustrot-pin"),
                        r = e.find(".rustrot-popup");
                    e.removeClass("actived"), setTimeout(function() { r.removeAttr("style") }, 300)
                });
                var r = "blur(2px)",
                    s = "grayscale(100%)";
                e.hover(function() {
                    var e = t(this);
                    e.closest(".blur").children("img").css("filter", r).css("webkitFilter", r).css("mozFilter", r).css("oFilter", r).css("msFilter", r), e.closest(".gray").children("img").css("filter", s).css("webkitFilter", s).css("mozFilter", s).css("oFilter", s).css("msFilter", s), e.closest(".mask").children(".mask").css("opacity", 1)
                }, function() {
                    var e = t(this);
                    e.closest(".rustrot-mapper").children("img").removeAttr("style"), e.closest(".mask").children(".mask").removeAttr("style")
                })
            }()
    }, !1)
});
var progressPath = document.querySelector(".progress-wrap path"),
    pathLength = progressPath.getTotalLength();
progressPath.style.transition = progressPath.style.WebkitTransition = "none", progressPath.style.strokeDasharray = pathLength + " " + pathLength, progressPath.style.strokeDashoffset = pathLength, progressPath.getBoundingClientRect(), progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
var updateProgress = function() {
    var t = $(window).scrollTop(),
        e = $(document).height() - $(window).height(),
        r = pathLength - t * pathLength / e;
    progressPath.style.strokeDashoffset = r
};
updateProgress(), $(window).scroll(updateProgress);
var offset = 50,
    duration = 550;
jQuery(window).on("scroll", function() { jQuery(this).scrollTop() > offset ? jQuery(".progress-wrap").addClass("active-progress") : jQuery(".progress-wrap").removeClass("active-progress") }), jQuery(".progress-wrap").on("click", function(t) { return t.preventDefault(), jQuery("html, body").animate({ scrollTop: 0 }, duration), !1 });