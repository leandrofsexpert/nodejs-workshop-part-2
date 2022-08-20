import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
//vamos usar o supertest para conseguir fazer as requisições http através dos testes
const api = supertest(app)

import { ItemModel } from '../models/itemModel'

//pegando o array de items iniciais para nossos testes
import { initialItems } from './test_helper.js'

beforeEach(async () => {
    await ItemModel.deleteMany({})
    await ItemModel.insertMany(initialItems)
})

afterAll(() => mongoose.connection.close())

//executar: npm test -- -t "GET calls" para executar esse bloco de testes
//testando todas as possibilidade de requisições do tipo GET
describe('GET calls', () => {
    //run npm test -- -t "GET call"
    //testando o GET para retornar todos os items
    test('GET call', async () => {
        await api
            .get('/api/items')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    //npm test -- -t "GET one"
    //GET retorna item pelo id
    test('GET one', async () => {
        
        //buscando todos os items
        const items = await ItemModel.find({})
        
        //pega o primeiro item do modelo e faz o parse em JSON
        const firstItem = items[0].toJSON()

        //verificando se o resultado trouxe o status esperado
        const resItem = await
            api.get(`/api/items/${firstItem.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        
                //checando se o item tem o id esperado
        expect(resItem.body.id).toEqual(firstItem.id)

    })

    test('GET one Fail', async () => {

        //testando o cenário de não encontrado
        await
            api.get(`/api/items/${'id-not-found'}`).then((res) => {
                expect(res.statusCode).toBe(404)
            })

    })

    test('check all items have ids', async () => {
        //buscando todos os items
        const itemsToCheck = await api.get('/api/items')
        //checando para ver se todos os items tem id
        for (const item of itemsToCheck.body) {
            expect(item.id).toBeDefined()
        }
    })
})

describe('POST calls', () => {

    test('POST call', async () => {
        
        //criando um novo item para adicionar no banco
        const newItem = {
            description: "sent from Jest!",
            likes: 10
        }
        
        //ao inserir no banco via API, esperamos resultado de sucesso
        await api
            .post('/api/items')
            .send(newItem)
            .expect(201)
        
            //pega todos os items do banco
        const items = await ItemModel.find({})
        
        //vamos verificar se o item foi inserido, checando a descrição do último item da coleção
        expect(items[items.length - 1].description).toBe("sent from Jest!")

    })

    test('POST call without likes', async () => {

        //cria um novo item
        const newItem = {
            description: "sent from Jest!"
        }
        //agora testando para ver se vai adicionar o campo likes corretamente com o valor zerado
        await api
            .post('/api/items')
            .send(newItem)
            .expect(201)
        
        const items = await ItemModel.find({})
        expect(items[items.length - 1].likes).toEqual(0)

    })

    test('POST call without description', async () => {

        //criando item sem description para retornar erro
        const newItemError = {
            likes: 10
        }
        
        await api
            .post('/api/items')
            .send(newItemError)
            .expect(400)

    })

})

test('DELETE item', async () => {

    //recuperando os items e convertendo em JSON o item que vamos deletar
    const itemsAtStart = await ItemModel.find({})
    const itemToDelete = itemsAtStart[0].toJSON()

    //deleta o item através do id
    await api
        .delete(`/api/items/${itemToDelete.id}`)
        .expect(204)
    
    //busca os items no banco novamente
    const itemsNow = await ItemModel.find({})
    
    //verificando se temos um item a menos após a deleção
    expect(itemsNow).toHaveLength(itemsAtStart.length - 1)
    
    //pegando todos os items e uma lista de description - poderia ser qualquer outro campo
    const itemsDescriptions = itemsNow.map(i => i.toJSON().description)
    
    //experamos que não tenha um item com a mesma descrição do item excluído
    expect(itemsDescriptions).not.toContain(itemToDelete.description)

})


test('PUT call', async () => {

    //preparando o item para atualizar
    const updatedItem = {
        description: "updated!",
        likes: 100
    }

    const itemsInDb = await ItemModel.find({})
    const lastItemInDb = itemsInDb[itemsInDb.length - 1].toJSON()

    //chamamos o método de atualização, esperando resultado de sucesso
    await api
        .put(`/api/items/${lastItemInDb.id}`)
        .send(updatedItem)
        .expect(201)

    //pegando todos os items do banco
    const items = await ItemModel.find({})

    //verificando se o item foi atualizado, checando a descrição"
    expect(items[items.length - 1].description).toBe("updated!")

})
