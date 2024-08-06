const { faker } = require('@faker-js/faker');
const mysql=require('mysql2');
const path=require("path")

const express=require("express");
const app=express();
let port=8080;


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

app.listen(port,()=>{
    console.log("server is listening to port ",port)
})

//home route
app.get("/" ,(req,res)=>{
    let q=`SELECT COUNT(*) FROM user`;

    try{
            connection.query(q,(err,result)=>{
                if (err) throw err
               let countvar= result[0]["COUNT(*)"];
                res.render("home.ejs",{countvar})
            })
        } catch (err){
            console.log("error in connection to database ",err);
            res.send("some error in DB")
        }
})

//show route
app.get("/user",(req,res)=>{
    let q=` SELECT * FROM user`;

    try{
        connection.query(q,(err,users)=>{
            if (err) throw err
           res.render("showUsers.ejs",{users})
        })
    } catch (err){
        console.log("error in connection to database ",err);
        res.send("some error in DB")
    }
})

//edit route
app.get("/user/:id/edit",(req,res)=>{    

        let {id} =req.params;
        let q=`SELECT * FROM user WHERE id='${id}'`;
        try{         
        connection.query(q, (err,result) =>{
            if (err) throw err;
          let user= result[0];
            res.render("edit.ejs",{user})
        })
    } catch (err){
        console.log("error in connection to database ",err);
        res.send("some error in DB")
    }
})

const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydata',
    password:'197674'
})

let getRandomUser=()=>{
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}; 

// let q="INSERT INTO user (id,username,email,password) VALUES ?";
// let data=[];
// for(let i=1;i<=100;i++){
//     data.push(getRandomUser());
// }
// try{
//     connection.query(q,[data],(err,result)=>{
//         if (err) throw err
//         console.log(result)
//     })
// } catch (err){
//     console.log("error in connection to database ",err);
// }

// connection.end();


 