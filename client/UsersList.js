import React, {Component, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import User from './User';
import Fade from './Fade';

const Container = styled.div`
    flex: 0 0 120px;
    display: flex;
    transition: flex .5s ease-in-out;
`;

const UsersList = (props) => {
    return <Container>
        <User user={props.myUser} primary typing={false} size={120} />
        {_.map(props.users, u => (<User key={u.userId}
                                        user={u.userId}
                                        typing={u.typing}
        />))}
    </Container>
};

export default UsersList
