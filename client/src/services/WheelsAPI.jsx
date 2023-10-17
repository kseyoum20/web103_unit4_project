import { request } from '../utilities/api';

const wheelsURL = 'http://localhost:3000/api/wheels';

const getAllWheels = () => request('GET', wheelsURL);

export default {
    getAllWheels
};
