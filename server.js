const dotenv = require('dotenv').config();
const express = require('express');//creates an express application.


var cors = require('cors')
const mongodb = require('mongodb')
const mongoClient =  mongodb.MongoClient

const dbName = 'pract';
const app =express(); //creates an express application.

// let products=[];
//Middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}))

//api or rest api url

app.post("/products", async (req,res)=>{
    // req.body.id=products.length+1;
    //  console.log(req.body);
    // products.push(req.body);
    // res.json({message:"product Created Successfully",products})

   
   try{
    //step 1 create a connection b/w nodejs and mongodb
const connection = await  mongoClient.connect(process.env.MONGODB_URL);
//step 2 select db
const db = connection.db(dbName);
//step 3 select collection and do operations(query)
 const products= await db.collection('products').insertOne(req.body);

 await connection.close();
 res.json({message:"product created successfully",products})
   }catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
   }
})

app.get("/products",  async function(req, res){
    // let qParams =req.query;
    // console.log(qParams);
    // let resproduct=[];
    // for(let i= parseInt(req.query.offset);i< parseInt(req.query.offset)+parseInt(req.query.limit);i++){
    //     if(products[i]){
    //         resproduct.push(products[i]);
    //     }     
    // }
    // res.json(resproduct);
    // res.json(products);
     
   try{
    //step 1 create a connection b/w nodejs and mongodb
const connection = await  mongoClient.connect(process.env.MONGODB_URL);
//step 2 select db
const db = connection.db(dbName);
//step 3 select collection and do operations(query)
 const products= await db.collection('products').find().toArray();

 await connection.close();
 res.json({message:"All products fetched successfully",products})
   }catch(error){
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
   }
})


app.get("/products/:id", async function(req,res){
    // console.log(req.params)
    // let productId = req.params.id;
    // let product= products.find((item)=> item.id==productId)
    // console.log(product)
    // if(product){
    //     res.json(product)
    // }else{
    //     res.json({message:"product Not Found"});
    // }
    try{
        //step 1 create a connection b/w nodejs and mongodb
    const connection = await  mongoClient.connect(process.env.MONGODB_URL);
    //step 2 select db
    const db = connection.db(dbName);
    //step 3 select collection and do operations(query)
     const product= await db.collection('products').findOne({_id: mongodb.ObjectId(req.params.id)});
    
     await connection.close();
     res.json({message:"successfully fetched product by the id ",product})
       }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
       }
})

app.put("/products/:id", async (req,res)=>{
    // let productId=req.params.id;
    // let productIndex=products.findIndex((item)=> item.id==productId)
    // if(productIndex!=-1){
    // Object.keys(req.body).forEach((item)=>{
    //     console.log(item);
    //     products[productIndex][item]=req.body[item];
    // })
    
    // res.json({
    //         message:"product Updated Successfully",
    //         products
    //     });
    // }else{
    //     res.json({
    //         message:"product Not Found"
    //     });
    // }
    try{
        //step 1 create a connection b/w nodejs and mongodb
    const connection = await  mongoClient.connect(process.env.MONGODB_URL);
    //step 2 select db
    const db = connection.db(dbName);
    //step 3 select collection and do operations(query)
     const product= await db.collection('products').findOneAndUpdate({_id: mongodb.ObjectId(req.params.id)},{$set:req.body});
    
     await connection.close();
     res.json({message:"successfully edited product  ",product})
       }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
       }
});     
    
app.delete("/products/:id",async(req,res)=>{
    // let productId = req.params.id;
    // let productIndex=products.findIndex((item)=>item.id==productId);

    // if(productIndex!=-1){
    //     products.splice(productIndex,1)
    //     res.json({
    //         message:"product Deleted Successfully"
    //     })
    // }else{
    //     res.json({
    //         message:"product Not Found"
    //     })
    // }
    try{
        //step 1 create a connection b/w nodejs and mongodb
    const connection = await  mongoClient.connect(process.env.MONGODB_URL);
    //step 2 select db
    const db = connection.db(dbName);
    //step 3 select collection and do operations(query)
     const product= await db.collection('products').findOneAndDelete({_id: mongodb.ObjectId(req.params.id)});
    
     await connection.close();
     res.json({message:"successfully deleted the product ",product})
       }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
       }
})

app.post('/signup',async (req,res) => {
    try{
        //step 1 create a connection b/w nodejs and mongodb
    const connection = await  mongoClient.connect(process.env.MONGODB_URL);
    //step 2 select db
    const db = connection.db(dbName);
    //step 3 select collection and do operations(query)
     const user= await db.collection('users').insertOne(req.body);
    
     await connection.close();
     res.json({message:"user created successfully ",user})
       }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
       }
}
)
app.post('/login',async(req,res)=>{
    try{
        //step 1 create a connection b/w nodejs and mongodb
    const connection = await  mongoClient.connect(process.env.MONGODB_URL);
    //step 2 select db
    const db = connection.db(dbName);
    //step 3 select collection and do operations(query)
     const product= await db.collection('products').findOneAndDelete({_id: mongodb.ObjectId(req.params.id)});
    
     await connection.close();
     res.json({message:"successfully deleted the product ",product})
       }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
       }
})


app.listen(3001)//keeps the server running localhost:3001