import React from 'react';
import {render} from 'react-dom';
import TestModule from './TestModule';

let elements = {
    test: document.getElementById('scroll-markers__react-anchor')
};

let anchors = {};

if (elements.test) {
    anchors.test = {container: elements.test, component: <TestModule />};
}


for (let i in anchors) {
    if (!anchors.hasOwnProperty(i)) {
        continue;
    }
    if (anchors[i]) {
        render(anchors[i].component, anchors[i].container);
    }
}