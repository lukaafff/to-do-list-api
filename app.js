import "dotenv/config"
import express from 'express'
import cors from 'cors'
import connectDataBase from './src/database/db.js';
import router from './src/routes/index.js'

const app = express();
connectDataBase()
app.use(cors());
app.use(express.json());
app.use(router);

export default app