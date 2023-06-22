// add middlewares here related to actions
const Actions = require('./actions-model')

async function checkActionsId(req, res, next){
    try{
        const id = await req.params.id
        const currentActions = await Actions.get(id)
        if(currentActions){
            req.actions = currentActions
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

async function checkNewActions(req, res, next){
    const { notes, description, project_id } = req.body
    console.log(await req.body)
    try{
        if(!notes || !description || project_id === undefined ){
            res.status(400).send('Notes, Description, and Project_id are required')
        } else {
            next()
        }
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    checkActionsId,
    checkNewActions
}