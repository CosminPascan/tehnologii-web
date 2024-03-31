import express, { json } from 'express'
import cors from 'cors'
import { initialize } from './repository.mjs'
import routes from './routes.mjs'

const app = express()
app.use(cors({
    origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 200
}))
app.use(json())
app.use('/api', routes)

app.listen(8080, async () => {
    try {
        await initialize()
    } catch (error) {
        console.error(error)
    }
})