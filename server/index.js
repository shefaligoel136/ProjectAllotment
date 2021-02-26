// Entry point of our server.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // it helps us to access the api that we create
const app = express();

const ProjectsModel = require('./models/Projects');

app.use(express.json()); // helps in receiving info from the frontend using json format
app.use(cors());

mongoose.connect('mongodb+srv://Shefali:crudByShefali@crud.021pb.mongodb.net/projects?retryWrites=true&w=majority',{
    useNewUrlParser: true,
})

app.post('/insert', async(req,res) => {

    // this came from client app.js     
    const projectName = req.body.projectName
    const tasks = req.body.tasks

    const projects = new ProjectsModel({
        projectName : projectName,
        tasks : tasks,
        update : 0
    }); // helps in creating an instace about the data in db

    try{
        await projects.save(); // db to save info into collection
        res.send("Inserted data");
    }catch(err){
        console.log(err);
    }
})

app.get('/read', async(req,res) => {
    // read data from the database we need to grap the project model

    ProjectsModel.find({}, (err,result) => {
        if(err){
            res.send(err); // res closes everything hence we don't need to write else statement
        }

        res.send(result)
    })
})

app.put('/update', async(req,res) => {
    const updateProjectName = req.body.updateProjectName;
    const id = req.body.id;

    try{
        await ProjectsModel.findById(id, (err,updateProject) => {
            // console.log(updateProject);
            updateProject.projectName = updateProjectName
            updateProject.update = updateProject.update + 1
            updateProject.save();
            res.send("Updated");
        })
        
    }catch(err){
        console.log(err);
    }

})

app.delete('/delete/:id', async(req,res) => {

    const id = req.params.id;
    
    await ProjectsModel.findByIdAndRemove(id).exec();
    res.send("Deleted");

})

// app.put('/complete/:id', async(req,res) => {
   
//     const complete = req.body.complete;
//     try{
//         await ProjectsModel.findById(id,(err,updateCount) => {
//             updateCount.complete = updateCount.complete+complete
//             updateCount.save();
//             res.send("counted");
//         })
//     }catch(err){
//             console.log(err);
//         }
    // })

app.listen(8000,()=>{
    console.log("Server running on port 8000");
})