import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import CarsAPI from '../services/CarsAPI';
import ColorsAPI from '../services/ColorsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const EditCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState({name: '', color: '', interior: '', roof: '', wheels: '', price: 0});
    const [colorOptions, setColorOptions] = useState([]);
    const [interiorOptions, setInteriorOptions] = useState([]);
    const [roofOptions, setRoofOptions] = useState([]);
    const [wheelsOptions, setWheelsOptions] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedCar = {...car, [name]: value};
        setCar(updatedCar);
    };

    const updateCar = async (event) => {
        event.preventDefault();
        await CarsAPI.updateCar(id, car);
        window.location = `/cardetails/${id}`;
    };

    const fetchData = async (APIFunction, setter) => {
        try {
            const data = await APIFunction();
            setter(data);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchData(CarsAPI.getCarById(id), setCar);
        fetchData(ColorsAPI.getAllColors, setColorOptions);
        fetchData(InteriorsAPI.getAllInteriors, setInteriorOptions);
        fetchData(RoofsAPI.getAllRoofs, setRoofOptions);
        fetchData(WheelsAPI.getAllWheels, setWheelsOptions);
    }, []);

    return (
        <article>
            {/* This is where you'd add the car editing components similar to the drink editing components in the example */}
            <div className='horizontal-float-section'>
                <label htmlFor="name">
                    <input type="text" name="name" placeholder='Car Model Name' value={car.name} onChange={handleChange} />
                </label>
                {/* Add more components for other car attributes like color, interior, etc. based on your requirements */}
                <button onClick={updateCar}>Update</button>
            </div>
        </article>
    );
};

export default EditCar;