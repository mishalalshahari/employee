const express = require('express');
const router = express.Router();
const Project = require('../model/Project.model');
const UserModel = require('../model/User.model');

router.post('/create', async function(req, res, next) {
    var {projectName, projectDescription, createdBy} = req.body;
    let checkIfUserExists;
    try{
        checkIfUserExists = await UserModel.find({_id: createdBy});
    }
    catch(err){
        return res.status(500).send("Error in finding user");
    }
    if(!checkIfUserExists){
        return res.status(404).send("User not found");
    }

    let project = new Project({
        projectName: projectName,
        projectDescription: projectDescription,
        createdBy: createdBy,
    });

    let ifProjectSaved = await project.save();
    if(!ifProjectSaved){
        return res.status(500).send("Error in creating project");
    }

    return res.status(200).send("Project created successfully");
});

router.get('/getAllProjects', async function(req, res, next) {
    let allProjects = await Project.find({isDeleted: false});
    if(!allProjects){
        return res.status(500).send("Error in fetching projects");
    }
    return res.status(200).send(allProjects);
});

router.get('/getProjectById/:projectId', async function(req, res, next) {
    let projectId = req.params.projectId;
    let project = await Project.find({_id: projectId, isDeleted: false});
    if(!project){
        return res.status(404).send("Project not found");
    }
    return res.status(200).send(project);
});

router.get('/getProjectByUserId/:userId', async function(req, res, next) {
    let userId = req.params.userId;
    let project = await Project.find({createdBy: userId, isDeleted: false});
    if(!project){
        return res.status(404).send("Project not found");
    }
    return res.status(200).send(project);
});

router.post('/assignProjectToUser', async function(req, res, next) {
    let {projectId, userId} = req.body;
    let checkIfUserExists;
    let checkIfProjectExists;

    try{
        checkIfUserExists = await UserModel.findOne({_id: userId});
        checkIfProjectExists = await Project.findOne({_id: projectId}); 
    }
    catch(err){
        return res.status(404).send("User or Project not found");
    }

    if(checkIfProjectExists.projectMembers.includes(userId)){
        return res.status(409).send("User already assigned to project");
    }

    checkIfProjectExists.projectMembers.push(userId);
    checkIfUserExists.projects.push(projectId);
    let ifProjectSaved = await checkIfProjectExists.save();
    let ifUserSaved = await checkIfUserExists.save();
    if(!ifProjectSaved || !ifUserSaved){
        return res.status(500).send("Error in assigning project to user");
    }
    return res.status(200).send("Project assigned to user successfully");
});


module.exports = router;