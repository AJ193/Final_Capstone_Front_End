import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSignOut, useAuthUser } from 'react-auth-kit';
import Alert from '../layouts/Alert';

function About() {
  const auth = useAuthUser();
  const singOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || null;
  const [alert, setAlert] = useState('');

  const logout = () => {
    singOut();
    navigate('/login');
  };

  // Clear registration message
  useEffect(() => {
    if (message) {
      setAlert(decodeURIComponent(message));
      setTimeout(() => {
        setAlert('');
      }, 3000);
    }
  }, [message]);

  return (
    <>
      <div>
        {alert && <Alert msg={alert} />}
        <h1>About</h1>
        <h3>{`Hello ${auth().email}`}</h3>
        <button
          type="button"
          onClick={logout}
          className="hover:bg-newGreen rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default About;
