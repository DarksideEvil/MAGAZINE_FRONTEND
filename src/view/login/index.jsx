import './login.css'; 
import axios from "axios"; 
import { useState } from "react"; 
import { useNavigate } from 'react-router-dom'; 
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, 
  MDBTabsPane, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit'; 
import URL from '../../config';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
 
export default function Login () { 
  const [justifyActive, setJustifyActive] = useState('tab1'); 
  const [newUser, setNewUser] = useState({ 
    fullname: '', 
    phone: '', 
    email: '',
    password: '' 
  }); 
  const [data, setData] = useState({ 
    email: '', 
    password: '' 
  });
  const navigate = useNavigate(); 
  const notify = () => toast.success( `🎉 welcome ${newUser.fullname} `, 
    {toastId: 'new', position: toast.POSITION.BOTTOM_RIGHT, autoClose: 9000}); 
  const greeting = () => toast.success('😊 welcome back', 
  {toastId: 'old', position: toast.POSITION.BOTTOM_RIGHT}); 
 
  const handleJustifyClick = (value) => { 
    if (value === justifyActive) { 
      return; 
    } 
    setJustifyActive(value); 
  }; 
 
  const submit = async (e) => { 
    e.preventDefault(); 
    try { 
      const res = await axios.post(` ${URL}/auth `, data); 
      localStorage.setItem('token', JSON.stringify(res?.data?.jwt_key)); 
      data.email && data.password === 'BOSS' ?
      navigate('/chart') : navigate('/');
      greeting(); 
    } catch (err) { 
      toast.error(err?.response?.data || err); 
    } 
  }; 
 
  const changeHandler = (e) => { 
    setData({ ...data , [e.target.name] : e.target.value }); 
  }; 
 
  const signUp = async (e) => { 
    e.preventDefault(); 
    try { 
      const res = await axios.post(` ${URL}/signup `, newUser); 
      localStorage.setItem('token', res?.data?.jwt_key); 
      navigate('/'); 
      notify(); 
    } catch (err) { 
      toast.error(err?.response?.data || err); 
    } 
  }; 
 
  const changeHandler1 = (e) => { 
    setNewUser({ ...newUser , [e.target.name] : e.target.value }); 
  }; 
 
  return ( 
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50"> 
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'> 
        <MDBTabsItem> 
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}> 
            Login 
          </MDBTabsLink> 
        </MDBTabsItem> 
        <MDBTabsItem> 
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}> 
            Register 
          </MDBTabsLink> 
        </MDBTabsItem> 
      </MDBTabs> 
      <MDBTabsContent> 
        <MDBTabsPane show={justifyActive === 'tab1'}> 
          <div className="text-center mb-3"> 
            <p>Sign in with:</p> 
            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}> 
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}> 
                <MDBIcon fab icon='facebook-f' size="sm"/> 
              </MDBBtn> 
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}> 
                <MDBIcon fab icon='twitter' size="sm"/> 
              </MDBBtn> 
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}> 
                <MDBIcon fab icon='google' size="sm"/> 
              </MDBBtn> 
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}> 
                <MDBIcon fab icon='github' size="sm"/> 
              </MDBBtn> 
            </div> 
            <p className="text-center mt-3">or:</p> 
          </div> 
          <form onSubmit={submit}> 
            <label className='labl' htmlFor="">Email address</label> 
            <MDBInput onChange={changeHandler} name='email' value={data.email} required wrapperClass='mb-4' id='form1' type='' placeholder='email...' minLength='4' maxLength='30'/> 
            <label className='labl' htmlFor="">Password</label> 
            <MDBInput onChange={changeHandler} name='password' value={data.password} required wrapperClass='mb-4' id='form2' type='password' placeholder='password...' minLength='4' maxLength='30'/> 
            <div className="d-flex justify-content-between mx-4 mb-4"> 
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Remember me' /> 
              <a href="!#">Forgot password?</a> 
            </div> 
            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn> 
          </form> 
          <p className="text-center">Not a member? <a href="#!">Register</a></p> 
        </MDBTabsPane> 
        <MDBTabsPane show={justifyActive === 'tab2'}> 
          <div className="text-center mb-3"> 
            <p>Sign in with:</p> 
            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}> 
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}> 
                <MDBIcon fab icon='facebook-f' size="sm"/> 
              </MDBBtn> 
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}> 
                <MDBIcon fab icon='twitter' size="sm"/> 
              </MDBBtn> 
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}> 
                <MDBIcon fab icon='google' size="sm"/> 
              </MDBBtn> 
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}> 
                <MDBIcon fab icon='github' size="sm"/> 
              </MDBBtn> 
            </div> 
            <p className="text-center mt-3">or:</p> 
          </div> 
          <form onSubmit={signUp}> 
            <label className='labl' htmlFor="">Fullname</label> 
            <MDBInput onChange={changeHandler1} name='fullname' value={newUser.fullname} required wrapperClass='mb-4' minLength='3' maxLength='50' id='form1' type='text' placeholder='fullname...'/> 
            <label className='labl' htmlFor="">Mobile phone</label> 
            <MDBInput onChange={changeHandler1} name='phone' value={newUser.phone} wrapperClass='mb-4' minLength='11' maxLength='14' id='form1' type='tel' placeholder='Phone: ex:99891365...'/> 
            <label className='labl' htmlFor="">Email</label> 
            <MDBInput onChange={changeHandler1} name='email' value={newUser.email} required wrapperClass='mb-4' id='form1' type='email' placeholder='email...'/> 
            <label className='labl' htmlFor="">Password</label> 
            <MDBInput onChange={changeHandler1} name='password' value={newUser.password} required wrapperClass='mb-4' id='form1' type='password' placeholder='password...' minLength='4' maxLength='1024'/> 
            <div className='d-flex justify-content-center mb-4'> 
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' /> 
            </div> 
            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn> 
          </form> 
        </MDBTabsPane> 
      </MDBTabsContent> 
    </MDBContainer> 
  ); 
}