import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1 0 92px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 92px;
    padding: 20px 0;   
    position: relative;
`;

const TextareaContainer = styled.div`
    position: relative;
    height: 100%;
    flex: 0 0 80%;
    display: flex;
    padding-right: 20px;
    flex-direction: column;
`;

const Textarea = styled.textarea`
   flex: 1;
   width: 100%;
   height: 100%;
   font-size: 24px;
   resize: none; 
   padding: 20px;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`

const Button = styled.button`
    width: 200px;
    font-size: 18px;
    color: #ffffff;
    background: #845EC2;
    outline: none;
    border-radius: 2px;
    height: 100%;
    border: none;
    transition: flex .5s ease-in-out;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`

const INITIAL_TEXT = '';
const IDLE_TIME = 10000;

export default class ChatInput extends Component {
    state = {
        text: INITIAL_TEXT
    };

    clearTypingTimerId = null;

    componentDidUpdate(prevProps, prevState) {
        const {typing, setTyping} = this.props;
        const {text} = this.state;
        if (text !== prevState.text) {
            this.clearTypingHandler();
            if (typing) {
                this.clearTypingTimerId = setTimeout(() => {
                    setTyping(false)
                }, IDLE_TIME);
            }
        }
    }

    componentWillUnmount() {
        this.clearTypingHandler();
    }

    clearTypingHandler = () => {
        clearTimeout(this.clearTypingTimerId);
        this.clearTypingTimerId = null;
    }

    setText = (text) => this.setState(() => ({text}));

    onChange = (e) => {
        this.setText(e.target.value);
    };

    submitDraft = () => {
        this.setText(INITIAL_TEXT);
        this.props.submitDraft(this.state.text);
        this.props.setTyping(false);
    }

    onKeyDown = (e) => {
        const {typing, setTyping} = this.props;
        const {value} = e.target;
        if (value === '' && typing) {
            setTyping(false);
        }
        if (value !== '' && !typing) {
            setTyping(true);
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.submitDraft(value);
        }
    }

    render() {
        return (<Container>
            <TextareaContainer>
                <Textarea value={this.state.text}
                          onChange={this.onChange}
                          onKeyDown={this.onKeyDown}
                />
            </TextareaContainer>
            <Button onClick={this.submitDraft}>
                Send!
            </Button>
        </Container>)
    }
}
