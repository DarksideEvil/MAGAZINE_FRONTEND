import './favor.css';
import Navbar from '../../component/navbar';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import tippy from 'tippy.js';

export default function Favourite() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [prod, setProd] = useState([]);

  useEffect(() => {
    const likedData = JSON.parse(localStorage.getItem('liked'));
    if (likedData) {
      setProd(likedData);
    }
  }, []);

  const removeAllFavor = () => {
    localStorage.removeItem('liked');
    setProd([]);
  };

  useEffect(() => {
    tippy('#unlike', { content: 'remove from favourites' });
    tippy('#removeAll', { content: 'remove all favourites' });
  }, [prod]);

  if (prod.length === 0) {
    return (
      <div className='container'>
        <Navbar />
        <div className="none_favorites">
          <img onClick={() => navigate('/')} className='favor_img' src="./favorites.gif" alt="0" />
          <h2>You haven't saved favorites yet...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <Navbar />
      <div className="favor_header">
        <h1 className='favor_title'>Favourites</h1>
        <svg className="bi bi-calendar2-x remove_icn" id='removeAll' onClick={removeAllFavor} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z" />
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
          <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
        </svg>
      </div>
      <div className="row">
        {prod.map(item => (
          <div className="col-md-4 d-flex my-3" key={item._id}>
            <div className="card">
              <div className="favourite_heart">
                <svg id='unlike' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </div>
              <img className="card-img-top" src="" alt="0" />
              <h4 className='card-footer'>{item.price} $</h4>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <div className="card-text">{item.desc}</div>
              </div>
              <button onClick={() => addItem(item)} className='add_cart_btn'>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}