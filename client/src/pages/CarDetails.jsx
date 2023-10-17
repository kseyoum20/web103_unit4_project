import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import ColorsAPI from '../services/ColorsAPI';
import CarsAPI from '../services/CarsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState({
        name: '', color: '', interior: '', roof: '', wheels: '', price: 0
    });
    const [colorOptions, setColorOptions] = useState([]);
    const [interiorOptions, setInteriorOptions] = useState([]);
    const [roofOptions, setRoofOptions] = useState([]);
    const [wheelsOptions, setWheelsOptions] = useState([]);

    const deleteCar = async (event) => {
        event.preventDefault();
        await CarsAPI.deleteCar(id);
        window.location = '/';
    };

    const fetchData = async (APIFunction, setter) => {
        try {
            const data = await APIFunction();
            setter(data);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchData(CarsAPI.getCarById(id), setCar);
        fetchData(ColorsAPI.getAllColors, setColorOptions);
        fetchData(InteriorsAPI.getAllInteriors, setInteriorOptions);
        fetchData(RoofsAPI.getAllRoofs, setRoofOptions);
        fetchData(WheelsAPI.getAllWheels, setWheelsOptions);
    }, []);

    return (
        <article>
            <div className='horizontal-float-section'>
                <h3>{car.name}</h3>
                <p>Price: ${car.price}</p>
            </div>
            
            <div className='horizontal-float-section'>
                <div className='vertical-float-section'>
                    <img src={car.color.length > 0 && colorOptions.length > 0 ? colorOptions.filter((color) => color.name === car.color)[0].image : ""} alt="" className="option-img" />
                    <p className='option-label'>Color: {car.color}</p>
                </div>
                <div className='vertical-float-section'>
                    <img src={car.interior.length > 0 && interiorOptions.length > 0 ? interiorOptions.filter((interior) => interior.name === car.interior)[0].image : ""} alt="" className="option-img" />
                    <p className='option-label'>Interior: {car.interior}</p>
                </div>
                <div className='vertical-float-section'>
                    <img src={car.roof.length > 0 && roofOptions.length > 0 ? roofOptions.filter((roof) => roof.name === car.roof)[0].image : ""} alt="" className="option-img" />
                    <p className='option-label'>Roof: {car.roof}</p>
                </div>
                <div className='vertical-float-section'>
                    <img src={car.wheels.length > 0 && wheelsOptions.length > 0 ? wheelsOptions.filter((wheel) => wheel.name === car.wheels)[0].image : ""} alt="" className="option-img" />
                    <p className='option-label'>Wheels: {car.wheels}</p>
                </div>
            </div>

            <a href={`/edit/${id}`} role='button'>Edit</a>
            <a href='#' role='button' onClick={deleteCar}>Delete</a> 
        </article>
    )
}

export default CarDetails;
