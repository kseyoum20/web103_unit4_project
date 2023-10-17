import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import CarsAPI from '../services/CarsAPI';

const ViewCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await CarsAPI.getAllCars();
                setCars(data);
            } catch (error) {
                throw error;
            }
        }) ();
    }, []);

    return (
        <div>
            {cars && cars.length > 0 ? (
                <div>
                    {cars.map((car) => (
                        <article key={car.id}>
                            <h3>{car.name} {` ($${car.price})`}</h3>
                            <div className='grid'>
                                <p><b>🎨 Color: </b>{car.color}</p>
                                <p><b>🪑 Interior: </b>{car.interior}</p>
                                <p><b>🔝 Roof: </b>{car.roof}</p>
                                <p><b>🔘 Wheels: </b>{car.wheels}</p>
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