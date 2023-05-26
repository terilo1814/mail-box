import React, { useRef, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const SignupLogin = ({ onLogin }) => {
    const [toggle, setToggle] = useState(false);

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const toggleHandler = () => {
        setToggle((prevState) => !prevState);
    };

    const submitHandler = (e) => {
        e.preventDefault();


        const enteredMail = emailRef.current?.value
        const enteredPassword = passwordRef.current?.value
        const enteredConfirmPassword = confirmPasswordRef.current?.value


        let url;
        if (toggle) {
            if (!enteredMail || !enteredPassword) {
                alert('Please enter all the details')
                return
            }

            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'
        }
        else {
            if (!enteredMail || !enteredPassword || !enteredConfirmPassword) {
                alert('Please enter all the details')
                return
            }
            if (enteredPassword !== enteredConfirmPassword) {
                alert('Password do not match')
                return
            }
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCE9Ri0f_1n-d_Z-CFFDTIrtb1pk1NRfJQ'
        }
        postData(url, enteredMail, enteredPassword, onLogin)
    }



    const postData = async (url, enteredMail, enteredPassword, onLogin) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredMail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                if (!toggle) {
                    confirmPasswordRef.current.value = ""
                }
                emailRef.current.value = ""
                passwordRef.current.value = ""

                const data = await response.json()
                const { idToken: token } = data
                onLogin(token, enteredMail)
            }
            else {
                const errorMessage = 'Failed to post data'
                throw new Error(errorMessage)
            }

        } catch (error) {
            alert(error)
        }
    }


    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ minHeight: '100vh' }}
        >
            <Card
                className='shadow-lg border-0'
                style={{ width: '420px', height: '550px', background: '#f9f8fa' }}
            >
                <Card.Body>
                    <h3
                        className='d-flex justify-content-center align-items-center'
                        style={{ color: 'rgb(255, 217, 90)' }}
                    >
                        {toggle ? 'Login' : 'SignUp'}
                    </h3>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='mb-3' style={{ marginTop: '2rem' }} controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' ref={emailRef} />
                        </Form.Group>

                        <Form.Group className='mb-3' style={{ marginTop: '2rem' }} controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' ref={passwordRef} />
                        </Form.Group>

                        {!toggle && (
                            <Form.Group className='mb-3' style={{ marginTop: '2rem' }} controlId='formBasicConfirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm Password'
                                    ref={confirmPasswordRef}
                                />
                            </Form.Group>
                        )}

                        <Button
                            className='d-block mx-auto mt-5'
                            style={{ color: 'black', background: 'rgb(255, 217, 90)', border: 'none' }}
                            type='submit'
                        >
                            {toggle ? 'Login' : 'SignUp'}
                        </Button>

                        {toggle && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <NavLink to='/forgotPassword'>Forgot Password</NavLink>
                            </div>
                        )}

                        <Button
                            className='d-block mx-auto mt-3'
                            style={{ color: 'black', background: 'rgb(164, 208, 164)', border: 'none' }}
                            type='button'
                            onClick={toggleHandler}
                        >
                            {toggle ? 'Dont have an account? SignUp' : ' Already have an account? Login'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
