/**********************************\
 * Autor: Leonardo Torquato      \
 **********************************/


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()

})

const bodyParserJSON = bodyParser.json()

app.use(bodyParserJSON)

/* FILMES*/

/*imports dos arquivos internos*/

const controllerFilmes = require('./controller/controller_filme.js')


app.get('/v1/acmefilmes/filmes', cors(), async(request, response, next) => {
    response.json(funcoes.getListaFilmes())
    response.status(200)
})

app.get('/v1/acmefilmes/filme/:id', cors(), async(request, response, next) => {

    let idFilme = request.params.id

    response.json(funcoes.getFilme(idFilme))
    response.status(200)
})

app.get('/v2/acmefilmes/filmes', cors(), async(request, response, next) => {
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if (dadosFilmes) response.json(dadosFilmes), response.status(200)
    else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.get('/v2/acmefilmes/filme/:id', cors(), async(request, response, next) => {
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.get('/v2/acmefilmes/filtro/filme/', cors(), async(request, response, next) => {
    let name = request.query.nome

    let dadosFilme = await controllerFilmes.getFilmeNome(name)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerFilmes.setNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmefilmes/atualizarFilme/:id', cors(), bodyParserJSON, async(request, response, next) => {

    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controllerFilmes.setAtualizarFilme(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deleteFilme/:id', cors(), async(request, response, next) => {
    const idFilme = request.params.id

    let resultDados = await controllerFilmes.setExcluirFilme(idFilme)

    response.json(resultDados)
})

/* GENERO */

const controller_genero = require('./controller/controller_genero.js')

app.get('/v2/acmefilmes/generos', cors(), async(request, response, next) => {

    let dadosGeneros = await controller_genero.getListarGenero()

    if (dadosGeneros) {
        response.json(dadosGeneros)
        response.status(200)
    } else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.post('/v2/acmefilmes/inserirGenero', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controller_genero.setNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v2/acmefilmes/atualizarGenero/:id', cors(), bodyParserJSON, async(request, response, next) => {
    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controller_genero.setAtualizarGenero(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deletarGenero/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_genero.setExcluirGenero(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarGenero/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_genero.getBuscarGenero(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

/* CLASSIFICAÇÃO */

const controller_classificacao = require('./controller/controller_classificacao.js')

app.get('/v2/acmefilmes/classificacao', cors(), async(request, response, next) => {

    let dadosClassificacao = await controller_classificacao.getListarClassificacao()

    if (dadosClassificacao) {
        response.json(dadosClassificacao)
        response.status(200)
    } else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.post('/v2/acmefilmes/inserirClassificacao', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controller_classificacao.setNovaClassificacao(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v2/acmefilmes/atualizarGenero/:id', cors(), bodyParserJSON, async(request, response, next) => {
    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controller_classificacao.setAtualizarClassificacao(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deletarClassificacao/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_classificacao.setExcluirClassificacao(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarClassificacao/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_classificacao.getBuscarClassificacao(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

/* ATORES*/


console.log("API funcionando na porta 8080")
app.listen(8080, () => {})