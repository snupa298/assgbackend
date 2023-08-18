const Product=require("../models/productModel")

exports.createProduct = async(req,res)=>{
    try{
        const product = new Product()
        const { title, description, availability, price, category} = req.body
        product.title = title
        product.description = description
        product.availability = availability
        product.price = price
        product.category = category
       
        await product.save()

        res.json({
            message: "product created",
            productId: product._id
        })
    }
    catch(err){
        res.status(500).json({error:err.message}) 
    }
}

exports.getAllProducts = async(req,res) =>{
    try{
        const products = await Product.find({})
        res.json(products)
        }
        catch(error){
            res.status(500).json({error:err.message})
        }
}

exports.getProductById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)
         
        res.json(product);
      } catch (err) {
        res.status(500).json({error:err.message})
      }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        await product.deleteOne()
        res.json({ message: "product removed" })
    } catch(err) {
        res.status(500).json({error:err.message})
    }
}

exports.updateProduct = async (req, res) => {
    try {
       const product = await Product.findById(req.params.id)
       const { title, description, availability, price, category } = req.body
       product.title = title || product.title
       product.description = description || product.description 
       product.availability = availability || product.availability
       product.price = price || product.price
       product.category = category || product.category
      
       await product.save()
       res.json({
          message: "product updated" 
       })
    } catch(err) {
        next(err)
    }
}
