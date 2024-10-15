import { CreateEventParams, UpdateEventParams } from "@/types";
import { connectToDatabase } from "../mongodb/database";
import User from "../mongodb/database/model/user.model";
import Event from "../mongodb/database/model/event.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const createEvent=async ({event,userId}:CreateEventParams)=>{
    console.log("create event",event,userId)
    try {
        await connectToDatabase();
        const organizer=await User.findById(userId);
if(!organizer){
    throw new Error('Organizer not found');
}
        const newEvent=await Event.create({...event,category:event.categoryId,organizer:userId });
        return JSON.stringify(newEvent);
    } catch (error) {
        handleError(error)
    }
}

export async function updateEvent({ userId, event, path }: UpdateEventParams) {
    try {
      await connectToDatabase()
  
      const eventToUpdate = await Event.findById(event._id)
      if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
        throw new Error('Unauthorized or event not found')
      }
  
      const updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { ...event, category: event.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
      handleError(error)
    }
  }