import { request } from '../utilities/api';

const wheelsURL = 'http://localhost:3000/api/wheels';

const getAllWheels = () => request('GET', wheelsURL);
const getWheelById = (id) => request('GET', `${wheelsURL}/${id}`);

export default {
    getAllWheels,
    getWheelById
};
