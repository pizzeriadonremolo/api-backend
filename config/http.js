
import App from './express.js';
import { createServer } from 'https';
import fs from 'fs';

const httpServer = createServer({
key: fs.readFileSync('../certs/privkey.pem'),
cert:fs.readFileSync('../certs/fullchain.pem')
}
,App);

export default httpServer;
