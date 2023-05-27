import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './states/Reducers/AuthReducer';
import { Header } from './components/Header/Header';
import { MyEditor } from './components/Pages/MyEditor';
import { SignupLogin } from './components/SigupLogin/SignupLogin';
import { Routes, Route } from 'react-router-dom';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const initialToken = localStorage.getItem('token');
  const initialMail = localStorage.getItem('mail');

  // PRESERVING THE DATA WHEN WE REFRESH IT
  useEffect(() => {
    if (initialMail && initialToken) {
      dispatch(login({
        token: initialToken,
        mail: initialMail,
      }));
    }
  }, []);

  // SENDING DATA TO REDUX
  const loginHandler = (data) => {
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('mail', data.email);
    dispatch(login({ token: data.idToken, email: data.email }));
  };


  return (
    <Routes>
      {isLoggedIn ? (
        <Route
          path='/mail'
          element={
            <div>
              <Header />
              <MyEditor />
            </div>
          }
        />
      ) : (
        <Route
          exact path="/"
          element={<SignupLogin onLogin={loginHandler} />}
        />
      )}
    </Routes>


  );
}

export default App;
