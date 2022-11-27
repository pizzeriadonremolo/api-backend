
import App from './express.js';
import { createServer } from 'http';

const httpServer = createServer(App);

export default httpServer;