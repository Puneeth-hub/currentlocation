import express from 'express' 
import {createNewUser, getAllUser} from '../lococontroller/controller.js'

const router = express.Router() 

router.post('/new', createNewUser); 
router.get('/all', getAllUser)


export default router;