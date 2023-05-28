import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setReceivedMails } from '../../states/Reducers/AuthReducer';

export const InboxPage = () => {
  const currentMail = useSelector((state) => state.auth.email);
  // const [receivedMails, setReceivedMails] = useState([]);
  const [showMessage, setShowMessage] = useState()

  const receivedMails = useSelector((state) => state.auth.receivedMails)
  const dispatch = useDispatch()


  // useEffect(() => {
  //   fetchReceivedMails();
  // }, []);





  // const fetchReceivedMails = async () => {
  //   try {
  //     const updatedSender = currentMail.replace(/[.@]/g, "");
  //     const response = await fetch(`https://mail-box-4cd6a-default-rtdb.firebaseio.com/mailbox/users/${updatedSender}/received.json`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data) {
  //         const mails = Object.keys(data).map((key) => ({
  //           id: key,
  //           ...data[key],
  //         }));
  //         setReceivedMails(mails);
  //       }
  //     } else {
  //       throw new Error('Failed to fetch received mails');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const updateData = async (mail) => {

    try {
      const receiveData = {
        from: mail.from,
        subject: mail.subject,
        message: mail.message,
        date: mail.date,
        seen: true

      };
      const updatedSender = currentMail.replace(/[.@]/g, "");
      const response = await fetch(`https://mail-box-4cd6a-default-rtdb.firebaseio.com/mailbox/users/${updatedSender}/received/${mail.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(receiveData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.ok) {
        dispatch(setReceivedMails( receivedMails.map((m) => (m.id === mail.id ? { ...m, seen: true } : m))));
      } else {
        throw new Error('Failed to update the message');
      }
    } catch (error) {
      console.log(error)
      alert('Failed to update it')
    }
  }


  const showFullMessage = async (mail) => {
    setShowMessage(mail.id)
    updateData(mail)

  }


  return (
    <Container className='mt-5'>
      <h1>Inbox</h1>
      {receivedMails.length === 0 ? (
        <p>No mails in the inbox</p>
      ) : (
        receivedMails.map((mail) => (
          <Card key={mail.id} className='mb-3'>
            <Card.Body>
              <div className='d-flex justify-content-between'
                onClick={() => showFullMessage(mail)} style={{ cursor: 'pointer', }}>
                <div >

                  {!mail.seen ? (
                    <p
                      className='blue-dot'
                      style={{
                        display: 'inline-block', borderRadius: '50%',
                        width: '10px', height: '10px',
                        background: 'blue', margin: '0 5px 0 1px'
                      }}
                    ></p>
                  ) : (
                    ''
                  )}

                  <h5 style={{ display: 'inline-block' }}>{mail.subject}</h5>
                  <p className='text-muted' style={{ marginLeft: '15px' }}>{mail.from}</p>
                </div>
                <div>
                  <p className='text-muted'>{mail.date}</p>
                </div>
              </div>
              {showMessage === mail.id ? <Card.Text>{mail.message}</Card.Text> : ''}

            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};
