import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import ColorsAPI from '../services/ColorsAPI';
import CarsAPI from '../services/CustomizedCarsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState({
        name: '', colorId: '', interiorId: '', roofId: '', wheelId: '', price: 0
    });

    const deleteCar = async (event) => {
        event.preventDefault();
        await CarsAPI.deleteCar(id);
        window.location = '/';
    };

    useEffect(() => {
        (async () => {
            try {
                const fetchedCar = await CarsAPI.getCarById(id);
                
                // Fetching details for each option based on their IDs
                fetchedCar.color = (await ColorsAPI.getColorById(fetchedCar.colorId)).name;
                fetchedCar.interior = (await InteriorsAPI.getInteriorById(fetchedCar.interiorId)).name;
                fetchedCar.roof = (await RoofsAPI.getRoofById(fetchedCar.roofId)).name;
                fetchedCar.wheels = (await WheelsAPI.getWheelById(fetchedCar.wheelId)).name;
                
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
                <p>Price: ${car.price}</p>
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
