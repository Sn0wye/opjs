import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http2';
import path from 'node:path';

import { router } from './router';

dotenv.config();

mongoose
  .connect(String(process.env.DATABASE_URL))
  .then(() => {
    const app = express();
    const server = http.createServer(app);
    const port = process.env.PORT || 3001;

    app.use(cors());
    app.use(express.json());
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    app.use(router);

    server.listen(port, () => {
      console.log(`🚀 HTTP server running on port ${port}`);
    });
  })
  .catch(() => console.log('Failed to connect to database! 😥'));
