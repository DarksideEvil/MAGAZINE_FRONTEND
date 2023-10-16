import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { useState, useEffect } from 'react';
import { BiLogInCircle } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai';
import { BsInfoLg, BsCart3 } from 'react-icons/bs';
import navbarImg from '../wallpapers/open_store.png';
import tippy from 'tippy.js';

function Navbar () {

    const { totalItems } = useCart();
    const [logout, setLogout] = useState(false);
    const user = localStorage.getItem('token');
    
    useEffect(() => {
        const foo = () => {
            if (user) {
                setLogout(true);
            } else setLogout(false);
        }
        foo();
    }, [ user, logout]);

    const signOut = () => {
        if (user)
            localStorage.clear();
    }

    tippy('#logout', {content: 'Logout'});
    tippy('#login', {content: 'Login'});

    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-4">
        <a className="navbar-brand" href="/"><img src={navbarImg} alt="0" /></a>
        <button className="navbar-toggler" type="button" 
        data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
        aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className='nav-item'>
                        <NavLink className='nav-link hov' to='/'>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link hov' to='/book'>Book</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link hov' to='/dress'>Dress</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link hov' to='/electronic'>Electronic</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link hov' to='/food'>Food</NavLink>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mx-2 mr-sm-2 former" type="search" placeholder="Search" aria-label="Search">
                    </input>
                    <button className="btn btn_search my-2 my-sm-0" type="submit">Search</button>
                </form>
                    <li className='mx-2'>
                        <NavLink className='nav-link' to='/info'>
                            <BsInfoLg className='info_icon' size={28} />
                            Info
                        </NavLink>
                    </li>
                    <li className='mx-2'>
                        <NavLink className='nav-link' to='/favourite'>
                            <AiOutlineHeart className='heart_icon' size={30} />
                            Favourites
                        </NavLink>
                    </li>
                    <li className='mx-2'>
                        <NavLink className='nav-link' to='/cart'>
                                <BsCart3 className='cart_icon' size={28} />
                                <span className='red_dot'>{totalItems}</span>
                            Cart
                        </NavLink>
                    </li>
                    <li className='mx-4'>
                        <NavLink className='nav-link' to='/login'>
                            {
                                logout === true ?
                                <svg onClick={() => signOut()} xmlns="http://www.w3.org/2000/svg" 
                                width="25" height="25" fill="currentColor" id='logout'
                                className="bi bi-escape exit_btn_menu" viewBox="0 0 16 16">
                                    <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997
                                    .076A7 7 0 1 0 8.538 1.02Z"/>
                                    <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1
                                    0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z"/>
                                </svg> :
                                <BiLogInCircle id='login' size={25}  />
                            }
                        </NavLink>
                    </li>
            </div>
        </nav>
    );
}

export default Navbar;