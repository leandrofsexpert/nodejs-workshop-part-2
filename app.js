//importando o objeto config que tem as informações de conexão com nosso db
import * as config from './utils/config.js'

//inicializando nossa aplicação de backend com express
import express from "express";
const app = express()

//referenciando o nosso gerenciador de rotas
import { itemsRouter } from './controllers/items.js'

//mongoose - fazendo conexão com mongodb
import mongoose from 'mongoose'

//async function - a conexão com o banco remoto sempre se dá de forma assíncrona
//dispara um erro caso a conexão não seja bem sucedida
const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log(`connected to the database`)
    } catch (e) {
        console.log(`error connecting to the db: ${e}`)
    }
}
//executando a função para conectar com o banco de dados
connectToDB()

//------------- middleware -------------//

//indicando que vamos reconhecer as requisições no formato JSON
app.use(express.json())

//indicando o endereço da nossa API: localhost:3001/api/items e associando ao gerenciador de rotas
app.use('/api/items', itemsRouter)

export { app }
