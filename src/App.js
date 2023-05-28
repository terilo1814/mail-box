import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, setReceivedMails } from './states/Reducers/AuthReducer';
import { Header } from './components/Header/Header';
import { MyEditor } from './components/Pages/MyEditor';
import { SignupLogin } from './components/SigupLogin/SignupLogin';
import { Routes, Route } from 'react-router-dom';
import { InboxPage } from './components/Pages/InboxPage';
import { fetchReceivedMails } from './components/Api/ApiContainer';


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();


  // PRESERVING THE DATA WHEN WE REFRESH IT
  useEffect(() => {
    const initialToken = localStorage.getItem('token');
    const initialMail = localStorage.getItem('mail');
    if (initialMail && initialToken) {
      dispatch(login({
        token: initialToken,
        email: initialMail,
      }));
    }
  }, []);

  // SENDING DATA TO REDUX
  const loginHandler = (data) => {
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('mail', data.email);
    dispatch(login({ token: data.idToken, email: data.email }));
  };




  const currentMail = useSelector((state) => state.auth.email);
 
  useEffect(() => {
    if(currentMail)
      fetchReceivedMails(currentMail,dispatch);
  }, [currentMail]);

  
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route
            path='/mail'
            element={
              <div>
                <Header />
                <MyEditor />
              </div>
            }
          />

          <Route path='/inbox' element={<div>
            <Header />
            <InboxPage />
          </div>} />
        </>

      ) : (
        <Route
          exact path="/"
          element={<SignupLogin onLogin={loginHandler} />}
        />
      )
      }
    </Routes >


  );
}

export default App;
