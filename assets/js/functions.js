(function ($) {
    "use strict";
    var $body = $('body'),
        has_rtl = $body.hasClass('rtl');

    $(document).on('click', '.box-header-nav .main-menu .item-megamenu .toggle-submenu', function (e) {
        var $this = $(this);
        var $thisParent = $this.closest('.item-megamenu');
        if ($thisParent.length) {
            $thisParent.toggleClass('show-submenu');
        }
        e.preventDefault();
        return false;
    });

    function rustrot_parallax() {
        $('.parallax-home').jarallax({
            speed: 0.2
        });
    }

    function rustrot_accordion() {
        $('.rustrot-accordion .item:not(.open) .desc').css('display', 'none');
        $(document).on('click', '.rustrot-accordion .item .title', function () {
            $(this).siblings('.desc').slideToggle();
            $(this).parent('.item').toggleClass('open');
        });
    }

    function rustrot_form() {
        $('.showbtn').on('click', function (e) {
            $(this).parents('.rustrot-form-toggle').siblings('.rustrot-form-show').slideToggle();
            e.preventDefault();
        });
    }

    function rustrot_view_mode_sidebar() {
        $('.has-sidebar .grid-view-mode .modes-mode').on('click', function (e) {
            var $this = $(this);
            if ($this.hasClass('active')) {
                return false;
            }
            if ($this.hasClass('mode-grid')) {
                $('.product-item').addClass('col-bg-4 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-ts-6 style-01').removeClass('col-md-12 list');
            }
            else {
                $('.product-item').removeClass('col-bg-4 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-ts-6 style-01').addClass('col-md-12 list');
            }
            $('.has-sidebar .grid-view-mode .modes-mode').removeClass('active');
            $this.addClass('active');
            e.preventDefault();
        });
    }

    function rustrot_view_mode_nosidebar() {
        $('.no-sidebar .grid-view-mode .modes-mode').on('click', function (e) {
            var $this = $(this);
            if ($this.hasClass('active')) {
                return false;
            }
            if ($this.hasClass('mode-grid')) {
                $('.product-item').addClass('col-bg-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-ts-6 style-01').removeClass('list');
            }
            else {
                $('.product-item').removeClass('col-bg-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-ts-6 style-01').addClass('col-md-12 list');
            }

            $('.no-sidebar .grid-view-mode .modes-mode').removeClass('active');
            $this.addClass('active');

            e.preventDefault();
        });
    }

    function rustrot_video() {
        $('.buttonvideo').simpleLightboxVideo();
    }

    function rustrot_title_tooltip() {
        $(".rustrot-tooltip").mousemove(function (event) {
            var relX = event.pageX - $(this).offset().left - $(this).children('.rustrot-tooltip-inner').outerWidth() / 2;
            var relY = event.pageY - $(this).offset().top - $(this).children('.rustrot-tooltip-inner').outerHeight() - 5;
            $(this).children('.rustrot-tooltip-inner').css({"top": relY, "left": relX});
        });
    }
    function rustrot_header_sticky($elem) {
        var $this = $elem;
        $this.on('rustrot_header_sticky', function () {
            $this.each(function () {
                var previousScroll = 0,
                    header = $(this).closest('.header'),
                    header_wrap_stick = $(this),
                    header_position = $(this).find('.header-position'),
                    headerOrgOffset = header_position.offset().top;
                header_wrap_stick.css('height', header_wrap_stick.outerHeight());
                $(document).on('scroll', function (ev) {
                    var currentScroll = $(this).scrollTop();
                    if (currentScroll > headerOrgOffset) {
                        header_position.addClass('fixed');
                    } else {
                        header_position.removeClass('fixed');
                    }
                    previousScroll = currentScroll;
                });

            })
        }).trigger('rustrot_header_sticky');
        $(window).on('resize', function () {
            $this.trigger('rustrot_header_sticky');
        });
    }

    function rustrot_init_carousel($elem) {
        $elem.not('.slick-initialized').each(function () {
            var _this = $(this),
                _responsive = _this.data('responsive'),
                _config = [];
            if (_this.hasClass('slick-vertical')) {
                _config.prevArrow = '<span class="fa fa-angle-up prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-down next"></span>';
            } else {
                _config.prevArrow = '<span class="fa fa-angle-left prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-right next"></span>';
            }
            _config.responsive = _responsive;

            _this.on('init', function (event, slick, direction) {
                rustrot_popover_button();
            });
            _this.slick(_config);
        });
    }

    function rustrot_countdown($elem) {
        $elem.on('rustrot_countdown', function () {
            $elem.each(function () {
                var _this = $(this),
                    _text_countdown = '';

                _this.countdown(_this.data('datetime'), function (event) {
                    _text_countdown = event.strftime(
                        '<span class="days"><span class="number">%D</span><span class="text">Days</span></span>' +
                        '<span class="hour"><span class="number">%H</span><span class="text">Hours</span></span>' +
                        '<span class="mins"><span class="number">%M</span><span class="text">Mins</span></span>' +
                        '<span class="secs"><span class="number">%S</span><span class="text">Secs</span></span>'
                    );
                    _this.html(_text_countdown);
                });
            });
        }).trigger('rustrot_countdown');
    }

    // category product
    function rustrot_category_product($elem) {
        $elem.each(function () {
            var _main = $(this);
            _main.find('.cat-parent').each(function () {
                if ($(this).hasClass('current-cat-parent')) {
                    $(this).addClass('show-sub');
                    $(this).children('.children').stop().slideDown(300);
                }
                $(this).children('.children').before('<span class="carets"></span>');
            });
            _main.children('.cat-parent').each(function () {
                var curent = $(this).find('.children');
                $(this).children('.carets').on('click', function () {
                    $(this).parent().toggleClass('show-sub');
                    $(this).parent().children('.children').stop().slideToggle(300);
                    _main.find('.children').not(curent).stop().slideUp(300);
                    _main.find('.cat-parent').not($(this).parent()).removeClass('show-sub');
                });
                var next_curent = $(this).find('.children');
                next_curent.children('.cat-parent').each(function () {
                    var child_curent = $(this).find('.children');
                    $(this).children('.carets').on('click', function () {
                        $(this).parent().toggleClass('show-sub');
                        $(this).parent().parent().find('.cat-parent').not($(this).parent()).removeClass('show-sub');
                        $(this).parent().parent().find('.children').not(child_curent).stop().slideUp(300);
                        $(this).parent().children('.children').stop().slideToggle(300);
                    })
                });
            });
        });
    }

    function rustrot_magnific_popup() {
        $('.product-360-button a').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            disableOn: false,
            preloader: false,
            fixedContentPos: false
        });
        $('.rustrot-instagram-shop .item').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            disableOn: false,
            preloader: false,
            fixedContentPos: false,
        });
    }

    function rustrot_better_equal_elems($elem) {
        $elem.each(function () {
            if ($(this).find('.equal-elem').length) {
                $(this).find('.equal-elem').css({
                    'height': 'auto'
                });
                var _height = 0;
                $(this).find('.equal-elem').each(function () {
                    if (_height < $(this).height()) {
                        _height = $(this).height();
                    }
                });
                $(this).find('.equal-elem').height(_height);
            }
        });
    }

    function rustrot_product_gallery($elem) {
        $elem.each(function () {
            var _items = $(this).closest('.product-inner').data('items'),
                _main_slide = $(this).find('.product-gallery-slick'),
                _dot_slide = $(this).find('.gallery-dots');

            _main_slide.not('.slick-initialized').each(function () {
                var _this = $(this),
                    _config = [];

                if ($('body').hasClass('rtl')) {
                    _config.rtl = true;
                }
                _config.prevArrow = '<span class="fa fa-angle-left prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-right next"></span>';
                _config.cssEase = 'linear';
                _config.infinite = false;
                _config.fade = true;
                _config.slidesMargin = 0;
                _config.arrows = false;
                _config.asNavFor = _dot_slide;
                _this.slick(_config);
            });
            _dot_slide.not('.slick-initialized').each(function () {
                var _config = [];
                if ($('body').hasClass('rtl')) {
                    _config.rtl = true;
                }
                _config.slidesToShow = _items;
                _config.infinite = false;
                _config.focusOnSelect = true;
                _config.vertical = true;
                _config.slidesMargin = 10;
                _config.prevArrow = '<span class="fa fa-angle-up prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-down next"></span>';
                _config.asNavFor = _main_slide;
                _config.responsive = [
                    {
                        breakpoint: 992,
                        settings: {
                            vertical: false,
                            slidesMargin: 10,
                            prevArrow: '<span class="fa fa-angle-left prev"></span>',
                            nextArrow: '<span class="fa fa-angle-right next"></span>'
                        }
                    }
                ];
                $(this).slick(_config);
            })
        })
    }

    function rustrot_popover_button() {
        $('[data-toggle="tooltip"]').each(function () {
            $(this).tooltip({
                title: $(this).text()
            });
        });
        // .product-item .add-to-cart a
        $('.product-inner.tooltip-all-top .yith-wcqv-button,.product-inner.tooltip-top .add-to-cart a, .product-inner.tooltip-top .compare,.product-inner.tooltip-top .yith-wcwl-add-to-wishlist a').each(function () {
            $(this).tooltip({
                title: $(this).text(),
                trigger: 'hover',
                placement: 'top'
            });
        });
        $('.product-inner.tooltip-left .add-to-cart a, .product-inner.tooltip-left .yith-wcqv-button,.product-inner.tooltip-left .compare,.product-inner.tooltip-left .yith-wcwl-add-to-wishlist a').each(function () {
            $(this).tooltip({
                title: $(this).text(),
                trigger: 'hover',
                placement: 'left'
            });
        });
        $('.product-inner.tooltip-right .add-to-cart a, .product-inner.tooltip-right .yith-wcqv-button,.product-inner.tooltip-right .compare,.product-inner.tooltip-right .yith-wcwl-add-to-wishlist a').each(function () {
            $(this).tooltip({
                title: $(this).text(),
                trigger: 'hover',
                placement: 'right'
            });
        });
    }

    function rustrot_threesixty(ev) {
        var imageLink = (location.pathname.replace('single-product-360deg.html', 'assets/images'));
        $('.rustrot-threed-view').ThreeSixty({
            totalFrames: 12,
            endFrame: 12,
            currentFrame: 1,
            imgList: '.threed-view-images',
            progress: '.spinner',
            imgArray: [imageLink + '/is_main.jpg', imageLink + '/is_main1.jpg', imageLink + '/is_main2.jpg', imageLink + '/is_main4.jpg', imageLink + '/is_main5.jpg', imageLink + '/is_main6.jpg', imageLink + '/is_main7.jpg', imageLink + '/is_main8.jpg', imageLink + '/is_main9.jpg', imageLink + '/is_main10.jpg', imageLink + '/is_main11.jpg', imageLink + '/is_main12.jpg'],
            height: 600,
            width: 600,
            responsive: true,
            navigation: true
        });
    }

    // Window load
    $(window).on("load", function () {
        rustrot_video();
        rustrot_view_mode_sidebar();
        rustrot_view_mode_nosidebar();
        rustrot_form();
        if ($('.rustrot-accordion').length > 0) {
            rustrot_accordion();
        }
        if ($('.parallax-home').length > 0) {
            rustrot_parallax();
        }
        if ($('.owl-slick').length) {
            $('.owl-slick').each(function () {
                rustrot_init_carousel($(this));
            });
        }
        if ($('.rustrot-threed-view').length > 0) {
            rustrot_threesixty();
        }
        if ($('.rustrot-countdown').length) {
            rustrot_countdown($('.rustrot-countdown'));
        }
        if ($('.product-gallery').length) {
            rustrot_product_gallery($('.product-gallery'));
        }
        if ($('.category-search-option').length) {
            $('.category-search-option').chosen();
        }
        if ($('.category .chosen-results').length && $.fn.scrollbar) {
            $('.category .chosen-results').scrollbar();
        }
        if ($('.block-minicart .cart_list').length && $.fn.scrollbar) {
            $('.block-minicart .cart_list').scrollbar();
        }
        if ($('.widget_product_categories .product-categories').length) {
            rustrot_category_product($('.widget_product_categories .product-categories'));
        }
        if ($('.header-sticky .header-wrap-stick').length) {
            rustrot_header_sticky($('.header-sticky .header-wrap-stick'));
        }
        if ($('.equal-container.better-height').length) {
            rustrot_better_equal_elems($('.equal-container.better-height'));
        }
        rustrot_popover_button();
        rustrot_magnific_popup();
        rustrot_title_tooltip();
    });
    // Window resize
    $(window).on("resize", function () {
        if ($('.equal-container.better-height').length) {
            rustrot_better_equal_elems($('.equal-container.better-height'));
        }
    });
})(jQuery); // End of use strict
