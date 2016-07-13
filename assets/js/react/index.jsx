import React from 'react';
import {render} from 'react-dom';

var App =  React.createClass({
    getInitialState: () => {
        return { text: 'hdllo'}
    },
    render: function () {
        return <p>{this.state.text}

        </p>;
    }
});

render(<App/>, document.getElementById('app'));
module.hot.accept();