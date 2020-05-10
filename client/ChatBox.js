import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UsersList from './UsersList';
import ChatWindow from './ChatWindow';
import ChatInput from './assets/ChatInput';

const Chat = styled.div`
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    width: 80%;   
`

const ChatBox = (props) => {
    const {users, myUser, messages, windowRef, submitDraft, typing, setTyping} = props;
    return <Chat>
        {myUser && <UsersList users={users}
                              myUser={myUser}
        />}
        <ChatWindow messages={messages}
                    windowRef={windowRef}
        />
        <ChatInput submitDraft={submitDraft}
                   typing={typing}
                   setTyping={setTyping}
        />
    </Chat>;
}

export default ChatBox;
