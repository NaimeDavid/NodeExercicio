const express = require('express');
var bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World');
});

/*LISTA DE ENDPOINTS DA APLICAÇÃO CRUD DE MENSAGENS
  
  [GET] - na rota /mensagens - retona a lista de mnsg
  [GET] - na rota /mensagens/{id} - pra retornar apenas uma mensagem
  [POST] - criar nova mensagem
  [PUT] /mensagens - pra atualizar mgn pelo ID dela
  [DELETE] - /mensagens/{id} - deletar mensagens pelo ID

*/

const mensagens = [{
        "id": 0,
        "texto": "Essa é a primeira mensagem",
    },
    {
        "id": 1,
        "texto": "Segunda mensagem",

    },
    {
        "id": 2,
        "texto": "Terceira mensagem",
    }
]

const getMensagemValida = () => {
     return mensagens.filter(Boolean)
};

const getMensagemByID = id => {
    return getMensagemValida().find(msg => msg.id === id)
};

//[GET] - na rota / mensagens - retona a lista de mnsg
app.get('/mensagens', (req, res) => {
    res.send(getMensagemValida())
})

//[GET] - na rota /mensagens/{id} - pra retornar apenas uma mensagem
app.get('/mensagens/:id', (req, res) => {

    const id = +req.params.id;
    const mensagem = getMensagemByID(id)

    if (!mensagem) {
        res.send("Mensagem não encontrada.");
        return;
    }
    res.send(mensagem)

})

//[POST] - paracriar nova mensagem
app.post('/mensagens', (req, res) => {
    const mensagem = req.body;

    if (!mensagem || !mensagem.texto) {
        res.send('Mensagem inválida')
        return
    }
    mensagem.id = mensagens.length
    mensagens.push(mensagem)

    res.send(mensagem)

})

//[PUT] /mensagens/{id} - atualizar mgn pelo ID dela
app.put('/mensagens/:id', (req, res) => {

    const id = +req.params.id;
    const mensagem = getMensagemByID(id)

    const novoTexto = req.body.texto;

    if (!novoTexto) {
        res.send('Mensagem inválida')
        return
    }
    mensagem.texto = novoTexto;

    res.send(mensagem);

})

//[DELETE] - /mensagens/{id} - deletar mensagens pelo ID
app.delete('/mensagens/:id', (req, res) => {

    const id = +req.params.id;
    const mensagem = getMensagemByID(id)

    if(!mensagem){
        res.send('Mensagem não encontrada')
        return
    }

    const index = mensagens.indexOf(mensagem)
   
    delete mensagens[index]

    res.send(`Mensagem deletada.`)

})


app.listen(port, function () {
    console.log(`App rodando em http://localhost:${port}`)
})