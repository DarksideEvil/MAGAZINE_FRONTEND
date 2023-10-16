import './catalog.css';
import { useNavigate } from 'react-router-dom';

export default function Techcatalog () {
    const navigate = useNavigate();
    return (
        <>
            <div className="row py-5">
                <div onClick={() => navigate('/electronic/tablet')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img py-4' src="" alt="0" />
                        <h4>Tablets</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/electronic/samsung')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img pt-3' src="" alt="0" />
                        <h4>SAMSUNG</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/electronic/tv')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img pt-2' src="" alt="0" />
                        <h4>TV</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/electronic/laptop')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img' src="" alt="0" />
                        <h4>Laptop</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/electronic/iphone')} className="col-md-2 bg-light colmd">
                    <div className="cardy">
                        <img className='cofee_img pt-4' src="" alt="0" />
                        <h4>IPhone</h4>
                    </div>
                </div>
            </div>
        </>
    );
}