const USER = require('../models/userModel');
const demodata = "###";

exports.createUser = async (req,res)=>{

    try{
     const newUser = await USER.create(req.body);

     res.status(200).json({
        status: 'success',
        data:{
            user: newUser
        }
    });
    }
    catch(err)
    {
        res.status(500).json({
            status: 'error',
            message: err,
        });
    }
    
};

exports.getAllData =async(req, res) => {
    try{
        res.status(200).json({
            status: 'success',
            data: {
              demodata  
            },
        });
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        });    
    } 
};