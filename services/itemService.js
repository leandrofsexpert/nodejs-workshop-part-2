import { ItemModel } from "../models/itemModel.js"

const create = async (itemToCreate) => {

    const itemObj = new ItemModel({
        description: itemToCreate.description,
        likes: itemToCreate.likes || 0
    })
    //salvando o objeto e retornando o status CREATED (201)
    const savedItem = await itemObj.save()
    return savedItem;

}


const readAll = async () => {

    //retorna todos os registros da coleção
    const items = await ItemModel.find({})
    return items;

}


const readOne = async (id) => {

    //encontra o registro através do id
    const item = await ItemModel.findById(id)
    return item

}


const update = async (id, itemToUpdate) => {

    const itemObj = new ItemModel({
        description: itemToUpdate.description,
        likes: itemToUpdate.likes,
        _id: id
    })

    //findAndUpdate - utiliza o id do objeto e o objeto para atualizar
    const updatedItem = await ItemModel.findByIdAndUpdate(id, itemObj)

    return updatedItem

}


const del = async (id) => {

    //procurando pelo id e exclui do db
    const item = await ItemModel.findByIdAndRemove(id)
    return {};

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