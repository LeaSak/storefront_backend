import express, { Request, Response } from 'express';
import routes from './server/routes/index';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response): void {
  res.send('Welcome');
});

app.use('/api', routes);

app.listen(3000, function (): void {
  console.log(`starting app on: ${address}`);
});

export default app;
