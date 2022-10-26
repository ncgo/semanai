fs = require('fs')
const express = require('express');
const path = require('path');
  
const app = express();
app.set('view engine', 'ejs');
const PORT = 3000;

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res)=> {
    res.status(200);
    res.render('pages/index',  {search: false, searchterm: ""})
})

try {
    var dominiosExistentesTxt = fs.readFileSync('dominios.txt', 'utf8');
    var listaDominios = dominiosExistentesTxt.toString().split('\r\n')
    console.log(listaDominios)
} catch(e) {
    console.log('Error:', e.stack)
}

const terminaciones = [".net", ".lat", ".cc", ".tv", ".com"]

function revisaExistente(dominio) {
    return listaDominios.includes(dominio)
}

function terminacionesDominio(dominio) {
    const arrTer = []
    const ocupados = []
    for (const term of terminaciones) {
        var newDomain = dominio+term
        if (!revisaExistente(newDomain)) {
            arrTer.push(newDomain)
        } else {
            console.log("Dominio existente!", newDomain)
            ocupados.push(newDomain)
        }
    }
    return [arrTer, ocupados]
}

function similares(dominio) {
    const palabras = [ "s", "mejor", "best", "hello"]
    const arrSim = []
    const ocupados = []
    for (const palabra of palabras) {
        for (const term of terminaciones) {
            var newDomain = dominio+palabra+term
            if (!revisaExistente(newDomain)) {
                arrSim.push(newDomain)
            } else {
                console.log("Dominio existente!", newDomain)
                ocupados.push(newDomain)
            }
        }
    }
    console.log(arrSim)
    return [arrSim, ocupados]
}

app.post('/search', (req, res) => {
    console.log(req.body.searchterm)
    const terms = terminacionesDominio(req.body.searchterm)
    const palabras = similares(req.body.searchterm)
    res.status(200)
    res.render("pages/index", {search: true, searchterm: req.body.searchterm, terminaciones: terms, similares: palabras})
    res.end()
})
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);