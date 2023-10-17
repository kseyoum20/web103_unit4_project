import { request } from '../utilities/api';

const interiorsURL = 'http://localhost:3000/api/interiors';

const getAllInteriors = () => request('GET', interiorsURL);

export default {
    getAllInteriors
};
