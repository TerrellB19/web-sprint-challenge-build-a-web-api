// add middlewares here related to projects
const Projects = require('./projects-model')

async function checkProjectId(req, res, next){
    try{
        const id = await req.params.id
        const currentProject = await Projects.get(id)
        if(currentProject){
            req.project = currentProject
            req.id = id
            next()
        } else {
            res.status(404).send('ID not found')
        }
        
    }
    catch(err){
        next(err)
    }
}

async function checkNewProject(req, res, next){
    const { name, description, completed } = req.body
    console.log(await req.body)
    try{
        if(!name || !description || completed === undefined ){
            res.status(400).send('Description, Name, abd Completed are required')
        } else {
            next()
        }
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    checkProjectId,
    checkNewProject
}
