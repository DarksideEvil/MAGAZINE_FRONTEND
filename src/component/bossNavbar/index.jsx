import './style.css';
import { NavLink } from 'react-router-dom';
import tippy from 'tippy.js';

const BossNavbar = () => {
    tippy('#logout', {content: 'Logout'});
    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-4 d-flex justify-content-between px-2">
            <a className="navbar-brand" href="/chart">BOSS MODE</a>
                <button className="navbar-toggler" type="button" 
                data-toggle="collapse" data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            <li className='mx-4'>
                <NavLink className='nav-link' to='/books'>
                    <div className="books">
                        Books
                    </div>
                </NavLink>
            </li>
            <li className='mx-4'>
                <NavLink className='nav-link' to='/dresss'>
                    <div className="dress">
                        Dress
                    </div>
                </NavLink>
            </li>
            <li className='mx-4'>
                <NavLink className='nav-link' to='/devices'>
                    <div className="devices">
                        Electronics
                    </div>
                </NavLink>
            </li>
            <li className='mx-4'>
                <NavLink className='nav-link' to='/foods'>
                    <div className="foods">
                        Foods
                    </div>
                </NavLink>
            </li>
            <li className='mx-4'>
                <NavLink className='nav-link' to='/secret'>
                    <div onClick={() => localStorage.clear()} className="logout_btn" id='logout'>
                        logout
                    </div>
                </NavLink>
            </li>
        </nav>
    );
}
 
export default BossNavbar;