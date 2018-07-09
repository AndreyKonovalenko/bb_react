import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    // this is class 'factory' pattern: anunymous class
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            console.log(this.requestInterceptor);
            this.resoponseInterceptor = axios.interceptors.response.use(response => response, error => {
                console.log(error);
                this.setState({error: error});
            });
        }
        
        // removeing intreceptors is preventing memary leaks
        componentWillUnmount() {
            console.log('Will Unmount!', this.requestInterceptor, this.resoponseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.resoponseInterceptor);
        }

        errorConfirmdHandler = () => {
            this.setState({error: null});
        }
        
        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmdHandler}> 
                        {this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;