import { request } from '../utilities/api';

const interiorsURL = 'http://localhost:3000/api/interiors';

const getAllInteriors = () => request('GET', interiorsURL);
const getInteriorById = (id) => request('GET', `${interiorsURL}/${id}`);

export default {
    getAllInteriors,
    getInteriorById
};
