import express, {Request, Response} from 'express';
import cors from 'cors'
import { users } from './data/users';

const app = express()

const configOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(configOptions))

app.get('/api/v1/ping', (req: Request, res: Response) => {
    res.send({
        data: "pong"
    })
})

// GET endpoint for /api/v1/users
app.get('/api/v1/users', (req: Request, res: Response) => {
    res.json(users);
});

app.listen(8080, () => {
    console.log("server starting")
})