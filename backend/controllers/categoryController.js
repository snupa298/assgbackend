const Category=require("../models/categoryModel")

exports.newCategory = async(req,res)=>{
    try{
const {name,description} = req.body;
const newCategory=new Category({
 name,
 description
})
const savedCategory=await newCategory.save();
res.status(201).json(savedCategory)
    }
    catch(err){
        res.status(500).json({error:err.message}) 
    }
}

exports.getCategories = async (req,res,next) => {
    try{
    const categories = await Category.find({})
    res.json(categories)
    }
    catch(error){
    next(error)
    }
    }