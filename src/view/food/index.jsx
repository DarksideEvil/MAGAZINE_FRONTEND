import './food.css';
import Navbar from '../../component/navbar';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import URL from '../../config';
import { useCart } from 'react-use-cart';
import Foodcatalog from '../../component/Foodcatalog';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import jwtDecode from 'jwt-decode';
import tippy from 'tippy.js';
import { toast, Zoom, Flip } from 'react-toastify';

function Food() {
  const [foods, setFoods] = useState([]);
  const { addItem } = useCart();
  const user = localStorage.getItem('token');
  const navigate = useNavigate();
  const [btns, setBtns] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [status, setStatus] = useState(0);
  const [foodId, setFoodId] = useState('');
  const [doc, setDoc] = useState({
    _id: '',
    title: '',
    desc: '',
    type: '',
    rating: '',
    count: '',
    price: ''
  });

  const posted = useCallback(() => {
    toast(`🆕 "${doc.title}" created..`,
      { toastId: 'posted', position: toast.POSITION.TOP_CENTER, autoClose: 1000, transition: Flip });
  }, [doc.title]);

  const edited = useCallback(() => {
    toast(`✏️ "${doc.title}" edited..`,
      { toastId: 'edited', position: toast.POSITION.TOP_CENTER, autoClose: 1000, transition: Flip });
  }, [doc.title]);

  const ids = useMemo(() => foods.map(({ type }) => type), [foods]);

  const filtered = useMemo(() => foods.filter(({ type }, index) =>
    !ids.includes(type, index + 1)), [foods, ids]);

  const submit = async (e) => {
    e.preventDefault();
    doc.count = Number(doc.count);
    doc.rating = Number(doc.rating);
    doc.price = Number(doc.price);
    if (status === 0) {
      delete doc._id;
      await axios.post(`${URL}/foods`, doc, {
        headers: {
          Authorization: `bearer ${JSON.parse(user)}`
        }
      })
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
      await axios.put(`${URL}/foods/${foodId}`, doc, {
        headers: {
          Authorization: `bearer ${JSON.parse(user)}`
        }
      })
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
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${URL}/foods`);
        setFoods(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchFoods();

    const checkUserRole = () => {
      if (user) {
        var org = jwtDecode(user);
        if (org?.role === 'admin') {
          setBtns(true);
        } else {
          setBtns(false);
        }
      }
    };
    checkUserRole();
  }, [user, refreshKey]);

  const favourited = useCallback((item) => {
    const favourited = () => toast(`"${item.title}" added to favourites 💗`,
      { toastId: 'liked', position: toast.POSITION.TOP_CENTER, autoClose: 2000, transition: Flip });
    favourited();
    var a = [];
    a = JSON.parse(localStorage.getItem('liked')) || [];
    a.push(item);
    localStorage.setItem('liked', JSON.stringify(a));
  }, []);

  const toAbout = useCallback((item) => {
    localStorage.setItem('about_item', JSON.stringify(item));
    navigate('/about');
  }, [navigate]);

  const changeHandler = useCallback((e) => {
    setDoc({ ...doc, [e.target.name]: e.target.value });
  }, [doc]);

  const editFood = useCallback((item) => {
    setFoodId(item._id);
    setDoc({
      title: item.title,
      desc: item.desc,
      type: item.type,
      rating: item.rating,
      count: item.count,
      price: item.price
    });
    setStatus(1);
  }, []);

  const deleting = useCallback(async (item) => {
    const deleteMessage = () => toast(`"${item.title}" successfully deleted❗`,
      { toastId: 'deleted', position: toast.POSITION.TOP_CENTER, autoClose: 3000, transition: Zoom });
    if (window.confirm(`Are you sure you want to delete this "${item?.title}" ❓`)) {
      await axios.delete(`${URL}/foods/${item?._id}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(user)}`
        }
      })
        .then(res => {
          deleteMessage();
          setRefreshKey(refreshKey => refreshKey + 1);
          alert('PRODUCT DELETED ❗');
        }).catch(err => alert(err));
    } else {
      console.log('cancelled !');
    }
  }, [user]);

  const clean = useCallback(() => {
    setDoc({
      _id: '',
      title: '',
      desc: '',
      type: '',
      rating: '',
      count: '',
      price: ''
    });
  }, []);

  useEffect(() => {
    tippy('#post', { content: 'Add new Food' });
    tippy('#favourite', { content: 'Add to Favourite' });
    tippy('#edit', { content: 'Edit_Food' });
    tippy('#delete', { content: 'Delete_Food' });
  }, []);

  return (
    <div className='container'>
      <Navbar />
      <Foodcatalog />
      {btns === true ?
        <div className="add_book_place">
          <IoFastFoodOutline id='post' className='add_book'
            size={35} data-toggle="modal" data-target="#myModal" />
        </div> : null
      }
      <div className="row pb-5">
        {foods.length === 0 ? (<h1>Please add some food..</h1>) :
          foods.map((item, index) => {
            item['id'] = item._id;
            return (
              <div className="col-md-2 d-flex my-2" key={index}>
                <div className="card" style={{ 'gridTemplateRows': '70px', 'display': 'grid' }}>
                  <div className="favourite_heart">
                    <svg id='favourite' onClick={() => favourited(item)}
                      className="bi bi-heart"
                      xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                      fill="currentColor" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4
                      3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834
                      3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838
                      -3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8
                      15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12
                      3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </div>
                  <img onClick={() => toAbout(item)} className="card-img-top" src=""
                    alt="0" />
                  <h4 className='card-footer'>{item?.price} $</h4>
                  <div className="card-body">
                    <h5 className="card-title">{item?.title}</h5>
                  </div>
                  {btns === true ?
                    <div className="edit_place">
                      <AiOutlineEdit id='edit' onClick={() => editFood(item)}
                        className='edit_btn' data-toggle="modal" data-target="#myModal"
                        size={25} />
                      <MdOutlineDeleteSweep id='delete' onClick={() => deleting(item)}
                        size={25} />
                    </div> :
                    null
                  }
                  <button onClick={() => addItem(item)} className='add_cart_btn'>Add to cart</button>
                </div>
                {/* modal */}
                <div className="modal fade" id="myModal" data-backdrop="true">
                  <div className="modal-dialog ">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">ADD_FOOD</h4>
                        <button type="button" onClick={() => clean()} className="close"
                          data-dismiss="modal">&times;</button>
                      </div>
                      <form onSubmit={submit}>
                        <div className="modal-body">
                          <input className='form-control my-2'
                            type="text" minLength='3' maxLength='50'
                            name="title" value={doc.title}
                            placeholder='title..'
                            onChange={changeHandler} required />
                          <input className='form-control my-2'
                            type="text" required minLength='3'
                            name="desc" value={doc.desc}
                            placeholder='desc..' onChange={changeHandler} />
                          <input className='form-control my-2'
                            type="text" required
                            name="rating" value={doc.rating}
                            placeholder='rating..' onChange={changeHandler} />
                          <input className='form-control my-2'
                            type="number" required
                            name="count" value={doc.count}
                            placeholder='count..' onChange={changeHandler} />
                          <input className='form-control my-2'
                            type="number" required
                            name="price" value={doc.price}
                            placeholder='price..' onChange={changeHandler} />
                          <select className="form-select"
                            value={doc.type} onChange={changeHandler}
                            name='type'
                          >
                            <option defaultValue='null'>
                              Select type of food
                            </option>
                            {
                              filtered.map(tok => {
                                return (
                                  <option key={tok._id} value={tok.type}>{tok.type}</option>
                                );
                              })
                            }
                          </select>
                          <input className='form-control my-2'
                            type="text"
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
                {/* modal */}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Food;