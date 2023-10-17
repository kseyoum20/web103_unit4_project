import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import CarsAPI from '../services/CustomizedCarsAPI';
import ColorsAPI from '../services/ColorsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const EditCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState({name: '', colorId: '', interiorId: '', roofId: '', wheelId: '', price: 0});
    const [feedback, setFeedback] = useState('');  // To provide feedback to the user
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
        try {
            await CarsAPI.updateCar(id, car);
            setFeedback('Car updated successfully!');
            window.location = `/cardetails/${id}`;
        } catch (error) {
            setFeedback('Error updating car. Please try again.');
        }
    };

    const fetchData = async (APIFunction, setter) => {
        try {
            const data = await APIFunction();
            setter(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(CarsAPI.getCarById(id), setCar);
        fetchData(ColorsAPI.getAllColors, setColorOptions);
        fetchData(InteriorsAPI.getAllInteriors, setInteriorOptions);
        fetchData(RoofsAPI.getAllRoofs, setRoofOptions);
        fetchData(WheelsAPI.getAllWheels, setWheelsOptions);
    }, [id]);

    return (
        <article>
            <form onSubmit={updateCar}>
                <div className='horizontal-float-section'>
                    <label htmlFor="name">
                        Car Name:
                        <input 
                            type="text" 
                            name="name" 
                            placeholder='Car Model Name' 
                            value={car.name} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>
                        Color:
                        <select name="colorId" value={car.colorId} onChange={handleChange}>
                            <option value="">Select Color</option>
                            {colorOptions.map(color => (
                                <option key={color.id} value={color.id}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Interior:
                        <select name="interiorId" value={car.interiorId} onChange={handleChange}>
                            <option value="">Select Interior</option>
                            {interiorOptions.map(interior => (
                                <option key={interior.id} value={interior.id}>
                                    {interior.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Roof:
                        <select name="roofId" value={car.roofId} onChange={handleChange}>
                            <option value="">Select Roof</option>
                            {roofOptions.map(roof => (
                                <option key={roof.id} value={roof.id}>
                                    {roof.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Wheels:
                        <select name="wheelId" value={car.wheelId} onChange={handleChange}>
                            <option value="">Select Wheels</option>
                            {wheelsOptions.map(wheel => (
                                <option key={wheel.id} value={wheel.id}>
                                    {wheel.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Price:
                        <input 
                            type="number" 
                            name="price" 
                            value={car.price} 
                            onChange={handleChange} 
                        />
                    </label>
                    <button type="submit">Update</button>
                </div>
                <div className='feedback-text'>{feedback}</div>
            </form>
        </article>
    );
    
};

export default EditCar;