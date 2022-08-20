//importando o objeto "app"
import { app } from './app.js'

//buscando a porta das nossas variáveis de ambiente
import { PORT } from './utils/config.js'

//inicializando o servidor
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
