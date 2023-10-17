import { request } from '../utilities/api';

const colorsURL = 'http://localhost:3000/api/colors';

const getAllColors = () => request('GET', colorsURL);
const getColorById = (id) => request('GET', `${colorsURL}/${id}`); // Refactored function name

export default {
    getAllColors,
    getColorById
};
