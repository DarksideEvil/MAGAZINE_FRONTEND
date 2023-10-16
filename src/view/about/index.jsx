import Navbar from "../../component/navbar"
import { useCart } from "react-use-cart";

export default function About () {
    const { addItem } = useCart();
    const product = JSON.parse(localStorage.getItem('about_item'));
    return (
        <div className="container">
            <Navbar />
            <div className="row pb-5">
                <div className="card">
                    <div className="favourite_heart">
                        <i className="bi bi-heart" data-toggle="tooltip" data-placement="bottom" title="Add favourite">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </i>
                    </div>
                        <img className="card-img-top" src=
                        "./interface_1.png"
                        alt="0" />
                        <h4 className='card-footer'>{product.price} $</h4>
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <div className="card-text">{product.desc}</div>
                    </div>
                        <button onClick={() => addItem(product)} className='add_cart_btn'>Add to cart</button>
                </div>
            </div>
        </div>
    );
}