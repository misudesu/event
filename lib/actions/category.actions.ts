"use server"

import { CreateCategoryParams } from "@/types"

import { connectToDatabase } from "@/lib/mongodb/database";
import Category from "@/lib/mongodb/database/model/category.model";
import { handleError } from "@/lib/utils";

export async function createCategory({categoryName} : CreateCategoryParams){
  
  try {
  
 await connectToDatabase();

       const newCategory = await Category.create({name: categoryName });
    
       return JSON.parse(JSON.stringify(newCategory));
   
  } catch (error) {
  
    handleError(error)
  }
}

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
     handleError(error)
  }
}