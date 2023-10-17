import { request } from '../utilities/api';

const roofsURL = 'http://localhost:3000/api/roofs';

const getAllRoofs = () => request('GET', roofsURL);
const getRoofById = (id) => request('GET', `${roofsURL}/${id}`);

export default {
    getAllRoofs,
    getRoofById
};
