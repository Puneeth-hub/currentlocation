import UserData from '../locomodel/model.js' 


export const createNewUser = async(req, res)=>{
    const {username, email, gender, place} = req.body; 
    
    try{
     
     const User = new UserData({username, email, gender, place}); 
     const savedUser = await User.save(); 
     
     res.status(201).json(savedUser);
    }catch(error){
     res.status(500).json({message: error.message})
    }
}


//get all users 

export const getAllUser = async(req,res)=>{
    try{
      const users = await UserData.find(); 
      res.status(200).json(users)
    }catch(error){
      res.status(500).json({message: error.message})
    }
}