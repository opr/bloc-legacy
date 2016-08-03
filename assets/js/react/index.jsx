import React from 'react';
import {render} from 'react-dom';

let anchors = {
    //testElement: { container: document.getElementById('test-element__react-anchor'), component: <TestElement /> }
};

for( var i in anchors ) {
    if( anchors[i] )
        render( anchors[i].component, anchors[i].container );
}