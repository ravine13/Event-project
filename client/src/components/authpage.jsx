import { useState } from 'react';
import SignIn from './SignIn';
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
        <SignIn onSwitchToSignUp={toggleView} />
      ) : (
        <SignUp onBackToLogin={goToLogin} />
        
      )}

      
    </div>
  );
};

export default AuthPage;