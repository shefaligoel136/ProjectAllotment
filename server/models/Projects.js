const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema({
    projectName : {
        type: String,
        required: true
    },
    tasks :{
        type: String,
        required: true
    },
    update :{
        type: Number,
    }
});

const Projects = mongoose.model("Projects",ProjectsSchema);
module.exports = Projects;