import './electronic.css';
import Navbar from '../../component/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../config';
import Techcatalog from '../../component/Techcatalog';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import jwtDecode from 'jwt-decode';
import { TbDeviceDesktopPlus } from 'react-icons/tb';
import { toast, Zoom, Flip } from 'react-toastify';
import { useCart } from 'react-use-cart';
import tippy from 'tippy.js';
import { useNavigate } from 'react-router-dom';

export default function Electronic() {
  const navigate = useNavigate();
  const {addItem} = useCart();
  const [techs, setTechs] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const user = localStorage.getItem('token');
  const [btns, setBtns] = useState(false);
  const [status, setStatus] = useState(0);
  const [techId, setTechId] = useState('');
  const [doc, setDoc] = useState({
    _id: '',
    title: '',
    desc: '',
    type: '',
    rating: '',
    count: '',
    price: ''
  });

  const posted = () => toast(`🆕 "${doc.title}" created..`,
    { toastId: 'posted', position: toast.POSITION.TOP_CENTER, autoClose: 1000, transition: Flip });

  const edited = () => toast(`✏️ "${doc.title}" edited..`,
    { toastId: 'edited', position: toast.POSITION.TOP_CENTER, autoClose: 1000, transition: Flip });

  const ids = techs.map(({ type }) => type);
  const filtered = techs.filter(({ type }, index) =>
    !ids.includes(type, index + 1));

  const submit = async (e) => {
    e.preventDefault();
    const parsedUser = JSON.parse(user);
    const config = {
      headers: {
        Authorization: `bearer ${parsedUser}`
      }
    };
    const updatedDoc = {
      ...doc,
      count: Number(doc.count),
      rating: Number(doc.rating),
      price: Number(doc.price)
    };

    if (status === 0) {
      delete updatedDoc._id;
      await axios.post(`${URL}/electronics`, updatedDoc, config)
        .then(res => {
          posted();
          setDoc({
            title: '',
            desc: '',
            type: '',
            rating: '',
            count: '',
            price: ''
          });
          setRefreshKey(refreshKey + 1);
        }).catch(err => alert(err));
    } else {
      await axios.put(`${URL}/electronics/${techId}`, updatedDoc, config)
        .then(res => {
          edited();
          setStatus(0);
          setDoc({
            title: '',
            desc: '',
            type: '',
            rating: '',
            count: '',
            price: ''
          });
          setRefreshKey(refreshKey + 1);
        }).catch(err => alert(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/electronics`);
        setTechs(res.data);
      } catch (err) {
        alert(err);
      }
    };

    fetchData();

    const checkUserRole = () => {
      if (user) {
        const parsedUser = jwtDecode(user);
        if (parsedUser?.role === 'admin') {
          setBtns(true);
        } else {
          setBtns(false);
        }
      }
    };

    checkUserRole();
  }, [user, refreshKey]);

  const toAbout = (item) => {
    localStorage.setItem('about_item', JSON.stringify(item));
    navigate('/about');
  };

  const favourited = (item) => {
    const favouriteToast = () => toast(`"${item.title}" added to favourites 💗`,
      { toastId: 'liked', position: toast.POSITION.TOP_CENTER, autoClose: 2000, transition: Flip });

    favouriteToast();

    const likedItems = JSON.parse(localStorage.getItem('liked')) || [];
    likedItems.push(item);
    localStorage.setItem('liked', JSON.stringify(likedItems));
  };

  const editTech = (item) => {
    setTechId(item._id);
    setDoc({
      title: item.title,
      desc: item.desc,
      type: item.type,
      rating: item.rating,
      count: item.count,
      price: item.price
    });
    setStatus(1);
  };

  const deleting = async (item) => {
    const deleteMessage = () => toast(`"${item.title}" successfully deleted❗`,
      { toastId: 'deleted', position: toast.POSITION.TOP_CENTER, autoClose: 3000, transition: Zoom });

    if (window.confirm(`Are you sure you want to delete this "${item?.title}" ❓`)) {
      const parsedUser = JSON.parse(user);
      const config = {
        headers: {
          Authorization: `bearer ${parsedUser}`
        }
      };

      await axios.delete(`${URL}/electronics/${item?._id}`, config)
        .then(res => {
          deleteMessage();
          setRefreshKey(refreshKey => refreshKey + 1);
        }).catch(err => alert(err));
    } else {
      console.log('cancelled !');
    }
  };

  const changeHandler = (e) => {
    setDoc({ ...doc, [e.target.name]: e.target.value });
  };

  const clean = () => {
    setDoc({
      _id: '',
      title: '',
      desc: '',
      type: '',
      rating: '',
      count: '',
      price: ''
    });
  };

  useEffect(() => {
    tippy('#post', { content: 'Add new Device' });
    tippy('#favourite', { content: 'Add to Favourite' });
    tippy('#edit', { content: 'Edit_Device' });
    tippy('#delete', { content: 'Delete_Device' });
  }, []);

  return (
    <div className='container'>
      <Navbar />
      <Techcatalog />
      {btns === true ?
        <div className="add_book_place">
          <TbDeviceDesktopPlus id='post' className='add_book' size={35} data-toggle="modal" data-target="#myModal" />
        </div> : null
      }
      <div className="row pb-5">
        {techs.length === 0 ? (<h1>Please add some device..</h1>) :
        techs.map((item) => {
          item['id'] = item._id;
          return (
            <div className="col-md-2 d-flex my-2" key={item._id}>
              <div className="card" >
                <div className="favourite_heart">
                  <svg id='favourite' onClick={() => favourited(item)}
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </div>
                <img onClick={() => toAbout(item)} className="card-img-top"
                  src="" alt="0" />
                <h4 className='card-footer'>{item.price} $</h4>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                </div>
                {btns === true ?
                  <div className="edit_place">
                    <AiOutlineEdit id='edit' onClick={() => editTech(item)}
                      className='edit_btn' data-toggle="modal" data-target="#myModal"
                      size={25} />
                    <MdOutlineDeleteSweep id='delete' onClick={() => deleting(item)}
                      size={25} />
                  </div> :
                  null
                }
                <button onClick={() => addItem(item)}
                  className='add_cart_btn'>Add to cart</button>
              </div>
              <div className="modal fade" id="myModal" data-backdrop="true">
                <div className="modal-dialog ">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">ADD_DEVICE</h4>
                      <button type="button" onClick={() => clean()} className="close"
                        data-dismiss="modal">&times;</button>
                    </div>
                    <form onSubmit={submit}>
                      <div className="modal-body">
                        <input className='form-control my-2'
                          type="text"
                          name="title" value={doc.title}
                          minLength='3' maxLength='30'
                          placeholder='title..' onChange={changeHandler} />
                        <input className='form-control my-2'
                          type="text" minLength='3'
                          name="desc" value={doc.desc}
                          placeholder='desc..' onChange={changeHandler} />
                        <input className='form-control my-2'
                          type="text"
                          name="rating" value={doc.rating}
                          placeholder='rating..' onChange={changeHandler} />
                        <input className='form-control my-2'
                          type="number"
                          name="count" value={doc.count}
                          placeholder='count..' onChange={changeHandler} />
                        <input className='form-control my-2'
                          type="number"
                          name="price" value={doc.price}
                          placeholder='price..' onChange={changeHandler} />
                        <select className="form-select"
                          value={doc.type} onChange={changeHandler}
                          name='type'
                        >
                          <option defaultValue='nothing'>Select type of device</option>
                          {filtered.map(tok => (
                            <option key={tok._id} value={tok.type}>{tok.type}</option>
                          ))}
                        </select>
                        <input className='form-control my-2'
                          type="text" minLength='2'
                          name="type" value={doc.type}
                          placeholder='new type..' onChange={changeHandler} />
                      </div>
                      <div className="modal-footer">
                        <button onClick={() => clean()} type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary"
                          data-toggle="modal" data-target="#myModal">SEND</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}