const Project = require('../models/project'); 

// 1. Get Projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error("Get Projects Error:", err);
        res.status(500).send('Server Error');
    }
};

// 2. Create Project
exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newProject = new Project({
            title,
            description,
            user: req.user.id
        });
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error("Create Project Error:", err);
        res.status(500).send('Server Error');
    }
};

// 3. Delete Project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user.id 
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error("Delete Error:", err.message);
        res.status(500).send('Server Error');
    }
};