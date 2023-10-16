import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import URL from '../../config';

export default function Admin() {
  const [doc, setDoc] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const greeting = () => {
    toast(`WELCOME ${doc.email}`, {
      toastId: 'owner',
      position: toast.POSITION.TOP_CENTER,
      autoClose: 7000
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      let url = '';
      if (doc.email === 'ADMIN' && doc.password === 'ADMIN') {
        url = `${URL}/auth/admin`;
        navigate('/');
      } else if (doc.email === 'BOSS' && doc.password === 'BOSS') {
        url = `${URL}/auth/boss`;
        navigate('/chart');
      }

      const res = await axios.post(url, doc);
      localStorage.setItem('token', JSON.stringify(res?.data?.jwt_key));
      greeting();
    } catch (err) {
      alert(err?.response?.data || err);
    }
  };

  const changeHandler = (e) => {
    setDoc((prevDoc) => ({...prevDoc, [e.target.name]: e.target.value}));
  };

  return (
    <div className='wrap'>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">
              ADMIN PANEL
            </div>
            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={submit}>
                  <div className="form-group">
                    <label className="form-control-label">EMAIL</label>
                    <input
                      type="text"
                      className="form-control formm"
                      onChange={changeHandler}
                      name='email'
                      value={doc.email}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      className="form-control formm"
                      onChange={changeHandler}
                      name='password'
                      value={doc.password}
                      required
                    />
                  </div>
                  <div className="col-lg-12 loginbttm">
                    <div className="col-lg-6 login-btm login-text">
                      {/* Error Message */}
                    </div>
                    <div className="col-lg-6 login-btm login-button">
                      <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}