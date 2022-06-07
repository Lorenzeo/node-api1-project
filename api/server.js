// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();
const Model = require("./users/model")

server.use(express.json())

server.get("/", (req, res)=>{
    console.log("received a request");
    res.end();
})

server.post("/api/users", (req, res)=>{
    if (!req.body.name || !req.body.bio){
        res.status(400).json({message:"Please provide name and bio for the user"})
    } else{
        Model.insert(req.body)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch( err=>{
            res.status(500).json({message:"There was an error while saving the user to the database"})
        })
    }
})

server.get('/api/users', (req, res)=>{
    Model.find()
    .then(result => {
        if(result == null){
        res.status(500).json({message: "The users information could not be retrieved" })
        return;
    }
    res.json(result);
    })
    
    });  


server.get('/api/users/:id', (req, res)=>{
    Model.findById(req.params.id)
    .then(result =>{
        if(result == null){
            res.status(404).json({message: "The user with the specified ID does not exist"})
            return;
        }
            res.json(result);
        });
    });

server.delete("/api/users/:id", (req, res)=>{
    Model.remove(req.params.id).then(result =>{
            if(result == null){
                res.status(404).json({message:  "The user with the specified ID does not exist"  })
                return;
            }
                res.json(result);
        })
    })

server.put("/api/users/:id", (req,res)=>{
    if(!req.body.name || !req.body.bio){
        res.status(400).json({message:"Please provide name and bio for the user"})
    }else{
    Model.update(req.params.id, req.body)
        .then(result =>{
            if(result == null){
                res.status(404).json({message: "The user with the specified ID does not exist" })
                return;
            }
            res.json(result);
        })
        .catch(result =>{
            res.status(500).json({message:"There was an error while saving the user to the database"})
        })}
    
    
        });
    
    


module.exports = server; // EXPORT YOUR SERVER instead of {}

// server.put("/api/users/:id", (req,res)=>{
//     if (!req.body.name || !req.body.bio){
//         res.status(400).json({message:"Please provide name and bio for the user"})
//     } else{
//         Model.update(req.body)
//         .then(result =>{
//             res.status(404).json({message: "The user with the specified ID does not exist"})
//         })
//         .catch( err=>{
//             res.status(500).json({message:"There was an error while saving the user to the database"})
//         })
//     }
// })