import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { defaultErrorHandler } from './controllers/error-handler';

const app = express();

app.use(json({ limit: '10kb' }));

// Welcome Page
app.get('/api', (_req, res) => {
  res.send('<h1>Welcome to Null River API</h1>');
});

// Error Handler
app.all('*', async (_, res) => {
  res.status(404).send({
    message: 'Not Found!',
  });
});

app.use(defaultErrorHandler);

export default app;
