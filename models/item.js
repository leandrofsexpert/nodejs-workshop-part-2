//para conectar com o MongoDB usamos o mongoose
import mongoose from "mongoose"

//vamos definir a estrutura da coleção (estrutura do banco de dados)
//o campo description é para string e o likes armazena número
const itemSchema = new mongoose.Schema({
    description: String,
    likes: Number
})

//temos um schema e precisamos modificar pois
//o mongoDB adiciona dois campos e não vamos precisar deles
//_id é o id do objeto e é gerado aleatóriamente
//vamos transformar o _id em .id e remover o __v
itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//mongoose precisa que seja definido um modelo com o schema
const Item = mongoose.model('Item', itemSchema)

export { Item }