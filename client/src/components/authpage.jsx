import { useState } from 'react';
import Login from './login';
import SignupForm from './signupform';
import SignUp from './SignUp';

const AuthPage = () => {
  const [isLoginView, setLoginView] = useState(true);

  const toggleView = () => {
    setLoginView((prevIsLoginView) => !prevIsLoginView);
  };

  const goToLogin = () => {
    setLoginView(true);
  };

  return (
    <div>
      {isLoginView ? (
        <Login onSwitchToSignUp={toggleView} />
      ) : (
        // <SignupForm onBackToLogin={goToLogin} />
        <SignUp></SignUp>
      )}

      <p>
        {isLoginView
          ? "Don't have an account? Click here to"
          : 'Already have an account? Click here to'}
        <span onClick={toggleView}>
          {isLoginView ? ' Sign Up' : ' Log In'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;