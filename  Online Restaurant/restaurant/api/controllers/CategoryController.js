/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    //pagination for category and items using limit
    category:async(req,res)=>{
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        const pagelimit = parseInt(limit);
        if(limit){
            let category = await Category.find({ isDelete: false })
              .skip(skip)
              .limit(pagelimit)
              .populate("items",{ where:{isDelete:false}},{sort:'displayOrder ASC'})
              .then((category) => {
                 category = {
                 pageNumber:page,
                  limit: category.length,
                  category: category.filter((category) => {
                    return {
                      id: category.id,
                      name: category.name,
                      totalitems: category.items.length,
                      items: category.items,
                    };
                  }),
                };
                res.status(200).json({category});
              });
        }else{
             //filtering category
            search=req.query.search
            console.log("search", search);
            if(!search){
                const category=await Category.find({isDelete:false}).populate("items",{ where:{isDelete:false}},{sort:'displayOrder ASC'})
                .then(category =>{
                    const allcategory={
                        pageNumber:page,
                        limit: category.length,
                        count:category.length, 
                        category:category.filter(category =>{  
                            return{
                                id:category.id,
                                name:category.name,
                                totalitems:category.items.length,
                                items:category.items,
                                
                            }
                        })
                    };
                    res.status(200).json(allcategory);
        
                });
                console.log(category);
            }
            else{
                //search function
                const categorysearch=await Category.find({isDelete:false, name: {contains : search}
                });
                console.log(categorysearch);
                res.status(200).json({category:categorysearch})

            }
        
        }
    },

    //add category 
    addcategory:async(req,res)=>{
        const {name}=req.body
        const category=await Category.find({name:name,isDelete:false});
        //category name validation
        if(category.length != 0){
            res.status(400).json({message:'category was exists'})
        }else{
            //create a category
            const addcategory=await Category.create({name:name}).fetch();
            if(addcategory){
                console.log(addcategory);
                res.status(200).json({message:'success', category:addcategory})
            }else{
                res.status(404).json({message:'category was not found'})
            }

        }
      
    },
//get category by id
    editcategory:async(req,res)=>{
        const id=req.params.id;
        const category =await Category.findOne({id:id,isDelete:false }).then((category)=>{
            console.log(category);
            if(category){
                res.status(200).json({message:'category details',category:category})
            }
            else{
                res.status(404).json({message:'id was not found'})
            } 

        })
        .catch((err)=>{
            console.log(err);
            res.status(404).json({error:err});
        });
        console.log(category);
    },
// update category name 
    updatecategory:async(req,res)=>{
        const id=req.params.id;
        const {name}=req.body;
        const category=await Category.find({name:name,isDelete:false});
        //category name validation
        if(category.length != 0){
            res.status(400).json({message:'category was exists'})
        }else{
            //update a category
            const category=await Category.update(id,{name:name,updatedAt:new Date()})
            .then((err)=>{
                if(err){
                    res.status(404).json({message:'failed to update'})
                }
              }).catch((err)=>{
                console.log(err);
                res.status(404).json({error:err});
            });
              res.status(200).json({message:'success',category})
        }
      
    },
//delete category 
    deletecategory:async(req,res)=>{
        const id=req.params.id;
        //finding item which store particular category and delete the item also
        const items=await Items.update({category:id}).set({isDelete:true})
   
        const category=await Category.update(id,{isDelete:true,deleteddAt:new Date()})
        .then((err)=>{
            if(err){
                res.status(404).json({message:'failed to delete'})
            } 
          }).catch((err)=>{
            console.log(err);
            res.status(404).json({error:err});
        });
          res.status(200).json({message:'success deleted',category:category,item:items})
    },
//user dashboard
    menu: async (req, res) => {
        const category = await Category.find({ isDelete: false })
             .populate("items",{ where:{isDelete:false}},{sort:'displayOrder ASC'})
          if(category) {
            const resp = {
              count: category.length,
              category: category.map((category) => {
                return {
                  name: category.name,
                  totalitems: category.items.length,
                  items: category.items.map((item)=>{
                    return {
                        id: item.id,
                        itemname:item.itemname,
                        price:item.price,
                        image: item.image,
                        displayOrder: item.displayOrder,
                    }
                  })
                };
              }),
            };
            res.status(200).json(resp);
          };

        console.log(category);
      },
};
