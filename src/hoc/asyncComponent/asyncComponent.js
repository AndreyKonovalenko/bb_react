import React, { Component } from 'react';

// this technique of downloading only what you need as known as code splitting or lazy loading
// works with create-react-app webpack config
// this hoc component asyncComponent was made for this technique purpose;

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        };
        
        componentDidMount () {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }
        render () {
            const C = this.state.component;
            return C ? <C{...this.props}/> : null;
        }
    };
};

export default asyncComponent;