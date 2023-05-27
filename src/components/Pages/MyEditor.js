import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';


export const MyEditor = () => {

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const currentMail = useSelector((state) => state.auth.email)



    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();

        if (isLoggedIn) {
            if (!to || !subject || !message) {
                alert('Please fill all the details')
            }
            postData()
        }


        setTo('');
        setSubject('');
        setMessage('');
    };

    const postData = async () => {
        try {
            const url = 'https://mail-box-4cd6a-default-rtdb.firebaseio.com/mailbox.json'
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    to,
                    subject,
                    message,
                    sender: currentMail
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                alert('Mail send successfully')
            }
            else {
                throw new Error('Failed to send the mail')
            }
        } catch (error) {
            alert(error)
        }
    }




    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', marginTop: '3rem' }}>
            <Card className='shadow-lg border-0' style={{ width: '900px', height: '550px', background: '#f9f8fa' }}>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='mb-3' style={{ marginTop: '2rem' }} controlId='formBasicEmail'>
                            <Form.Label>To:</Form.Label>
                            <Form.Control type='email' value={to} onChange={(e) => setTo(e.target.value)} />
                        </Form.Group>

                        <Form.Group className='mb-3' style={{ marginTop: '2rem' }} controlId='formSubject'>
                            <Form.Label>Subject:</Form.Label>
                            <Form.Control type='text' value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </Form.Group>

                        <Form.Group className='mb-3' style={{ marginTop: '2rem' }} controlId='formTextArea'>
                            <Form.Label>Message:</Form.Label>
                            <Form.Control as='textarea' rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                        </Form.Group>

                        <Editor editorState={editorState} />
                        <div className='text-end'>
                            <Button variant='primary' type='submit'>Send</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
