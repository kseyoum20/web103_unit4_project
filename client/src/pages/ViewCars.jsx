import React, { useState, useEffect } from 'react';
import '../App.css';
import CustomizedCarsAPI from '../services/CustomizedCarsAPI';
import ColorsAPI from '../services/ColorsAPI';
import InteriorsAPI from '../services/InteriorsAPI';
import RoofsAPI from '../services/RoofsAPI';
import WheelsAPI from '../services/WheelsAPI';

const ViewCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await CustomizedCarsAPI.getAllCars();

                for (let car of data) {
                    car.colorName = (await ColorsAPI.getColorById(car.colorId)).name;
                    car.interiorName = (await InteriorsAPI.getInteriorById(car.interiorId)).name;
                    car.roofName = (await RoofsAPI.getRoofById(car.roofId)).name;
                    car.wheelName = (await WheelsAPI.getWheelById(car.wheelId)).name;
                }

                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        })();
    }, []);

    return (
        <div>
            {cars && cars.length > 0 ? (
                <div>
                    {cars.map((car) => (
                        <article key={car.id}>
                            <h3>{car.name} {` ($${car.price})`}</h3>
                            <div className='grid'>
                                <p><b>🎨 Color: </b>{car.colorName}</p>
                                <p><b>🪑 Interior: </b>{car.interiorName}</p>
                                <p><b>🔝 Roof: </b>{car.roofName}</p>
                                <p><b>🔘 Wheels: </b>{car.wheelName}</p>
                            </div>
                            <a href={`/cardetails/${car.id}`} role='button'>Details</a>
                        </article>
                    ))}
                </div>
            ) : (
                <p>No cars available yet</p>
            )}
        </div>
    );
};

export default ViewCars;
