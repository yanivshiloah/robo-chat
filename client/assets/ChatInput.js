import React, {useState} from 'react';
import PropTypes from 'prop-types';
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

const ChatInput = (props) => {

    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    const submitDraft = () => {
        props.submitDraft(text);
        setText('');
        props.setTyping(false);
    }

    const onKeyDown = (e) => {
        if (e.target.value === '' && props.typing) {
            props.setTyping(false);
        }
        if (e.target.value !== '' && !props.typing) {
            props.setTyping(true);
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitDraft(e.target.value);
        }
    }

    return <Container>
        <TextareaContainer>
            <Textarea value={text}
                      onChange={onChange}
                      onKeyDown={onKeyDown}
            />
        </TextareaContainer>
        <Button onClick={submitDraft}>
            Send!
        </Button>
    </Container>
};

export default ChatInput;
