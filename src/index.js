import express from 'express';
import employeesRoutes from './routes/employees.router.js';
import indexRoutes from './routes/index.router.js';

import {PORT} from'./config.js';

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use('/api', employeesRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        msg: 'Endpoint not found'
    })
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})
