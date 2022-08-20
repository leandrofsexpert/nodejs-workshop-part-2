import { ItemModel } from "../models/itemModel.js"

const create = async (itemToCreate) => {
    try {
        const itemObj = new ItemModel({
            description: itemToCreate.description,
            likes: itemToCreate.likes || 0
        })
        //salvando o objeto e retornando o status CREATED (201)
        const savedItem = await itemObj.save()
        return { success: true, body: savedItem };
    } catch (err) {
        return { success: false, error: err };
    }
}


const readAll = async () => {
    try {
        //retorna todos os registros da coleção
        const items = await ItemModel.find({})
        return { success: true, body: items };
    }
    catch (err) {
        return { success: false, error: err };
    }
}


const readOne = async (id) => {
    try {
        //encontra o registro através do id
        const item = await ItemModel.findById(id)
        return { success: true, body: item };
    }
    catch (err) {
        return { success: false, error: err };
    }
}


const update = async (id, itemToUpdate) => {
    try {
        const itemObj = new ItemModel({
            description: itemToUpdate.description,
            likes: itemToUpdate.likes,
            _id: id
        })

        //findAndUpdate - utiliza o id do objeto e o objeto para atualizar
        const updatedItem = await ItemModel.findByIdAndUpdate(id, itemObj)

        return { success: true, body: updatedItem };
    } catch (err) {
        console.log(err); 
        return { success: false, error: err };
    }
}


const del = async (id) => {
    try {
        //procurando pelo id e exclui do db
        const item = await ItemModel.findByIdAndRemove(id)
        return { success: true, body: {} };
    }
    catch (err) {
        return { success: false, error: err };
    }
}


//declarando nosso objeto para encapsular nossos métodos do serviço
const ItemService = {
    create,
    readAll,
    readOne,
    update,
    del
}

export { ItemService }