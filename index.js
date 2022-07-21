const express = require('express')

const app = express();

app.get('/',(req,res)=>{
    res.send("listening ...")
})

app.listen(3000,function(){
    console.log("listening on port 3000 ")
})