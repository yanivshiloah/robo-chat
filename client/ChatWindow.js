import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import Message from './Message';

const Container = styled.div`
    flex: 1 1 calc(100% - 180px);
    background: #ffffff;
    transition: flex .5s ease-in-out;
    padding: 20px;
    overflow-y: auto;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const ChatWindow = (props) => {
    return <Container ref={props.windowRef}>
        {_.map(props.messages, message => (
            <Message key={`${message.date}_${message.userId}`}
                     message={message}
            />)
        )}
    </Container>
}

export default ChatWindow;
