import { request } from '../utilities/api';

const carsURL = 'http://localhost:3000/api/cars';

const getAllCars = () => request('GET', carsURL);
const getCarById = (id) => request('GET', `${carsURL}/${id}`); // Refactored function name

export default {
    getAllCars,
    getCarById
};
