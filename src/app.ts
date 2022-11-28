import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/CarRoutes';

const app = express();
app.use(carRoutes);
app.use(ErrorHandler.handle);

export default app;
