import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import CarsAPI from '../services/CarsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const CreateCar = () => {
    const [car, setCar] = useState({name: '', interior: '', roof: '', wheel: ''});
    const [interiorOptions, setInteriorOptions] = useState([]);
    const [roofOptions, setRoofOptions] = useState([]);
    const [wheelsOptions, setWheelsOptions] = useState([]);
    const [showMissing, setShowMissing] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newCar = {...car};
        newCar[name] = value;
        setCar(newCar);
    }

    const createCar = async (event) => {
        event.preventDefault();
        if(car.interior.length === 0 || car.roof.length === 0 || car.wheel.length === 0 || car.name.length === 0) {
            setShowMissing(true);
            return;
        }
        await CarsAPI.createCar(car);
        window.location = '/';
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await InteriorsAPI.getAllInteriors();
                setInteriorOptions(data);
            } catch (error) {
                throw error;
            }
        }) ();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const data = await RoofsAPI.getAllRoofs();
                setRoofOptions(data);
            } catch (error) {
                throw error;
            }
        }) ();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const data = await WheelsAPI.getAllWheels();
                setWheelsOptions(data);
            } catch (error) {
                throw error;
            }
        }) ();
    }, []);

    return (
        <article>
            
            <div>
                <details open>
                    <summary>
                        Interior
                        {showMissing && car.interior.length === 0 && (<span className='warning-text'> Please select one.</span>)}
                    </summary>
                    {interiorOptions && interiorOptions.map.length > 0 && (
                        <div className='grid'>
                            {interiorOptions.map((interior) => (
                                <div key={interior.name} className='vertical-float-section'>
                                    <img src={interior.image} alt="" className="option-img" />
                                    <label className='option-label'>{interior.name}</label>
                                    <input type='radio' name='interior' value={interior.name} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                    )}
                </details>

                <details>
                    <summary>
                        Roof
                        {showMissing && car.roof.length === 0 && (<span className='warning-text'> Please select one.</span>)}
                    </summary>
                    {roofOptions && roofOptions.map.length > 0 && (
                        <div className='grid'>
                            {roofOptions.map((roof) => (
                                <div key={roof.name} className='vertical-float-section'>
                                    <img src={roof.image} alt="" className="option-img" />
                                    <label className='option-label'>{roof.name}</label>
                                    <input type='radio' name='roof' value={roof.name} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                    )}
                </details>

                <details>
                    <summary>
                        Wheels
                        {showMissing && car.wheel.length === 0 && (<span className='warning-text'> Please select one.</span>)}
                    </summary>
                    {wheelsOptions && wheelsOptions.map.length > 0 && (
                        <div className='grid'>
                            {wheelsOptions.map((wheel) => (
                                <div key={wheel.name} className='vertical-flow-section'>
                                <img src={wheel.image} alt="" className="option-img" />
                                <label className='option-label'>{wheel.name}</label>
                                <input type='radio' name='wheel' value={wheel.name} onChange={handleChange} />
                                </div>
                                ))}
                                </div>
                                )}
                                </details>
                                </div>
                                <div className='horizontal-float-section'>
            <label htmlFor="name">
                <input type="text" name="name" placeholder='Name your car' onChange={handleChange} />
            </label>
            <button onClick={createCar}>Order</button>
        </div>

        {showMissing && car.name.length === 0 && (<span className='warning-text'> Please name the car.</span>)}
    </article>
)
}
export default CreateCar;