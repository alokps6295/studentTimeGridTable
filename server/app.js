import http from 'http';
import { serverPort, serverIp } from './config/constants';
import express from './helpers/express';
import mongoose from './helpers/mongoose';

const app = express();

const server = http.createServer(app);

server.listen(serverPort, serverIp, () => {
    console.log(`Express server listening on ${serverPort} ${serverIp}`);
});

export default app;