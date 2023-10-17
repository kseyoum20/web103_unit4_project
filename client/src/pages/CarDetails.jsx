import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import ColorsAPI from '../services/ColorsAPI';
import CustomizedCarsAPI from '../services/CustomizedCarsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState({
        car_id: '', 
        color_id: '',
        roof_id: '',
        wheel_id: '',
        interior_id: '',
        total_price: 0,
        name: ''
    });

    const deleteCar = async (event) => {
        event.preventDefault();
        await CarsAPI.deleteCar(id);
        window.location = '/';
    };

    useEffect(() => {
        (async () => {
            try {
                const fetchedCar = await CustomizedCarsAPI.getCustomizedCarById(id);
                
                // Fetching details for each option based on their IDs
                fetchedCar.color = (await ColorsAPI.getColorById(fetchedCar.color_id)).color_name;
                fetchedCar.interior = (await InteriorsAPI.getInteriorById(fetchedCar.interior_id)).material;
                fetchedCar.roof = (await RoofsAPI.getRoofById(fetchedCar.roof_id)).type;
                fetchedCar.wheels = (await WheelsAPI.getWheelById(fetchedCar.wheel_id)).wheel_type;
                
                setCar(fetchedCar);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        })();
    }, [id]);

    return (
        <article>
            <div className='horizontal-float-section'>
                <h3>{car.name}</h3>
                <p>Price: ${car.total_price}</p>
            </div>
            
            <div className='horizontal-float-section'>
                <div className='vertical-float-section'>
                    <p className='option-label'>🎨 Color: {car.color}</p>
                </div>
                <div className='vertical-float-section'>
                    <p className='option-label'>🪑 Interior: {car.interior}</p>
                </div>
                <div className='vertical-float-section'>
                    <p className='option-label'>🔝 Roof: {car.roof}</p>
                </div>
                <div className='vertical-float-section'>
                    <p className='option-label'>🔘 Wheels: {car.wheels}</p>
                </div>
            </div>

            <a href={`/edit/${id}`} role='button'>Edit</a>
            <a href='#' role='button' onClick={deleteCar}>Delete</a> 
        </article>
    )
}

export default CarDetails;
