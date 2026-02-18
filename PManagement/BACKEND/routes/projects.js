const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const projectController = require('../controllers/projectController');

router.get('/', auth, projectController.getProjects);
router.post('/', auth, projectController.createProject);
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;