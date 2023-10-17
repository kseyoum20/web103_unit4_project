import { request } from '../utilities/api';

const customizedCarsURL = 'http://localhost:3000/api/customized_cars'; // Renamed the variable to better reflect the context

const getAllCustomizedCars = () => request('GET', customizedCarsURL);  // Refactored function name
const getCustomizedCarById = (id) => request('GET', `${customizedCarsURL}/${id}`); // Refactored function name
const createCustomizedCar = (car) => request('POST', customizedCarsURL, car); // Refactored function name
const updateCustomizedCar = (id, car) => request('PATCH', `${customizedCarsURL}/${id}`, car); // Refactored function name
const deleteCustomizedCar = (id) => request('DELETE', `${customizedCarsURL}/${id}`); // Refactored function name

export default {
    getAllCustomizedCars,
    getCustomizedCarById,
    createCustomizedCar,
    updateCustomizedCar,
    deleteCustomizedCar
};
