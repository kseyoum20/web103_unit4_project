import React, { useState, useEffect } from 'react';
import '../App.css';
import CustomizedCarsAPI from '../services/CustomizedCarsAPI';
import CarsAPI from '../services/CarsAPI';
import ColorsAPI from '../services/ColorsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const CreateCar = () => {
    const [car, setCar] = useState({
        car_id: '', 
        color_id: '',
        roof_id: '',
        wheel_id: '',
        interior_id: '',
        total_price: 0,
        name: ''
    });  // Use IDs
    const [interiorOptions, setInteriorOptions] = useState([]);
    const [colorOptions, setColorsOptions] = useState([]);
    const [carOptions, setCarsOptions] = useState([]);
    const [roofOptions, setRoofOptions] = useState([]);
    const [wheelsOptions, setWheelsOptions] = useState([]);
    const [showMissing, setShowMissing] = useState(false);
    const [feedback, setFeedback] = useState('');  // To provide feedback to the user

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
        setCar(prevCar => ({ ...prevCar, [name]: value, total_price: updatedPrice }));
    }
    
    
    

    const createCar = async (event) => {
        event.preventDefault();
        console.log(!car.color)
        if(!car.interior_id || !car.roof_id || !car.wheel_id || !car.car_id || !car.name || !car.color_id) {
            setShowMissing(true);
            return;
        }
        try {
            await CustomizedCarsAPI.createCustomizedCar(car);
            setFeedback('Car created successfully!');  // Provide feedback
        } catch (error) {
            setFeedback('Error creating car. Please try again.');
        }
    }

    const fetchData = async (apiCall, setData) => {
        try {
            const data = await apiCall();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData(InteriorsAPI.getAllInteriors, setInteriorOptions);
        fetchData(RoofsAPI.getAllRoofs, setRoofOptions);
        fetchData(WheelsAPI.getAllWheels, setWheelsOptions);
        fetchData(CarsAPI.getAllCars, setCarsOptions);
        fetchData(ColorsAPI.getAllColors, setColorsOptions);

    }, []);

    return (
        <article>
            <form onSubmit={createCar}>
                <label>
                    Car Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={car.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    CarModel:
                    <select name="car_id" value={car.car_id} onChange={handleChange}>
                        <option value="">Select CarModel</option>
                        {carOptions.map(car => (
                            <option key={car.car_id} value={car.car_id}>
                                {car.model_name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Color:
                    <select name="color_id" value={car.color_id} onChange={handleChange}>
                        <option value="">Select Color</option>
                        {colorOptions.map(color => (
                            <option key={color.color_id} value={color.color_id}>
                                {color.color_name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Interior:
                    <select name="interior_id" value={car.interior_id} onChange={handleChange}>
                        <option value="">Select Interior</option>
                        {interiorOptions.map(interior => (
                            <option key={interior.interior_id} value={interior.interior_id}>
                                {interior.material}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Roof:
                    <select name="roof_id" value={car.roof_id} onChange={handleChange}>
                        <option value="">Select Roof</option>
                        {roofOptions.map(roof => (
                            <option key={roof.roof_id} value={roof.roof_id}>
                                {roof.type}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Wheels:
                    <select name="wheel_id" value={car.wheel_id} onChange={handleChange}>
                        <option value="">Select Wheels</option>
                        {wheelsOptions.map(wheel => (
                            <option key={wheel.wheel_id} value={wheel.wheel_id}>
                                {wheel.wheel_type}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Create Car</button>
            </form>
            <div style={{float: 'right', marginTop: '20px'}}>Total Price: ${car.total_price}</div>
            {showMissing && <div className="error-text">All fields are required.</div>}
            <div className='feedback-text'>{feedback}</div>
        </article>
    )
    
}
export default CreateCar;