import './cart.css';
import Navbar from '../../component/navbar';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple
  } from "mdb-react-ui-kit";
import tippy from 'tippy.js';
import { toast, Flip } from 'react-toastify';
import URL from '../../config';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

export default function Cart () {
    const {
        totalItems,
        updateItemQuantity,
        items,
        removeItem,
        isEmpty,
        cartTotal
    } = useCart();

    const note = () => toast('first of all, sign up ⬆️', 
    {toastId: 'note', position: toast.POSITION.TOP_RIGHT, autoClose: 2000, transition: Flip});

    const navigate = useNavigate();
    const user = localStorage.getItem('token');

    const [product, setProduct] = useState(() => {
        const sesProduct = sessionStorage.getItem('product');
        return sesProduct ? JSON.parse(sesProduct) : null;
    });
    
    const products = JSON.parse(localStorage.getItem('react-use-cart'));
    const decrement = (prod) => {
    const updatedItems = products.items.map(element => {
        if (element._id === prod._id) {
            updateItemQuantity(element._id, element.quantity - 1);
            element.itemTotal = element.itemTotal - element.price;
            element.quantity = element.quantity - 1;
            return element;
        } else {
            return element;
        }
    });
    setProduct(updatedItems.find(item => item._id === prod._id));
}

const increment = (prod) => {
    const updatedItems = products.items.map(element => {
        if (element._id === prod._id) {
            updateItemQuantity(element._id, element.quantity + 1);
            element.itemTotal = element.itemTotal + element.price;
            element.quantity = element.quantity + 1;
            return element;
        } else {
            return element;
        }
    });
    setProduct(updatedItems.find(item => item._id === prod._id));
}
    
    const checkout = async () => {
        try {
            if (user) {
                const org = jwtDecode(user);
                const res = await fetch(`${URL}/checkout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({product, org})
                });
                const data = await res.json();
                window.location = data.url;
            } else note();
        } catch (err) {
            alert(err);
        }
    }

    if (isEmpty)
        return (
            <div className='container'>
                <Navbar />
                <div className="empty_cart">
                    <img onClick={() => navigate('/')} className='cart_svg' src="shopping-card.gif" alt="0" />
                    <h2>Your cart's empty...</h2>
                </div>
            </div>
        );

    const favourited = (item) => {
        const favourited = () => toast(`"${item.title}" added to favourites 💗`, 
        {toastId: 'liked', position: toast.POSITION.TOP_CENTER, autoClose: 2000, transition: Flip});
        favourited();
        var a = [];
        a = JSON.parse(localStorage.getItem('liked')) || [];
        a.push(item);
        localStorage.setItem('liked', JSON.stringify(a));
    }

    tippy('#favourite', {content: 'Add to Favourite'});
    tippy('#remove', {content: 'remove'});

    return (
        <div className='container'>
        <Navbar />
            <MDBRow className="justify-content-center mb-0">
                <MDBCol md="12" xl="10">
                {
                    items.map(item => {
                        return (
                            <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3" key={item._id}>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                        <MDBRipple
                                            rippleColor="light"
                                            rippleTag="div"
                                            className="bg-image rounded hover-zoom hover-overlay"
                                        >
                                            <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                                            fluid
                                            className="w-100"
                                            />
                                            <a href="#!">
                                            <div
                                                className="mask"
                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                            ></div>
                                            </a>
                                        </MDBRipple>
                                        </MDBCol>
                                        <MDBCol md="6">
                                        <h5>{item.title}</h5>
                                        <div className="d-flex flex-row">
                                            <div className="text-danger mb-1 me-2">
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                            <MDBIcon fas icon="star" />
                                            </div>
                                            {/* <span>310</span> */}
                                        </div>
                                        <div className="mt-1 mb-0 text-muted small">
                                            <span>100% cotton</span>
                                            <span className="text-primary"> • </span>
                                            <span>Light weight</span>
                                            <span className="text-primary"> • </span>
                                            <span>
                                            Best finish
                                            <br />
                                            </span>
                                        </div>
                                        <div className="mb-2 text-muted small">
                                            <span>Unique design</span>
                                            <span className="text-primary"> • </span>
                                            <span>For men</span>
                                            <span className="text-primary"> • </span>
                                            <span>
                                            Casual
                                            <br />
                                            </span>
                                        </div>
                                        <p className="text-truncate mb-4 mb-md-0">
                                            {item.desc}
                                        </p>
                                        <div className="cancel">
                                            <svg id='favourite' onClick={() => favourited(item)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart like_btn" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                            </svg>
                                            <svg id='remove' onClick={() => {
                                            removeItem(item._id);
                                            }} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x cancel_btn" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </div>
                                        </MDBCol>
                                        <MDBCol
                                        md="6"
                                        lg="3"
                                        className="border-sm-start-none border-start"
                                        onClick={() => sessionStorage.setItem('product',
                                        JSON.stringify(item))}
                                        >
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h4 className="mb-1 me-1">{item.itemTotal} $</h4>
                                            <span className="text-danger">
                                            <s>$20.99</s>
                                            </span>
                                        </div>
                                        <h6 className="text-success">Free shipping</h6>
                                        <div className="d-flex flex-column mt-4" style={{textAlign: 'center'}}>
                                        <button onClick={checkout} className='buy'>Buy</button>
                                            <div className="plus_minus">
                                                <svg onClick={() => decrement(item)}
                                            xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                                <h6 className='qty'>{item.quantity}</h6>
                                                <svg onClick={() => increment(item)}
                                            xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        );
                    })
                }
                </MDBCol>
                <div className="col-md-4 mb-5 mt-3">
                    <div className="itogo">
                        <div className="item_qty">
                            <h6>Total: {totalItems} Products</h6>
                        </div>
                        <div className="total_price">
                            <h2>Pricetotal</h2>
                            <h2>{cartTotal} $</h2>
                        </div>
                        <div className="promocode">
                            <input className='promocode_inp' placeholder='Promocode...' type="text" />
                            <input className='promo_submitter' type="submit" />
                        </div>
                    </div>
                </div>
            </MDBRow>
            
        </div>
    );
}