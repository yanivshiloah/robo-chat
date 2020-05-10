import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Dot} from 'react-animated-dots';
import styled from 'styled-components';
import Avatar from './Avatar';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 10px;   
    'none'};
}
`

const AvatarContainer = styled.div`
    flex: 0 0 80px;
    margin: 10px;
`

const TextContainer = styled.div`
    flex: 0 0 20px;
    font-size: 18px;
    text-align: center;
    color: #ffffff;
`;

const User = (props) => {
    const renderTyping = () => {
        return <Fragment>
            <span>is typing</span>
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
        </Fragment>
    }
    const {user, primary, typing, size = 90} = props;
    return (<Container>
        <AvatarContainer>
            <Avatar primary={primary} username={user} size={size} />
        </AvatarContainer>
        <TextContainer>
            {user} {typing ? renderTyping() : ''}
        </TextContainer>
    </Container>);
};

export default User;
