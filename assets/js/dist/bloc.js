'use strict';

var pageFunctions = {
    common: {
        init: function init() {},

        finalize: function finalize() {}
    },
    news: {
        init: function init() {},
        finalize: function finalize() {}
    },

    blog: {
        init: function init() {
            console.log("blog page!");
        },
        finalize: function finalize() {
            window.addEventListener('resize', function () {
                normalizeElementHeights('.career-opportunity-card');
            });
            normalizeElementHeights('.career-opportunity-card');
        }
    }

};

function executePageFunctions() {
    var finalize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var body = document.body;

    if (finalize) {
        pageFunctions.common.finalize();
    } else {
        pageFunctions.common.init();
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = body.classList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var c = _step.value;

            c = c.replace(/-/g, '_');
            if (finalize) {
                if (typeof pageFunctions[c] !== 'undefined') {
                    if (typeof pageFunctions[c].finalize !== 'undefined') {
                        pageFunctions[c].finalize();
                    }
                }
            } else {
                if (typeof pageFunctions[c] !== 'undefined') {
                    if (typeof pageFunctions[c].init !== 'undefined') {
                        pageFunctions[c].init();
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    executePageFunctions(true);
});

executePageFunctions();
"use strict";

function normalizeElementHeights(selectorName) {
    var selector = document.body.querySelectorAll(selectorName),
        tallestHeight = 0;
    if (!selector) {
        return;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = selector[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            i.style.minHeight = 0;
            tallestHeight = i.offsetHeight > tallestHeight ? i.offsetHeight : tallestHeight;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = selector[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _i = _step2.value;

            _i.style.minHeight = tallestHeight + "px";
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}