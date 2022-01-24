const express = require('express');

const router = express.Router();

// route of projects
router.get('/', (req, res) => {
    res.render('project/addOrEdit.hbs', {
        viewTitle: "Insert Project"
    })
});

module.exports = router;