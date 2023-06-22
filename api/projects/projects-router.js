// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const { checkProjectId, checkNewProject } = require('./projects-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const projectsData = await Projects.get()
    try{
        res.json(projectsData)
    }
    catch(error){
        next(error)
    }
})

router.get('/:id', checkProjectId, (req, res) => {
    
    res.json({
        id: req.id,
        name: req.project.name,
        description: req.project.description,
        completed: req.project.completed,
    })
})

router.post('/', checkNewProject, async (req, res, next) => {
    const newProject = await Projects.insert(req.body)
    try{
        res.status(201).json(newProject)
    } catch(err){
        next(err)
    }
})

router.put('/:id', checkNewProject, checkProjectId, async (req, res, next) => {
    try
    {const updatedProject = await Projects.update(req.params.id, req.body)
    console.log(req.params.id)
    res.status(201).json(updatedProject)
    } catch(err){
        next(err)
    }
})

router.delete('/:id',checkProjectId, async (req, res, next) => {
    try{
        const currentProject = await Projects.get(req.params.id)
    res.status(200).json(currentProject)      
    await Projects.remove(req.params.id)
    } catch(err){
        next(err)
    }    
})

router.get('/:id/actions', checkProjectId, async (req, res) => {
    const projectActions = await Projects.getProjectActions(req.params.id)
    res.json(projectActions)
})



module.exports = router