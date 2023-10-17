import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import cors from 'cors';

// Import the routers from your routes files
import carsRouter from './routes/cars.js';
import colorsRouter from './routes/colors.js';
import roofsRouter from './routes/roofs.js';
import wheelsRouter from './routes/wheels.js';
import interiorsRouter from './routes/interiors.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'favicon.png')));  // replace 'favicon.png' with your actual favicon file name
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'favicon.png')));  // replace 'favicon.png' with your actual favicon file name
    app.use(express.static('public'));
}

// Specify the API path for the server to use
app.use('/api/cars', carsRouter);
app.use('/api/colors', colorsRouter);
app.use('/api/roofs', roofsRouter);
app.use('/api/wheels', wheelsRouter);
app.use('/api/interiors', interiorsRouter);

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    );
}

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
