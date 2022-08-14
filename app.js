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
let mongoUrl = process.env.MonogLIveUrl;
let db;

//middleware (supporting lib)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send('Express Server default')
})

app.get('/items/:collections',(req,res) => {
  db.collection(req.params.collections).find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

app.get('/products',(req,res) => {
  let brandid = Number(req.query.brandid)
  let query = {}
  if(brandid){
    query = {brandId: brandid}
  }
    db.collection('products').find(query).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
})


app.get('/dresstype',(req,res) => {
 
  db.collection('dresstype').find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

/*app.get(`/filter/:dress`,(req,res) => {
  
  let dress = Number(req.params.dress)
 // let cuisineId = Number(req.query.cuisineId)

  let query = {}
  if(dress){
    query={
      "dresstype_id":dress,
   //   "cuisines.cuisine_id":cuisineId
    }
  }else{
    query={
      "dresstype_id":dress
    }
  }
  db.collection('dresstype').find(query).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})*/

app.get(`/filter/:bd`,(req,res) => {
  
  let bd = Number(req.params.bd)
  let sort = {cost:1}
 // let cuisineId = Number(req.query.cuisineId)
 let lprice = Number(req.query.lprice)
 let hprice = Number(req.query.hprice)
  let query = {}
  if(req.query.sort){
    sort={price:req.query.sort}
  }

  if(lprice && hprice){
    query={
      "brandId":bd,
      $and:[{price:{$gt:lprice,$lt:hprice}}]
    }
  }
  else if(bd){
    query={
      "brandId":bd
   //   "cuisines.cuisine_id":cuisineId
    }
  }else{
    query={
      "brandId":bd
    }
  }
  db.collection('products').find(query).sort(sort).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

app.get('/details/:idd',(req,res) => {
  let idd = Number(req.params.idd)
  db.collection('products').find({id:idd}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

app.get('/order',(req,res) => {
  let email = req.query.email;
  let query = {}
  if(email){
    //query = {email:email}
    query = {email}
  }
  db.collection('order').find(query).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

app.post('/placeOrder',(req,res) => {
  console.log(req.body)
  db.collection('order').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

app.delete('/deleteOrder/:id',(req,res) => {
  let oid =  mongo.ObjectId(req.params.id)
  db.collection('order').remove({_id:oid},(err,result) => {
    if(err) throw err;
    res.send('Order Deleted')
  })
})


//Connection with db
MongoClient.connect(mongoUrl,(err,client) => {
  if(err) console.log(`Error While Connecting`);
  db = client.db('febintern');
  app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Express Server listening on port ${port}`)
  })
})