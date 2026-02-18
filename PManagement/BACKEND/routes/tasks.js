const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const { 
    getTasksByProject, 
    createTask, 
    updateTaskStatus, 
    deleteTask 
} = require('../controllers/TaskController');



router.use(auth);

router.get('/:projectId', getTasksByProject);
router.post('/', createTask);
router.patch('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

module.exports = router;