import { Router } from "express"
import { Item } from "../models/item.js"
//declarando nosso objeto Router
const itemsRouter = Router()

//listando todos os items do nosso db (item)
itemsRouter.get('/', async (req, res) => {
    const items = await Item.find({})
    res.status(200).json(items).end()
})

//para buscar item único, usamos o parametro id
itemsRouter.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id)
    //checar se temos um item com esse id, ou entao retornamos erro 404
    if(item){
        res.status(200).json(item).end()
    } else{
        res.status(404).end()
    }
})

//criando um registro
itemsRouter.post('/', async (req, res) => {
    const body = req.body
    //se faltar o campo descrição retornamos erro
    if(!body.description) return res.status(400).end()

    //criando o objeto que vamos adicionar no banco
    //se não existe o objeto likes, utilizamos 0 no lugar
    const itemObj = new Item({
        description: body.description,
        likes: body.likes || 0
    })
    //salvando o objeto e retornando o status CREATED (201)
    const savedItem = await itemObj.save()
    res.status(201).json(savedItem).end()
})

//excluindo registro
//procurando pelo id e exclui do db
itemsRouter.delete('/:id', async (req, res) => {
    await Item.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

//atualizando o registro
itemsRouter.put('/:id', async (req, res) => {
    const body = req.body
    //criando um novo objeto, similar ao que fizemos antes no POST
    const itemObj = {
        description: body.description,
        likes: body.likes
    }
    //findAndUpdate - utiliza o id do objeto e o objeto para atualizar
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, itemObj)
    res.status(201).json(updatedItem).end()
})

export { itemsRouter }