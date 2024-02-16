import { useContext, useState } from 'react';
import './Login.css'
import SuperAdminContext from 'context/admin/adminContext';
import ButtonLoader from 'components/Loading/BtnLoader';
import NotificationAlert from "react-notification-alert";
import React from 'react';
export default function Login() {

  const [credentials, setCredentials] = useState({ usernameOrEmail: "", password: "" })

  const context = useContext(SuperAdminContext);

  const { Login } = context;

  const handleClick = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (credentials.usernameOrEmail.length === 0 || credentials.password.length === 0) {
      showToastMessage("Please enter your Email and Password!", "warning");
      return;
    }
    await Login(credentials);
    setButtonDisabled(false);
  }
 

  const onChange = (e) => {
    if (e.target.name === "usernameOrEmail" && e.target.value.includes(' ')) {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value.replace(/\s+/g, '')
      })
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  }

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const notificationAlertRef = React.useRef(null);
  
  const showToastMessage = (message, type) => {
    var options = {};
    options = {
      place: 'tr',
      message: message,
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef}/>
      </div>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email or Username</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email or Username"
                value={credentials.emailOrUsername}
                id="usernameOrEmail"
                name="usernameOrEmail"
                onChange={onChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={credentials.password}
                name="password"
                onChange={onChange}
              />
            </div>
            <div className="d-grid mt-3">
              <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={handleClick}>
                {
                  buttonDisabled ? <ButtonLoader /> : "Sign In"
                }
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}
