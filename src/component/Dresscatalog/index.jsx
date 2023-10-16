import './catalog.css';
import { useNavigate } from 'react-router-dom';

export default function Dresscatalog () {
    const navigate = useNavigate();
    return (
        <>
            <div className="row py-5">
                <div onClick={() => navigate('/dress/lacoste')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img' src="" alt="0" />
                        <h4>LACOSTE</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/dress/polo')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img pt-4' src="" alt="0" />
                        <h4 className='pt-4'>POLO</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/dress/rebook')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img' src="" alt="0" />
                        <h4>ReBook</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/dress/converse')} className="col-md-2 bg-light colmd mx-4">
                    <div className="cardy">
                        <img className='cofee_img' src="" alt="0" />
                        <h4>CONVERSE</h4>
                    </div>
                </div>
                <div onClick={() => navigate('/dress/adidas')} className="col-md-2 bg-light colmd">
                    <div className="cardy">
                        <img className='cofee_img' src="" alt="0" />
                        <h4>adidas</h4>
                    </div>
                </div>
            </div>
        </>
    )
}