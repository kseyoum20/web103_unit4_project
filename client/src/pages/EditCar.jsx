import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import CustomizedCarsAPI from '../services/CustomizedCarsAPI';
import CarsAPI from '../services/CarsAPI';
import ColorsAPI from '../services/ColorsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const EditCar = () => {
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
const [carOptions, setCarsOptions] = useState([]);
const [colorOptions, setColorOptions] = useState([]);
const [interiorOptions, setInteriorOptions] = useState([]);
const [roofOptions, setRoofOptions] = useState([]);
const [wheelsOptions, setWheelsOptions] = useState([]);
const [feedback, setFeedback] = useState(''); // To provide feedback to the user

const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the current field first
    const updatedCar = { ...car, [name]: value };

    let updatedPrice = 0;

    // Add car base price
    const selectedCar = carOptions.find(c => c.car_id.toString() === updatedCar.car_id);
    updatedPrice += selectedCar ? selectedCar.base_price : 0;

    // Add interior price
    const selectedInterior = interiorOptions.find(c => c.interior_id.toString() === updatedCar.interior_id);
    updatedPrice += selectedInterior ? selectedInterior.additional_price : 0;

    // Add roof price
    const selectedRoof = roofOptions.find(c => c.roof_id.toString() === updatedCar.roof_id);
    updatedPrice += selectedRoof ? selectedRoof.additional_price : 0;

    // Add wheel price
    const selectedWheel = wheelsOptions.find(c => c.wheel_id.toString() === updatedCar.wheel_id);
    updatedPrice += selectedWheel ? selectedWheel.additional_price : 0;

    // Now update the state
    setCar(updateCar => ({ ...updateCar, [name]: value, total_price: updatedPrice }));
}

const updateCar = async (event) => {
event.preventDefault();
try {
    await CustomizedCarsAPI.updateCustomizedCar(id, car);
    setFeedback('Car updated successfully!');
} catch (error) {
    console.error("Update error:", error);
    setFeedback('Error updating the car. Please try again.');
}
};

useEffect(() => {
const fetchCarDetails = async () => {
    try {
    const carDetails = await CustomizedCarsAPI.getAllCustomizedCars(id);
    setCar(carDetails);
    } catch (error) {
    setFeedback('Error fetching the car details. Please try again.');
    }
};

const fetchDropdownOptions = async () => {
try {
    const cars = await CarsAPI.getAllCars();
    const colors = await ColorsAPI.getAllColors();
    const interiors = await InteriorsAPI.getAllInteriors();
    const roofs = await RoofsAPI.getAllRoofs();
    const wheels = await WheelsAPI.getAllWheels();

    setCarsOptions(cars);
    setColorOptions(colors);
    setInteriorOptions(interiors);
    setRoofOptions(roofs);
    setWheelsOptions(wheels);
} catch (error) {
    setFeedback('Error fetching the dropdown options. Please try again.');
}
};
fetchCarDetails();
fetchDropdownOptions();
}, [id]);

return (

<div className="form-container">
    <h2>Edit Car</h2>
        <form onSubmit={updateCar}>
        <div className="form-group">
        <label>Car Model</label>
        <select name="name" value={car.name} onChange={handleChange}>
        {carOptions.map(option => (
        <option key={option.id} value={option.name}>
        {option.name}
        </option>
        ))}
        </select>
        </div>
        <div className="form-group">
        <label>Color</label>
        <select name="color_id" value={car.color_id} onChange={handleChange}>
        {colorOptions.map(option => (
        <option key={option.id} value={option.id}>
        {option.color_name}
        </option>
        ))}
        </select>
        </div>
        <div className="form-group">
        <label>Interior</label>
        <select name="interior_id" value={car.interior_id} onChange={handleChange}>
        {interiorOptions.map(option => (
        <option key={option.id} value={option.id}>
        {option.material}
        </option>
        ))}
        </select>
        </div>
        <div className="form-group">
        <label>Roof type</label>
        <select name="roof_id" value={car.roof_id} onChange={handleChange}>
        {roofOptions.map(option => (

        <option key={option.id} value={option.id}>
        {option.type}
        </option>
        ))}
        </select>
        </div>
        <div className="form-group">
        <label>Wheels</label>
        <select name="wheel_id" value={car.wheel_id} onChange={handleChange}>
        {wheelsOptions.map(option => (
        <option key={option.id} value={option.id}>
        {option.wheel_type}
        </option>
        ))}
        </select>
        </div>
        <div style={{float: 'right', marginTop: '20px'}}>Total Price: ${car.total_price}</div>
        <button type="submit" className="submit-btn">Update Car</button>
        </form>
        {feedback && <p className="feedback-message">{feedback}</p>}
</div>
);
};
export default EditCar;

