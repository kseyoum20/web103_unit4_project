import { request } from '../utilities/api';

const carsURL = 'http://localhost:3000/api/cars';

const getAllCars = () => request('GET', carsURL);
const getCarById = (id) => request('GET', `${carsURL}/${id}`);
const createCar = (car) => request('POST', carsURL, car);
const updateCar = (id, car) => request('PATCH', `${carsURL}/${id}`, car);
const deleteCar = (id) => request('DELETE', `${carsURL}/${id}`);

export default {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};
