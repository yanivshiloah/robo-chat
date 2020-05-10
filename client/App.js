import {hot} from 'react-hot-loader/root';
import React, {Component, createRef} from 'react';
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import openSocket from 'socket.io-client';
import LoginModal from './LoginModal';
import ChatBox from './ChatBox';
import moment from 'moment';

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2C73D2;
    font-family: 'Roboto', sans-serif;
`;

class App extends Component {
    state = {
        myUser: null,
        users: [],
        msgs: [],
        typing: false
    };

    windowRef = createRef();

    setSocket = () => {
        this.socket = openSocket('http://localhost:3000');
        this.socket.on('message', (e) => {
            this.setState((prevState) => ({msgs: [...prevState.msgs, e]}), () => {
                this.windowRef.current?.scrollTo(0, this.windowRef.current?.scrollHeight);
            });
        });
        this.socket.on('sign-in', (e) => {
            this.setState((prevState) => ({
                users: [
                    ...prevState.users,
                    {userId: e.userId, typing: false}
                ]
            }));
        });
        this.socket.on('sign-out', (e) => {
            toast.info(`${e.userId} has left the chat :(`);
            this.setState((prevState) => ({users: _.filter(prevState.user, u => u.userId !== e.userId)}));
        });
        this.socket.on('sign-in-done', (e) => {
            this.setState(() => ({
                    users: _.map(e.users, userId => ({userId, typing: false})),
                    myUser: e.userId
                }
            ));
        });
        this.socket.on('user-typing', (e) => {
            this.setState((prevState) => ({
                    users: _.map(prevState.users, u => {
                        if (u.userId !== e.userId) return u;
                        return {
                            ...u,
                            typing: e.typing
                        };
                    })
                }
            ));
        });
    }

    setTyping = (typing) => {
        this.setState(() => ({typing}));
        this.socket.emit('typing', {typing, userId: this.state.myUser});
    }

    setUser = (myUser) => {
        this.setSocket();
        this.socket.emit('sign-in', {userId: myUser});
    }

    submitDraft = (message) => {
        this.socket.emit('message', ({
            message,
            userId: this.state.myUser,
            date: new Date()
        }))
    }

    render() {
        return (<Container>
            <LoginModal show={!this.state.myUser}
                        setUser={this.setUser}
            />
            <ChatBox submitDraft={this.submitDraft}
                     users={this.state.users}
                     windowRef={this.windowRef}
                     myUser={this.state.myUser}
                     setTyping={this.setTyping}
                     typing={this.state.typing}
                     messages={this.state.msgs}
            />
            <ToastContainer />
        </Container>);
    }
}

export default hot(App);
