'use strict';

var pageFunctions = {
    common: {
        init: function init() {
            console.log('common init');
        },

        finalize: function finalize() {
            console.log('common finalize');
        }
    },
    news: {
        init: function init() {},
        finalize: function finalize() {}
    },

    career_opportunities: {
        init: function init() {},
        finalize: function finalize() {
            window.addEventListener('resize', function () {
                normalizeElementHeights('.career-opportunity-card');
            });
            normalizeElementHeights('.career-opportunity-card');
        }
    }

};

function executePageFunctions() {
    var finalize = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

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