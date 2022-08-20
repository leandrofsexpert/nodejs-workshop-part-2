import { Router } from "express"
import { ItemService } from "../services/itemService.js"

//declarando nosso objeto Router
const itemsRouter = Router()

//listando todos os items do nosso db (item)
itemsRouter.get('/', async (req, res) => {
    const result = await ItemService.readAll()
    res.status(200).json(result).end()
})

//para buscar item único, usamos o parametro id
itemsRouter.get('/:id', async (req, res) => {
    const result = await ItemService.readOne(req.params.id)
    //checar se temos um item com esse id, ou entao retornamos erro 404
    if(result){
        res.status(200).json(result).end()
    } else{
        res.status(404).end()
    }
})

//criando um registro
itemsRouter.post('/', async (req, res) => {
    const body = req.body
    //se faltar o campo descrição retornamos erro
    if(!body.description) return res.status(400).end()

    //salvando o objeto e retornando o status CREATED (201)
    const result = await ItemService.create(body)
    if(result){
        res.status(201).json(result).end()
    }
    else{
        res.status(500).end()
    }
    
})

//atualizando o registro
itemsRouter.put('/:id', async (req, res) => {
    const body = req.body
    
    const result = await ItemService.update(req.params.id, body)
    if(result){
        res.status(201).json(result).end()
    }
    else{
        res.status(500).end()
    }
})

//excluindo registro
itemsRouter.delete('/:id', async (req, res) => {
    const result = await ItemService.del(req.params.id)

    if(result){
        res.status(204).end()
    }
    else{
        res.status(404).end()
    }
    
})

export { itemsRouter }