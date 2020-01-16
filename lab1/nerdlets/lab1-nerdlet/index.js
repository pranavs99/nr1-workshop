import React from 'react';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Lab1NerdletNerdlet extends React.Component {
    constructor(props) {
        super(props);
        this.accountId = 630060;
        this.state = {
            appId: null,
            appName: null
        };
        console.debug("Nerdlet constructor", this); //eslint-disable-line
    }

    render() {
        return <h1>Hello, lab1-nerdlet Nerdlet!</h1>;
    }
}
