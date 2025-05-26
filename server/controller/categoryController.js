import slugify from "slugify";
import categorySchema from "../modal/categorySchema.js";

export const createCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message : "Name is required"});
        }
        const existingCategory = await categorySchema.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:"Category already exists"
            });
        }
        const category = await new categorySchema({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success:true,
            message:"Category created successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category",
        });
    }
}
//update Category
export const updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categorySchema.findByIdAndUpdate(
            id,
            {name, slug: slugify(name)},
            {new:true}
        );
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while Updating Category',
        });
    }
}

// Get all category

export const categoryController = async (req,res) => {
    try {
        const category = await categorySchema.find({});
        res.status(200).send({
            success:true,
            message:"All category List",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting category",
        })
    }
}

// single Category

export const singleCategoryController = async (req,res) => {
    try {
        const category = await categorySchema.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"Get Single Category Successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single category",
        })
    }
}

//Delete Category

export const deleteCategoryController = async (req,res) => {
    try {
        const {id} = req.params;
        await categorySchema.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting category",
        })
    }
} 

