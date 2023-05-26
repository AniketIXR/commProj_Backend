const USER = require('../models/userModel');
const ApiFeatures = require('../Utils/apiFeatures');
const catchAsync = require('../Utils/catchAsync');

exports.createUser =catchAsync( async (req,res,next)=>{
     const newUser = await USER.create(req.body);
    
     res.status(200).json({
        status: 'success',
        data:{
            user: newUser
        }
    });
    
    
});

//We dont need this in user but for reference of ApiFeatures i have addeed this
exports.getAllData =catchAsync(async(req, res,next) => {
  
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
   
});

exports.updateUser = catchAsync(async(req, res,next) => {
    const user = await USER.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators : true,
    });
    res.status(200).json({
        status: "success",
        data : {
            nft
        } 
    });
});

exports.deleteUser = catchAsync(async(req, res) => {
    await USER.findById(req.params.id);
    res.status(204).json({
        status: "success",
        data:null
    });
});