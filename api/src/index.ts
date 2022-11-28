import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';

import { router } from './router';

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
const port = process.env.PORT || 3001;

mongoose
  .connect(String(process.env.DATABASE_URL))
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });

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
