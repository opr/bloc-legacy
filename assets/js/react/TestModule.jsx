import React from 'react';

export default class TestModule extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        return (
        <div>1234</div>
        );
    }
}