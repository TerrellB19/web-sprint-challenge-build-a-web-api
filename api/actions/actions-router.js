// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')

const { checkActionsId, checkNewActions } = require('./actions-middlware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
        const allActions = await Actions.get()
        if(!allActions){
            res.status(404).json([])
        } else res.json(allActions)
    } catch(err){
        next(err)
    } 
})

router.get('/:id', checkActionsId,  (req, res) => {  
    res.json(req.actions)
})

router.post('/', checkNewActions, async (req, res, next) => {
    const newActions = await Actions.insert(req.body)
    try{
        res.status(201).json(newActions)
    } catch(err){
        next(err)
    }
})

router.put('/:id', checkNewActions, checkActionsId, async (req, res, next) => {
    try
    {const updatedActions = await Actions.update(req.params.id, req.body)
    console.log(req.params.id)
    res.status(201).json(updatedActions)
    } catch(err){
        next(err)
    }
})

router.delete('/:id',checkActionsId, async (req, res, next) => {
    try{
        const currentActions = await Actions.get(req.params.id)
    res.status(200).json(currentActions)      
    await Actions.remove(req.params.id)
    } catch(err){
        next(err)
    }    
})

module.exports = router
