//utilizando a biblioteca dotenv para manipular informações sensíveis
import 'dotenv/config'

//recuperando as variáveis do arquivo .env
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

export {
    PORT,
    MONGODB_URI
}