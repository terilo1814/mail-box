import { useEffect } from "react";
import { SignupLogin } from "./components/SigupLogin/SignupLogin";
import { login } from "./states/Reducers/AuthReducer";
import { useDispatch } from "react-redux";


function App() {

  const dispatch = useDispatch()

  const initialToken = localStorage.getItem('token')
  const initialMail = localStorage.getItem('mail')

  useEffect(() => {
    if (initialMail && initialToken) {
      dispatch(login({
        token: initialToken,
        mail: initialMail
      }))
    }

  }, [])

  const loginHandler = (token, email) => {
    localStorage.setItem('token', token)
    localStorage.setItem('mail', email)
    dispatch(login({ token, email }))
  }


  return (
    <>
      <SignupLogin onLogin={loginHandler} />
    </>
  );
}

export default App;
