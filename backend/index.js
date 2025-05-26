const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config()

var admin = require("firebase-admin");

var serviceAccount = require(process.env.FIREBASE_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db= admin.firestore()
const tasksCollection = db.collection('tasks');

app.post('/tasks',async (req,res)=>{
    const {name,dueDate}=req.body;

    if(!name||!dueDate){
        return res.status(400).json({error:'Task name and due date are required. '})
    }
    const newTask={
        name,
        dueDate,
        isCompleted:false
    }
    try{
        const docRef = await tasksCollection.add(newTask)
        res.status(201).json({id:docRef.id, ...newTask})
    }catch(error){
        res.status(500).json({error:'Faild to add task.'})
    }
})

app.delete('/tasks/:id',async(req,res)=>{
    const {id}= req.params

    try{
        await tasksCollection.doc(id).delete()
        res.status(204).send()
    } catch(error){
        res.status(404).json({error:'Task not found or delete fails'})
    }

})
app.patch('/tasks/:id', async(req,res)=>{
    const {id}=req.params;
    const {isCompleted}=req.body

    try{
        await tasksCollection.doc(id).update({isCompleted})
        const updatedDoc = await tasksCollection.doc(id).get()
        res.status(200).json({id:updatedDoc.id,...updatedDoc.data()})
    } catch(error){
        res.status(404).json({error:'Task not found or update failed'})
    }
    
})

app.get('/tasks', async(req,res) =>{
    try{
        const alltasks = await tasksCollection.get()
        const tasks= alltasks.docs.map(doc=>({id:doc.id, ...doc.data()}))
        res.status(200).json(tasks)
    } catch(error){
        res.status(500).json({error:'Faild to fetch tasks.'})
    }
})

app.listen(3002,()=>{
    console.log("Server is running on http://localhost:3002")
})