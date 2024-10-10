import { useDispatch, useSelector } from "react-redux";
import { setSendMails } from "../../states/Reducers/AuthReducer";
import { Card, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchSentMails } from "../Api/ApiContainer";



export const SendMail = () => {
    const [showMessage, setShowMessage] = useState()
    const sentMails = useSelector((state) => state.auth.sentMails)

    const currentMail = useSelector((state) => state.auth.email);
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentMail) {
            fetchSentMails(currentMail, dispatch)
        }

    }, [currentMail,dispatch]);




    const showFullMessage = async (mail) => {
        setShowMessage(mail.id)

    }

    const deleteHandler = async (mail) => {
        const id = mail.id;
        try {
            const updatedSender = currentMail.replace(/[.@]/g, "");
            const response = await fetch(
                `https://mail-box-4cd6a-default-rtdb.firebaseio.com/mailbox/users/${updatedSender}/sent/${id}.json`,
                {
                    method: 'DELETE',
                }
            );
            if (response.ok) {
                dispatch(setSendMails(sentMails.filter((m) => m.id !== id)));
            } else {
                throw new Error('Failed to delete the mail');
            }
        } catch (error) {
            alert(error);
        }
    };




    return (
        <Container className='mt-5'>
            <h1>Sent Mails</h1>
            {sentMails.length === 0 ? (
                <p>No mails has been sent</p>
            ) : (
                sentMails.map((mail) => (
                    <Card key={mail.id} className='mb-3'>
                        <Card.Body>
                            <div className='d-flex justify-content-between'>
                                <div >
                                    <h5 style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '15px' }}
                                        onClick={() => showFullMessage(mail)}>{mail.subject}</h5>
                                    <p className='text-muted' style={{ marginLeft: '15px' }}>{mail.to}</p>
                                </div>
                                <div>
                                    <p className='text-muted'>{mail.date}</p>
                                </div>
                                <Button style={{ color: 'red', background: 'white', border: '1px solid red', marginTop: '22px' }}
                                    onClick={() => deleteHandler(mail)}>
                                    Delete
                                </Button>
                            </div>
                            {showMessage === mail.id ? <Card.Text style={{ marginLeft: '15px' }} >{mail.message}</Card.Text> : ''}

                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};


