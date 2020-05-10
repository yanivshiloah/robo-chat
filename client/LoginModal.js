import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import {toast} from 'react-toastify';
import Rodal from 'rodal';
import styled from 'styled-components';
import Avatar from './Avatar';

const Inner = styled.div`
    display: flex;
    justify-content: stretch;
    align-items: center;
    flex-direction: column;      
`;

const Input = styled.input`
    font-size: 24px;
    border-radius: 16px;
    height: 32px;
    padding: 2px 12px;
    outline: none;
    border: 1px solid #ffffff;
    text-align: center;
    color: #ffffff;
    margin: 20px 0;
    background: transparent;
`

export default class LoginModal extends Component {
    state = {
        username: ''
    }

    textInput = React.createRef();

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            return this.checkUserAvailability(_.trim(e.target.value))
        }
    };

    checkUserAvailability = async (username) => {
        const {setUser} = this.props;
        try {
            await axios.get(`/verify-username?username=${username}`);
            this.setState(() => ({username}), () => {
                setUser(username);
            });
        } catch (error) {
            this.setState(() => ({error}));
            toast.error('Username already exists');
        }
    }

    render() {
        const {show} = this.props;
        return (<Rodal visible={show}
                       customStyles={{
                           background: '#845EC2',
                           boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
                       }}
                       animation="flip"
                       height={260}
                       closeMaskOnClick={false}
                       showCloseButton={false}
        >
            <Inner>
                <Input type="text"
                       ref={this.textInput}
                       onKeyDown={this.handleKeyDown}
                       onBlur={this.handleBlur}
                       pattern="[a-zA-Z0-9-]"
                />
                <Avatar size={180} username={this.state.username}/>
            </Inner>
        </Rodal>);
    }

    static propTypes = {};

    static defaultProps = {};
}
