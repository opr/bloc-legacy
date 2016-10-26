let pageFunctions = {
    common: {
        init: function() {
            console.log('common init');
        },

        finalize: function() {
            console.log( 'common finalize');
        }
    },
    news: {
        init: function() {

        },
        finalize: function() {

        }
    },

    career_opportunities: {
        init: function() {

        },
        finalize: function() {
            window.addEventListener( 'resize', () => {normalizeElementHeights('.career-opportunity-card');});
            normalizeElementHeights('.career-opportunity-card');
        }
    }

};


function executePageFunctions( finalize = false ) {
    let body = document.body;

    if( finalize ) {
        pageFunctions.common.finalize();
    }
    else {
        pageFunctions.common.init();
    }
    for (let c of body.classList) {
        c = c.replace(/-/g, '_');
        if( finalize ) {
            if( typeof pageFunctions[c] !== 'undefined' ) {
                if( typeof pageFunctions[c].finalize !== 'undefined' ) {
                    pageFunctions[c].finalize();
                }
            }
        }
        else {
            if( typeof pageFunctions[c] !== 'undefined' ) {
                if( typeof pageFunctions[c].init !== 'undefined' ) {
                    pageFunctions[c].init();
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    executePageFunctions( true );
});

executePageFunctions();