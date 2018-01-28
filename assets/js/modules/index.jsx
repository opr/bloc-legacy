//this is where our stuff that gets compiled by webpack will live
import 'core-js/fn/symbol/iterator.js';
import 'core-js/es6/symbol.js';
import bowser from 'bowser';
import {tns} from 'tiny-slider/src/tiny-slider';
import {normalizeElementHeights} from "./NormalizeElementHeights/NormalizeElementHeights";

var isMac = bowser.mac === true;
let introPanel = null;

let pageFunctions = {
    common: {
        init: function () {

        },

        finalize: function () {

        }
    },

    singleCaseStudy: {
        finalize: function() {

            let caseStudiesList = document.getElementsByClassName('further-case-studies__slider')[0];
            let caseStudySlider = tns({
                container: caseStudiesList,
                items: 1,
                mouseDrag: true,
                nav: false,
                controlsContainer: document.getElementsByClassName('further-case-studies__slider-controls')[0],
                responsive: {
                    1260: {
                        items: 2
                    }
                }
            });

        }
    },

    homepage: {
        finalize: function () {
            normalizeElementHeights('.testimonial-panel__panel');
        },
        init: function () {

            let caseStudySlider = null,
                myScroll = null,
                whatWeDoPanel = document.getElementsByClassName('main-panel --whatWeDoPanel');

            if (whatWeDoPanel.length > 0) {
                let listHeight = whatWeDoPanel[0].getElementsByClassName('what-we-do-panel__list')[0].offsetHeight;
                whatWeDoPanel[0].style.minHeight = (listHeight + 160) + 'px';
            }

            let caseStudiesPanel = document.getElementsByClassName('main-panel --caseStudyPanel');
            if(caseStudiesPanel.length > 0) {
                caseStudiesPanel = caseStudiesPanel[0];
                let caseStudiesList = caseStudiesPanel.getElementsByClassName('case-study-panel__grid__inner')[0];
                if(window.innerWidth < 1260) {
                    caseStudySlider = tns({
                        container: caseStudiesList,
                        items: 1,
                        mouseDrag: true,
                        nav: false,
                        controlsContainer: caseStudiesPanel.getElementsByClassName('case-study-panel__slider-controls')[0],
                        responsive: {
                            450: {
                                items: 2
                            },
                            1000: {
                                items: 3
                            },
                            1260: {
                                disabled: true
                            }
                        }
                    });
                }
            }

            let pageScroll = function (e) {
                let pageNum = parseInt(e.target.getAttribute('data-page-num'));
                myScroll.goToPage(0, pageNum, 1000);
            };

            fancyLoading();

            function scrollSetup() {
                let viewportHeight = document.getElementsByClassName('panel-container')[0].offsetHeight;
                for (let m of document.getElementsByClassName('main-panel')) {
                    let skipResizeBelow = m.getAttribute('data-skip-resize-below-width').replace('"', '');
                    if (window.innerWidth <= 960 || window.innerHeight <= 750) {
                        if (myScroll !== null) {

                            for (let i of indicators) {
                                i.removeEventListener('click', pageScroll);
                            }
                            myScroll.destroy();
                        }
                        m.style.height = 'auto';
                        continue;
                    }

                    if(parseInt(skipResizeBelow) > window.innerWidth) {
                        continue;
                    }
                    m.style.height = viewportHeight + 'px';
                }
            }

            scrollSetup();

            setTimeout(() => {

                if (window.innerWidth <= 768 || window.innerHeight <= 750) {
                    return;
                }

                let indicators = document.querySelectorAll('.scroll-indicator .scroll-indicator__marker');

                myScroll = new IScroll('.panel-container', {
                    disableTouch: true,
                    disableMouse: true,
                    mouseWheel: true,
                    snap: '.main-panel',
                    keyBindings: true,
                    mouseWheelSpeed: 1,
                    preventDefault: true,
                    tap: false,
                    click: false,
                    snapSpeed: 450,
                    eventPassthrough: 'horizontal',
                    freeScroll: false,
                    isMac: isMac,
                    snapTimeout: 600,
                    nextTrigger: false,
                    prevTrigger: false,
                    momentum: false
                });

                myScroll.on('scrollEnd', () => {
                    for (let i of indicators) {
                        i.classList.remove('--active');
                        if (parseInt(i.getAttribute('data-page-num')) === myScroll.currentPage.pageY) {
                            i.classList.add('--active');
                        }
                    }
                });

                for (let i of indicators) {
                    i.addEventListener('click', pageScroll);
                }

            }, 500);

            function checkSliderDestroy() {
                if(window.innerWidth >= 1260 && caseStudySlider !== null) {
                    caseStudySlider.destroy()
                }
            }

            function fixContactPanel() {
                let contactForm = document.getElementsByClassName('contact-us-panel__form-container'),
                    contactPanel = document.getElementsByClassName('main-panel --contactUsPanel');
                if(contactPanel.length > 0) {
                    contactPanel = contactPanel[0];
                    contactForm = contactForm[0];

                    if(window.innerHeight >= 750 && window.innerWidth >= 768) {
                        contactPanel.style.minHeight = '0';
                        return;
                    }
                    contactPanel.style.minHeight = (contactForm.offsetHeight+80) + 'px';
                }
            }

            fixContactPanel();

            window.addEventListener('resize', scrollSetup);
            window.addEventListener('resize', checkSliderDestroy);
            window.addEventListener('resize', fixContactPanel);
        }
    }
};


function executePageFunctions(finalize = false) {
    let body = document.body;

    if (finalize) {
        pageFunctions.common.finalize();
    }
    else {
        pageFunctions.common.init();
    }
    for (let c of body.classList) {
        c = c.replace(/-/g, '_');
        if (finalize) {
            if (typeof pageFunctions[c] !== 'undefined') {
                if (typeof pageFunctions[c].finalize !== 'undefined') {
                    pageFunctions[c].finalize();
                }
            }
        }
        else {
            if (typeof pageFunctions[c] !== 'undefined') {
                if (typeof pageFunctions[c].init !== 'undefined') {
                    pageFunctions[c].init();
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    executePageFunctions(true);
});

executePageFunctions();