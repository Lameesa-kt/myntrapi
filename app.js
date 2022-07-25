let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors')
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
//let mongoUrl = process.env.MonogUrl;
let mongoUrl = process.env.MonogUrl;
let db;

const products = {
    
        "id": 602,
        "name": " Shirt ",
        "description": "Full Length Sleeve",
        "price": 1700,
        "brandId": 902
    
}
app.get('/',(req,res) => {
    res.send('Express Server default')
})

app.get('/products',(req,res) => {
    db.collection('products').find().toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
})
