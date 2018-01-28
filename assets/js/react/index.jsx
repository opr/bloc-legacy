import React from 'react';
import {render} from 'react-dom';

let elements = {
    //exampleElement: document.getElementById('scroll-markers__react-anchor')
};

let anchors = {};

/*if (elements.exampleElement) {
    anchors.exampleElement = {container: elements.exampleElement, component: <ExampleElement />};
}*/

for (let i in anchors) {
    if (!anchors.hasOwnProperty(i)) {
        continue;
    }
    if (anchors[i]) {
        render(anchors[i].component, anchors[i].container);
    }
}