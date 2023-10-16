import './book.css';
import Navbar from '../../component/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../config';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { FaBookMedical } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import { useRef } from 'react';
import tippy from 'tippy.js';
import { toast, Zoom, Flip } from 'react-toastify';

function Book () {
    const { addItem } = useCart();
    const navigate = useNavigate();
    const titleRef = useRef();
    const descRef = useRef();
    const ratingRef = useRef();
    const countRef = useRef();
    const priceRef = useRef();
    const user = localStorage.getItem('token');
    const [books, setBooks] = useState([]);
    const [btns, setBtns] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [status , setStatus] = useState(0);
    const [bookId, setBookId] = useState('');
    const [doc, setDoc] = useState({
        _id: '',
        title: '',
        desc: '',
        rating: '',
        count: '',
        price: ''
    });
    const posted = () => toast(`🆕 "${doc.title}" created..`, 
    {toastId: 'posted', position: toast.POSITION.TOP_CENTER, autoClose: 1000, transition: Flip});
    const edited = () => toast(`✏️ "${doc.title}" edited..`, 
    {toastId: 'edited', position: toast.POSITION.TOP_CENTER, autoClose: 1000, transition: Flip});

    const submit = async (e) => {
        e.preventDefault();
        doc.count = Number(doc.count);
        doc.rating = Number(doc.rating);
        doc.price = Number(doc.price);
        if (status === 0) {
            delete doc._id;
            await axios.post(`${URL}/books`, doc, {
                headers: {
                    Authorization: `bearer ${JSON.parse(user)}`
                }
            })
            .then(res => {
                posted();
                setDoc({
                    title: '',
                    desc: '',
                    rating: '',
                    count: '',
                    price: ''
                });
                setRefreshKey(refreshKey + 1);
            }).catch(err => alert(err));
        } else {
            await axios.put(`${URL}/books/${bookId}`, doc, {
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
                    rating: '',
                    count: '',
                    price: ''
                });
                setRefreshKey(refreshKey + 1);
            }).catch(err => alert(err));
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
              const res = await axios.get(`${URL}/books`);
              setBooks(res.data);
            } catch (err) {
            }
          };
          fetchBooks();
      
          const checkUserRole = () => {
            const user = localStorage.getItem('token');
            if (user) {
              const org = jwtDecode(JSON.parse(user));
              setBtns(org?.role === 'admin');
            }
          };
          checkUserRole();
    }, [user, refreshKey]);

    const favourited = (item) => {
        const favourited = () => toast(`"${item.title}" added to favourites 💗`, 
        {toastId: 'liked', position: toast.POSITION.TOP_CENTER, autoClose: 2000, transition: Flip});
        favourited();
        var a = [];
        a = JSON.parse(localStorage.getItem('liked')) || [];
        a.push(item);
        localStorage.setItem('liked', JSON.stringify(a));
    }

    const toAbout = ( item ) => {
        localStorage.setItem('about_item', JSON.stringify(item));
        navigate('/about');
    }

    const editBook = (item) => {
        setBookId(item._id);
        setDoc({
            title: item.title,
            desc: item.desc,
            rating: item.rating,
            count: item.count,
            price: item.price
        });
        setStatus(1);
    }

    const deleting = async (item) => {
    const deleteMessage = () => toast(`"${item.title}" successfully deleted❗`, 
    {toastId: 'deleted', position: toast.POSITION.TOP_CENTER, autoClose: 3000, transition: Zoom});
        if (window.confirm(`Are you sure you want to delete this "${item?.title}" ❓`)){
            await axios.delete(`${URL}/books/${item?._id}`, {
                headers: {
                    Authorization: `bearer ${JSON.parse(user)}`
                }
            })
            .then(res => {
                deleteMessage();
                setRefreshKey(refreshKey + 1);
            }).catch(err => alert(err));
        } else {
            console.log('cancelled !');
        }
    }

    const changeHandler = (e) => {
        setDoc({ ...doc , [e.target.name] : e.target.value });
      }

      const clean = () => {
        setDoc({
            _id: '',
            title: '',
            desc: '',
            rating: '',
            count: '',
            price: ''
        });
    }

    tippy('#post', {content: 'Add new Book'});
    tippy('#favourite', {content: 'Add to Favourite'});
    tippy('#edit', {content: 'Edit_Book'});
    tippy('#delete', {content: 'Delete_Book'});

    return (
        <div className='container'>
            <Navbar />
            {
                btns === true ?
                <div className="add_book_place">
                    <FaBookMedical id='post' className='add_book' size={35} 
                    data-toggle="modal" data-target="#myModal" />
                </div> : null
            }
            <div className="row pb-5">
            {
                books.length === 0 ? (<h1>Please add some book..</h1>) :
                (books.map(item => {
                    item['id'] = item?._id;
                    return (
                        <div className="col-md-2 d-flex my-2" key={item?._id}>
                            <div className="card">
                                <div className="favourite_heart">
                                        <svg id='favourite' onClick={() => favourited(item)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                </div>
                                <img onClick={() => toAbout(item)} className="card-img-top" src="" 
                                alt="0" />
                                <h4 className='card-footer'>{item?.price} $</h4>
                                <div className="card-body">
                                    <h5 className="card-title">{item?.title}</h5>
                                </div>
                                {
                                        btns === true ?
                                        <div className="edit_place">
                                        <AiOutlineEdit id='edit' type='submit' onClick={() => editBook(item)} 
                                        className='edit_btn' 
                                        size={25} data-toggle="modal" data-target="#myModal" />
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
                                            <h4 className="modal-title">ADD_BOOK</h4>
                                            <button type="button" onClick={() => clean()} className="close" 
                                            data-dismiss="modal">&times;</button>
                                        </div>
                                        <form onSubmit={submit}>
                                            <div className="modal-body">
                                                    <input className='form-control my-2'
                                                    type="text" ref={titleRef} 
                                                    minLength='3' maxLength='30'
                                                    name="title" value={doc.title} 
                                                    placeholder='title..' onChange={changeHandler} />
                                                    <input className='form-control my-2'
                                                    type="text" ref={descRef} minLength='3'
                                                     name="desc" value={doc.desc} 
                                                    placeholder='desc..' onChange={changeHandler} />
                                                    <input className='form-control my-2'
                                                    type="text" ref={ratingRef}
                                                     name="rating" value={doc.rating} 
                                                    placeholder='rating..' onChange={changeHandler} />
                                                    <input className='form-control my-2'
                                                    type="number" ref={countRef}
                                                    name="count" value={doc.count} 
                                                    placeholder='count..' onChange={changeHandler} />
                                                    <input className='form-control my-2'
                                                    type="number" ref={priceRef}
                                                    name="price" value={doc.price} 
                                                    placeholder='price..' onChange={changeHandler} />
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
                    );
                }))
            }
            </div>
        </div>
    );
}
export default Book;