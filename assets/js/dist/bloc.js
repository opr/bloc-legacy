'use strict';

(function ($) {
    var V1 = {
        common: {
            init: function init() {
                $('.header').slideDown();
            },
            finalize: function finalize() {}
        }
    };

    var UTIL = {
        fire: function fire(func, funcname, args) {
            var fire;
            var namespace = V1;
            funcname = funcname === undefined ? 'init' : funcname;
            fire = func !== '';
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === 'function';
            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function loadEvents() {
            UTIL.fire('common');
            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, 'finalize');
            });
            UTIL.fire('common', 'finalize');
        }
    };

    $(document).ready(UTIL.loadEvents);
})(jQuery);