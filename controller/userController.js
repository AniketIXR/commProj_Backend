const USER = require('../models/userModel');
const ApiFeatures = require('../Utils/apiFeatures');

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
        const features = new ApiFeatures(USER.find(),req.query)
        .filter()
        .sort()
        .paginate();
        const user = await features.query;
        res.status(200).json({
            status: 'success',
            data: {
               user,  
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