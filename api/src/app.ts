import express from 'express';
import { json } from 'body-parser';

const app = express();

app.use(json({ limit: '10kb' }));

export default app;
