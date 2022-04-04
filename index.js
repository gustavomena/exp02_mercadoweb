
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.listen(3000, () => {
    console.log('server on and working OK')
})

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/BootstrapJs', express.static(__dirname + '/node_modules/bootstrap/dist/js'))


app.use(express.static('assets'))
app.set('view engine', 'handlebars')
app.engine(
    'handlebars', exphbs.engine({
        layoutsDir: __dirname + '/views',
        partialsDir: __dirname + '/views/components',
    })
)

app.get('/', (_, res) => {
    res.render('Menu', {
        layout: 'Menu',
        dashboard
    })
})

let dashboard = [];
dashboard.push({ src: "banana.png", name: "banana" });
dashboard.push({ src: "cebollas.png", name: "cebollas" });
dashboard.push({ src: "lechuga.png", name: "lechuga" });
dashboard.push({ src: "papas.png", name: "papas" });
dashboard.push({ src: "pimenton.png", name: "pimenton" });
dashboard.push({ src: "tomate.png", name: "tomate" });
app.get('/Dashboard', (_, res) => {
    res.render('Dashboard', {
        layout:'Dashboard',
        dashboard
    })
})

app.get('/:producto', (req, res) => {
    let { producto } = req.params
    productos = dashboard.find((verdura) => verdura.name === producto);
    res.render('Producto', {
        layout: 'Producto',
        productos
    })
})
