import express from 'express'
import routes = require('./routes');

const app=express()

app.use(express.json())
app.use(routes.router)


app.listen(333,()=> 
    console.log('server is running on http://localhost:3333'));

