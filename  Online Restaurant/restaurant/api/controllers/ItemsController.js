/**
 * ItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */




module.exports = {
  //get all items
  items: async (req, res) => {
    const item = await Items.find({ isDelete: false })
      .then((item) => {
        res.status(200).json({ message: "totale item",
        count:item.length, 
         item: item 
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ error: err });
      });
    console.log(item);
  },
//add items
  additems: async (req, res) => {
    const { itemname, description, price, category, image, displayOrder } =
      req.body;
    const items = await Items.find({ itemname: itemname,category:category });
    const itemorders = await Items.find({
      displayOrder: displayOrder,
      category: category,
    });
    //item name and category validation
    if(items.length !=0){
      res
        .status(404)
        .json({
          message: 'item name was existed',
        });
    }
    else{
      //display order validation
      if (itemorders.length != 0) {
        res
          .status(404)
          .json({
            message: `item order ${displayOrder} already existed`,
          });
      } 
      else {
        //create new item
        const item = await Items.create({
          itemname: itemname,
          description: description,
          price: price,
          category: category,
          image: image,
          displayOrder: displayOrder,
        }).fetch();
        if (item) {
          res.status(200).json({ message: "success", item: item });
        }
      }
    }
   
  },
//get item details
  editItems: async (req, res) => {
    const id = req.params.id;
    const item = await Items.findOne({ id: id,isDelete:false });
    if (item) {
      res.status(200).json({ message: "Item was found", item: item });
    } else {
      res.status(200).json({ message: "id not found" });
    }
  },
//update item
  updateItems: async (req, res) => {
      const { itemname, description, price, category, image, displayOrder } = req.body;
      const id = req.params.id;
      const items = await Items.find({ itemname: itemname,category:category });
      const itemorders = await Items.find({
        displayOrder: displayOrder,
        category: category,
      });
      //item name and category validation
      if(items.length !=0){
        res
          .status(404)
          .json({
            message: 'item name was existed',
          });
      }
      else{
        //displayOrder and category validation
        if (itemorders.length != 0) {
          res
            .status(404)
            .json({
              message: `item order ${displayOrder} already existed`,
            });
        } 
        else {
          const item = await Items.update(id, {
            itemname: itemname,
            description: description,
            price: price,
            category: category,
            image: image,
            displayOrder: displayOrder,
            updatedAt:new Date()
          })
            res.status(200).json({message:'success',item:item}); 
        }
      }
    
  
  },
//delete items
  deleteitem:async(req,res)=>{
    const id = req.params.id;
    const items=await Items.update(id,{isDelete:true,deleteddAt:new Date()})
    .then((err)=>{
        if(err){
            res.status(404).json({message:'failed to update'})
        } 
      }).catch((err)=>{
        console.log(err);
        res.status(404).json({error:err});
    });
      res.status(200).json({message:'success deleted',items})
  }
};

        
