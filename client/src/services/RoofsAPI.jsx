import { request } from '../utilities/api';

const roofsURL = 'http://localhost:3000/api/roofs';

const getAllRoofs = () => request('GET', roofsURL);

export default {
    getAllRoofs
};
