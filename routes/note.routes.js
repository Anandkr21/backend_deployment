const express=require('express')
const {NoteModel}=require('../model/note.model')
const { UserModel } = require('../model/user.model')

const notesRouter=express.Router()

notesRouter.get('/', async(req,res) =>{
    const users=await UserModel.find()
    res.send(users)
})

notesRouter.post('/create', async(req,res) =>{
    const payload=req.body
    const note=new NoteModel(payload)
    await note.save()
    res.send({"msg":"Note Created"})
})


notesRouter.patch('/update/:id', async(req,res) =>{
    try {
        const id=req.params.id;
        const payload=req.body;
        await payload.findByIdAndUpdate({_id:id}, payload)
        res.send({"msg":`Note with id: ${id} has been updated.`})
    } catch (err) {
        res.send({'msg':'something went wrong', 'error':err.message})
    }
})


notesRouter.delete('/delete/:id', async(req,res) =>{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete({_id:noteID})
    res.send({"msg":`Note with id: ${noteID} deleted.`})
})


module.exports={
    notesRouter
}