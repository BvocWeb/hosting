import mongoose from "mongoose";
import express, { Router } from "express";
import AddProject from "./models/project.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let conn= await mongoose.connect("mongodb://localhost:27017/Fullstack")
const app = express();
const port = 3000;
app.use(cors());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// Get all projects
app.get('/api/services', async (req, res) => {
  const projects = await AddProject.find();
   res.json(projects);
});

// POST route
app.post('/api/services', async (req, res) => {
  const { name, status } = req.body;
  const prjDetails = new AddProject({id: Date.now(), name, status});

  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });}
      //const newProject = { id: Date.now(), name, status };
      await prjDetails.save();
      res.status(200).json({ message: 'Project added successfully' });

  });

app.listen(port, () =>{
    console.log(`Server listenining on port ${port}`)
})