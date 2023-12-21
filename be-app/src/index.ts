import express, {Request, Response} from 'express';
import cors from 'cors'

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

app.listen(8080, () => {
    console.log("server starting")
})