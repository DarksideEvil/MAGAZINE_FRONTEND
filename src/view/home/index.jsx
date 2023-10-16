import Navbar from '../../component/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import URL from '../../config';
import { useCart } from 'react-use-cart';
import tippy from 'tippy.js';
import { toast, Flip } from 'react-toastify';

function Home () {    
    const [books, setBooks] = useState([]);
    const [dresses, setDresses] = useState([]);
    const [foods, setFoods] = useState([]);
    const { addItem } = useCart();
    const user = localStorage.getItem('token');

    useEffect(() => {
        const notify = () => toast(`⬆️ sign up for new adventures`, 
        {toastId: 'notification', 
        position: toast.POSITION.TOP_RIGHT, autoClose: 15000,
        transition: Flip});

        const fetchData = async () => {
            try {
                const [booksRes, dressesRes, foodsRes] = await Promise.all([
                    axios.get(`${URL}/books`),
                    axios.get(`${URL}/dresses`),
                    axios.get(`${URL}/foods`)
                ]);
                setBooks(booksRes.data);
                setDresses(dressesRes.data);
                setFoods(foodsRes.data);
            } catch (err) {
                alert(err);
            }
        };

        fetchData();

        if (!user) {
            setTimeout(() => {
                notify();
            }, 15000);
        } else {
            console.log('null');
        }
    }, [user]);

    const favourited = (item) => {
        toast(`"${item.title}" added to favourites 💗`, {
            toastId: 'liked',
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            transition: Flip
        });

        const a = JSON.parse(localStorage.getItem('liked')) || [];
        a.push(item);
        localStorage.setItem('liked', JSON.stringify(a));
    };

    tippy('#favourite', {content: 'Add to Favourite'});

    return (
        <>
            <div className="container">
                <Navbar />
                <div className="row pb-5">
                {
                    books.slice(1,4).map((item, index) => {
                        item['id'] = item._id;
                        return (
                            <div className="col-md-2 d-flex my-2" key={index}>
                                <div className="card">
                                    <div className="favourite_heart">
                                        <svg id='favourite' onClick={() => favourited(item)} 
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                    </div>
                                    <img className="card-img-top" src="" alt="0" />
                                    <h4 className='card-footer'>{item.price} $</h4>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                    </div>
                                    <button onClick={() => addItem(item)} className='add_cart_btn'>Add to cart</button>
                                </div>
                            </div>
                        );
                    })
                }
                {
                    dresses.slice(2, 12).map((item, index) => {
                        item['id'] = item._id;
                        return (
                            <div className="col-md-2 d-flex my-2" key={index}>
                                <div className="card">
                                    <div className="favourite_heart">
                                        <svg id='favourite' onClick={() => favourited(item)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                    </div>
                                    <img className="card-img-top" 
                                    src="" 
                                    alt="0" />
                                    <h4 className='card-footer'>{item.price} $</h4>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.desc}</p>
                                    </div>
                                    <button onClick={() => addItem(item)} className='add_cart_btn'>Add to cart</button>
                                </div>
                            </div>
                        );
                    })
                }
                {
                    foods.slice(2, 9).map((item, index) => {
                        item['id'] = item._id;
                        return (
                            <div className="col-md-2 d-flex my-2" key={index}>
                                <div className="card">
                                    <div className="favourite_heart">
                                        <svg  id='favourite' onClick={() => favourited(item)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                    </div>
                                    <img className="card-img-top" src="" alt="0" />
                                    <h4 className='card-footer'>{item.price} $</h4>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                    </div>
                                    <button onClick={() => addItem(item)} className='add_cart_btn'>Add to cart</button>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        </>
    );
}
export default Home