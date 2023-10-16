import './converse.css';
import Navbar from '../../navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import URL from '../../../config';
import zoomGif from '../../wallpapers/zoom.gif';

export default function Converse () {

    const navigate = useNavigate();
    const { addItem } = useCart();
    const [converse, setConverse] = useState([]);

    useEffect(() => {
        const foo = async () => {
            await axios.get(`${URL}/reports/converse`)
            .then(res => setConverse(res.data))
            .catch(err => alert(err));
        }
        foo();
    }, []);

    const favourited = (item) => {
        var a = [];
        a = JSON.parse(localStorage.getItem('liked')) || [];
        a.push(item);
        localStorage.setItem('liked', JSON.stringify(a));
    }

    const toAbout = ( item ) => {
        localStorage.setItem('about_item', JSON.stringify(item));
        navigate('/about');
    }

    return (
        <div className='container'>
            <Navbar />
            <div className="row pb-5">
                {
                    converse.length === 0 ?
                    <div className='not_found_place'>
                        <img onClick={() => navigate('/dress')} 
                        className='not_found_img' 
                        src={zoomGif} alt="0" />
                        <h2>Converses not found</h2>
                    </div> :
                    converse.map(item => {
                        item['id'] = item._id;
                        return (
                            <div className="col-md-2 d-flex" key={item._id}>
                                <div className="card">
                                    <div className="favourite_heart">
                                        <i onClick={() => favourited(item)} className="bi bi-heart" data-toggle="tooltip" data-placement="bottom" title="Add favourite">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                            </svg>
                                        </i>
                                    </div>
                                    <img onClick={() => toAbout(item)} className="card-img-top" 
                                    src="./convers.png" 
                                    alt="0" />
                                    <h4 className='card-footer'>{item?.price} $</h4>
                                    <div className="card-body">
                                        <h5 className="card-title">{item?.title}</h5>
                                    </div>
                                    <button onClick={() => addItem(item)} className='add_cart_btn'>Add to cart</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}