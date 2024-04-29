// @codekit-prepend "/vendor/hammer-2.0.8.js";
$(document).ready(function () {
    // DOMMouseScroll included for firefox support
    var canScroll = true,
        scrollController = null;
    $(this).on('mousewheel DOMMouseScroll', function (e) {
        if (!($('.outer-nav').hasClass('is-vis'))) {
            e.preventDefault();
            var delta = (e.originalEvent.wheelDelta) ? - e.originalEvent.wheelDelta : e.originalEvent.detail * 20;
            if (delta > 50 && canScroll) {
                canScroll = false;
                clearTimeout(scrollController);
                scrollController = setTimeout(function () {
                    canScroll = true;
                }, 500);
                updateHelper(1);
            }
            else if (delta < -50 && canScroll) {
                canScroll = false;
                clearTimeout(scrollController);
                scrollController = setTimeout(function () {
                    canScroll = true;
                }, 500);
                updateHelper(-1);
            }
        }

    });
    $('.side-nav li').click(function () {
        if (!($(this).hasClass('is-active'))) {

            var $this = $(this),
                curActive = $this.parent().find('.is-active'),
                curPos = $this.parent().children().index(curActive),
                nextPos = $this.parent().children().index($this),
                lastItem = $(this).parent().children().length - 1;

            updateNavs(nextPos);
            updateContent(curPos, nextPos, lastItem);

        }

    });

    // swipe support for touch devices
    var targetElement = document.getElementById('viewport'),
        mc = new Hammer(targetElement);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    mc.on('swipeup swipedown', function (e) {
        console.log(e);
        updateHelper(e);
    });
    // arrow key navigation
    $(document).keydown(function (e) {
        if (e.which === 38) {
            updateHelper(-1);
        }
        else if (e.which === 40) {
            updateHelper(1);
        }
    });
    // determine scroll, swipe, and arrow key direction

    function updateHelper(param) {
        var curActive = $('.side-nav').find('.is-active'),
            curPos = $('.side-nav').children().index(curActive),
            lastItem = $('.side-nav').children().length - 1,
            nextPos = 0;
        if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
            if (curPos !== lastItem) {
                nextPos = curPos + 1;
                updateNavs(nextPos);
                updateContent(curPos, nextPos);
            }
            else {
                updateNavs(nextPos);
                updateContent(curPos, nextPos);
            }
        }
        else if (param.type === "swipedown" || param.keyCode === 38 || param < 0) {
            if (curPos !== 0) {
                nextPos = curPos - 1;
                updateNavs(nextPos);
                updateContent(curPos, nextPos);
            }
            else {
                nextPos = lastItem;
                updateNavs(nextPos);
                updateContent(curPos, nextPos);
            }
        }
    }

    // sync side and outer navigations
    function updateNavs(nextPos) {
        $('.side-nav').children().removeClass('is-active');
        $('.side-nav').children().eq(nextPos).addClass('is-active');

    }

    // update main content area
    function updateContent(curPos, nextPos) {
        console.log("curr:", curPos, "next:", nextPos);
        $('.section.section.is-active').removeClass('is-active');
        $('.section').eq(nextPos).removeClass('hidden').addClass('is-active');
        $('.section').eq(curPos).addClass('hidden');
    }
});