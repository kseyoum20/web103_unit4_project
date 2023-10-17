import { request } from '../utilities/api';

const colorsURL = 'http://localhost:3000/api/colors';

const getAllColors = () => request('GET', colorsURL);

export default {
    getAllColors
};
