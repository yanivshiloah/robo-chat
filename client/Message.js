import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from './Avatar';
import moment from 'moment';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 80px;
    border-bottom: 1px solid #e2e2e2;
    padding: 10px 0;
`;

const TextContainer = styled.div`
    flex: auto;
    margin-left: 7px;
    font-weight: 600;
    white-space: pre-wrap;
`;

const MessageContainer = styled.div`
    font-size: 14px;
    padding: 4px 0;
`

const DateContainer = styled.div`
    font-size: 10px;
    color: #2C73D2;
`

const UsernameContainer = styled.div`
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding: 0 20px;
`

const Message = (props) => {
    return <Container>
        <Avatar username={props.message?.userId} size={50} />
        <UsernameContainer>
            {props.message?.userId}
        </UsernameContainer>
        <TextContainer>
            <MessageContainer>
                {props.message?.message}
            </MessageContainer>
            <DateContainer>
                {props.message?.date ? moment(props.message?.date).format('MMMM Do YYYY, h:mm:ss A') : ''}
            </DateContainer>
        </TextContainer>
    </Container>
};

export default Message;
