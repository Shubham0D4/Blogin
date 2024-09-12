const mysql = require("mysql2");


const connection = mysql.createConnection({
    host:'localhost',
    user:"yourusernamehere",
    password:"####",
    database:"Blogin"
});
connection.connect((err)=>{
    if(err){
        console.warn(err)
    }
    else{
        console.log("Connected to mysql")
    }
})

module.exports = connection;