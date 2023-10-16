import Navbar from '../../component/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../config';
import { useCart } from 'react-use-cart';
import Dresscatalog from '../../component/Dresscatalog';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { TbShirtSport } from 'react-icons/tb';
import jwtDecode from 'jwt-decode';
import { toast, Zoom, Flip } from 'react-toastify';
import tippy from 'tippy.js';

function Dress() {
  const navigate = useNavigate();
  const [dresses, setDresses] = useState([]);
  const { addItem } = useCart();
  const [btns, setBtns] = useState(false);
  const user = localStorage.getItem('token');
  const [refreshKey, setRefreshKey] = useState(0);
  const [status, setStatus] = useState(0);
  const [dressId, setDressId] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');
  const [count, setCount] = useState('');
  const [price, setPrice] = useState('');

  const posted = () =>
    toast(`🆕 "${title}" created..`, {
      toastId: 'posted',
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      transition: Flip,
    });

  const edited = () =>
    toast(`✏️ "${title}" edited..`, {
      toastId: 'edited',
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      transition: Flip,
    });

  const ids = dresses.map(({ type }) => type);
  const filtered = dresses.filter(({ type }, index) =>
  !ids.includes(type, index + 1));

  const submit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      desc,
      type,
      rating: Number(rating),
      count: Number(count),
      price: Number(price),
    };
    if (status === 0) {
      delete doc._id;
      await axios
        .post(`${URL}/dresses`, doc, {
          headers: {
            Authorization: `bearer ${JSON.parse(user)}`,
          },
        })
        .then((res) => {
          posted();
          setTitle('');
          setDesc('');
          setType('');
          setRating('');
          setCount('');
          setPrice('');
          setRefreshKey(refreshKey + 1);
        })
        .catch((err) => alert(err));
    } else {
      await axios
        .put(`${URL}/dresses/${dressId}`, doc, {
          headers: {
            Authorization: `bearer ${JSON.parse(user)}`,
          },
        })
        .then((res) => {
          edited();
          setStatus(0);
          setTitle('');
          setDesc('');
          setType('');
          setRating('');
          setCount('');
          setPrice('');
          setRefreshKey(refreshKey + 1);
        })
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const res = await axios.get(`${URL}/dresses`);
        setDresses(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchDresses();

    const checkUserRole = () => {
      if (user) {
        const org = jwtDecode(user);
        setBtns(org?.role === 'admin');
      }
    };
    checkUserRole();
  }, [user, refreshKey]);

  const favourited = (item) => {
    const favourited = () =>
      toast(`"${item.title}" added to favourites 💗`, {
        toastId: 'liked',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        transition: Flip,
      });
    favourited();
    const likedItems = JSON.parse(localStorage.getItem('liked')) || [];
    likedItems.push(item);
    localStorage.setItem('liked', JSON.stringify(likedItems));
  };

  const toAbout = (item) => {
    localStorage.setItem('about_item', JSON.stringify(item));
    navigate('/about');
  };

  const editDress = (item) => {
    setDressId(item._id);
    setTitle(item.title);
    setDesc(item.desc);
    setType(item.type);
    setRating(item.rating);
    setCount(item.count);
    setPrice(item.price);
    setStatus(1);
  };

  const deleting = async (item) => {
    const deleteMessage = () =>
      toast(`"${item.title}" successfully deleted❗`, {
        toastId: 'deleted',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        transition: Zoom,
      });

    if (window.confirm(`Are you sure you want to delete this "${item?.title}" ❓`)) {
      await axios
        .delete(`${URL}/dresses/${item?._id}`, {
          headers: {
            Authorization: `bearer ${JSON.parse(user)}`,
          },
        })
        .then((res) => {
          deleteMessage();
          setRefreshKey(refreshKey + 1);
          alert('PRODUCT DELETED ❗');
        })
        .catch((err) => alert(err));
    } else {
      console.log('cancelled !');
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'desc':
        setDesc(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'rating':
        setRating(value);
        break;
      case 'count':
        setCount(value);
        break;
      case 'price':
        setPrice(value);
        break;
      default:
        break;
    }
  };

  const clean = () => {
    setTitle('');
    setDesc('');
    setType('');
    setRating('');
    setCount('');
    setPrice('');
  };

  tippy('#post', { content: 'Add new Dress' });
  tippy('#favourite', { content: 'Add to Favourite' });
  tippy('#edit', { content: 'Edit_Dress' });
  tippy('#delete', { content: 'Delete_Dress' });

  return (
    <div className='container'>
      <Navbar />
      <Dresscatalog />
      {btns === true ? (
        <div className='add_book_place'>
          <TbShirtSport
            id='post'
            className='add_book'
            size={35}
            data-toggle='modal'
            data-target='#myModal'
          />
        </div>
      ) : null}
      <div className='row pb-5'>
        {dresses.length === 0 ? (<h1>Please add some dress..</h1>) :
        dresses.map((item) => {
          item['id'] = item._id;
          return (
            <div className='col-md-2 d-flex my-2' key={item._id}>
              <div className='card'>
                <div className='favourite_heart'>
                  <svg
                    onClick={() => favourited(item)}
                    id='favourite'
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-heart'
                    viewBox='0 0 16 16'
                  >
                    <path
                      d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'
                    />
                  </svg>
                </div>
                <img
                  onClick={() => toAbout(item)}
                  className='card-img-top'
                  src=''
                  alt='0'
                />
                <h4 className='card-footer'>{item.price} $</h4>
                <div className='card-body'>
                  <h5 className='card-title'>{item.title}</h5>
                </div>
                {btns === true ? (
                  <div className='edit_place'>
                    <AiOutlineEdit
                      id='edit'
                      type='submit'
                      onClick={() => editDress(item)}
                      className='edit_btn'
                      size={25}
                      data-toggle='modal'
                      data-target='#myModal'
                    />
                    <MdOutlineDeleteSweep
                      id='delete'
                      onClick={() => deleting(item)}
                      size={25}
                    />
                  </div>
                ) : null}
                <button onClick={() => addItem(item)} className='add_cart_btn'>
                  Add to cart
                </button>
              </div>
              {/* modal */}
              <div className='modal fade' id='myModal' data-backdrop='true'>
                <div className='modal-dialog '>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h4 className='modal-title'>ADD_DRESS</h4>
                      <button
                        type='button'
                        onClick={() => clean()}
                        className='close'
                        data-dismiss='modal'
                      >
                        &times;
                      </button>
                    </div>
                    <form onSubmit={submit}>
                      <div className='modal-body'>
                        <input
                          className='form-control my-2'
                          type='text'
                          name='title'
                          value={title}
                          minLength='3'
                          maxLength='30'
                          placeholder='title..'
                          onChange={changeHandler}
                        />
                        <input
                          className='form-control my-2'
                          type='text'
                          name='desc'
                          value={desc}
                          minLength='3'
                          placeholder='desc..'
                          onChange={changeHandler}
                        />
                        <input
                          className='form-control my-2'
                          type='text'
                          name='rating'
                          value={rating}
                          placeholder='rating..'
                          onChange={changeHandler}
                        />
                        <input
                          className='form-control my-2'
                          type='number'
                          name='count'
                          value={count}
                          placeholder='count..'
                          onChange={changeHandler}
                        />
                        <input
                          className='form-control my-2'
                          type='number'
                          name='price'
                          value={price}
                          placeholder='price..'
                          onChange={changeHandler}
                        />
                        <select
                          className='form-select'
                          value={type}
                          onChange={changeHandler}
                          name='type'
                        >
                          <option defaultValue='nothing'>
                            Select type of dress
                          </option>
                          {filtered.map((tok) => {
                            return (
                              <option key={tok._id} value={tok.type}>
                                {tok.type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className='modal-footer'>
                        <button
                          onClick={() => clean()}
                          type='button'
                          className='btn btn-secondary'
                          data-dismiss='modal'
                        >
                          Close
                        </button>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          data-toggle='modal'
                          data-target='#myModal'
                        >
                          SEND
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* modal */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dress;