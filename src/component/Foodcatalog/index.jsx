import './catalog.css';
import { useNavigate } from 'react-router-dom';

export default function Foodcatalog () {
    const navigate = useNavigate();
    return (
        <>
            <div className="row py-5">
                <div onClick={() => navigate('/food/fries')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img' src="" alt="0" />
                        <h4>French Fries</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/food/kebab')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img pt-2' src="" alt="0" />
                        <h4>Kebab</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/food/pizza')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img pt-2' src="" alt="0" />
                        <h4>Pizza</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/food/cofee')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img' src="" alt="0" />
                        <h4>Cofee</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/food/sushi')} className="col-md-2 bg-light colmd">
                    <div className="cardy">
                        <img className='cofee_img' src="" alt="0" />
                        <h4>Sushi</h4>
                    </div>
                </div>
            </div>
        </>
    )
}