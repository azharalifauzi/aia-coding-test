import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import helmet from 'helmet';
import { defaultErrorHandler } from './controllers/error-handler';
import flickrRoute from './routes/flickr-routes';

const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

const app = express();

app.use(json({ limit: '10kb' }));
app.use(helmet());
app.use('/api/', limiter);
app.use(hpp());

app.use('/api/v1/flickr', flickrRoute);

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
