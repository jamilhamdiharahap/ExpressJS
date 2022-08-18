const model = require("../../models/index");
const shoppingController = {};

shoppingController.create = async (req, res) => {
  try {
    const request = req.body;
    const product = await model.Shopping.create(request);
    if(product){
        const shopping = {
            createadd : request.Createdate,
            Name : request.Name
        }
        res.status(201).json({shopping:shopping});
    }else{
        res.status(400).json({message:"invalid created"});
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

shoppingController.getAll = async (req,res) =>{
    try{
        const shoppingAll = await model.Shopping.findAll();
        if(!shoppingAll){
            res.status(200).json({message:'not found'});
        }else{
            res.status(200).json({message:"get data success",shopping:shoppingAll});
        } 
    }catch(error){
        res.status(400).json({ message: "Internal Server Error" });
    }
}
shoppingController.getById = async (req,res) =>{
    try{
        const shoppingAll = await model.Shopping.findOne({where:{id:req.params.id}});
        if(!shoppingAll){
            res.status(200).json({message:'not found'});
        }else{
            res.status(200).json({shopping:shoppingAll});
        } 
    }catch(error){
        res.status(400).json({ message: "Internal Server Error" });
    }
}

shoppingController.update = async (req,res) =>{
    try{
        const reqs = req.body;
        const checkUpdate = await model.Shopping.findOne({where:{id:req.params.id}});
        if(checkUpdate){
            await model.Shopping.update({
                name:reqs.Name,
                Createdate:reqs.Createdate
            },{where:{id:req.params.id}});
            const shopping = {
                createadd : reqs.Createdate,
                Name :reqs.Name
            }
            res.status(200).json({shopping:shopping});
        }else{
            res.status(400).json({message:'Invalid Updated'});
        }
    }catch(error){
        res.status(400).json({ message: "Internal Server Error" });
    }
}

shoppingController.delete =  async(req,res)=>{
    try{
        const deleteShopping = await model.Shopping.destroy({where:{id:req.params.id}});
        if(deleteShopping){
            res.status(200).json({message:"deleted Success"});
        }else{
            res.status(400).json({message:"Invalid deleted"});    
        }
    }catch(error){
        res.status(400).json({ message: "Internal Server Error" });
    }
    

}


module.exports = shoppingController;