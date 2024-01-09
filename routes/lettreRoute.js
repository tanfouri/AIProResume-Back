const express = require('express')

const LettreController = require('../controllers/lettreController')

const router = express.Router()

router.route('/')
        .get(LettreController.lettreGet)
        .post(LettreController.createLettre)
router.route('/:id').put(LettreController.updateLettre)
router.route('/:id').delete(LettreController.deleteLettre)
                        
       
module.exports=router