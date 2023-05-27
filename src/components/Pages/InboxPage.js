import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const InboxPage = () => {
  const currentMail = useSelector((state) => state.auth.email);
  const [receivedMails, setReceivedMails] = useState([]);

  useEffect(() => {
    fetchReceivedMails();
  }, []);

  const fetchReceivedMails = async () => {
    try {
      const updatedSender = currentMail.replace(/[.@]/g, "");
      const response = await fetch(`https://mail-box-4cd6a-default-rtdb.firebaseio.com/mailbox/users/${updatedSender}/received.json`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const mails = Object.values(data);
          setReceivedMails(mails);
        }
      } else {
        throw new Error('Failed to fetch received mails');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className='mt-5'>
      <h1>Inbox</h1>
      {receivedMails.length === 0 ? (
        <p>No mails in the inbox</p>
      ) : (
        receivedMails.map((mail) => (
          <Card key={mail.id} className='mb-3'>
            <Card.Body>
              <div className='d-flex justify-content-between'>
                <div>
                  <h5>{mail.subject}</h5>
                  <p className='text-muted'>{mail.from}</p>
                </div>
                <div>
                  <p className='text-muted'>{mail.date}</p>
                </div>
              </div>
              <hr />
              <Card.Text>{mail.message}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};
