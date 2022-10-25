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

function terminaciones(dominio) {
    const terminaciones = [".com", ".com.mx", ".lat", ".org.mx"]
    const arrTer = []
    for (const term of terminaciones) {
        arrTer.push(dominio+term)
    }
    console.log(arrTer)
    return arrTer
}

function similares(dominio) {
    const palabras = [ "s", "mejor", "best", "hello"]
    const terminaciones = [".com", ".com.mx", ".lat", ".org.mx"]
    const arrSim = []
    for (const palabra of palabras) {
        for (const term of terminaciones) {
            arrSim.push(dominio+palabra+term)
        }
    }
    console.log(arrSim)
    return arrSim
}

app.post('/search', (req, res) => {
    console.log(req.body.searchterm)
    const terms = terminaciones(req.body.searchterm)
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