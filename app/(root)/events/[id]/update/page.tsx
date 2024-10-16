import React from 'react'
import { auth } from '@clerk/nextjs/server'
import EventForm from '@/components/ui/shared/EventForm';
import { getEventById } from '@/lib/actions/event.actions';
type UpdateEventProps={
  params:{
    id:string
  }
}

const UpdateEvent= async({params:{id}}:UpdateEventProps)=> {
  const {sessionClaims}=auth();
  const userId=sessionClaims?.userId as string;
  const event=await getEventById(id)
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
      <h1 className='wrapper h3-bold text-center sm:text-left'>CreateEvent</h1>
    </section>
    <div className='wrapper my-8 '>
<EventForm 
event={event}
eventId={event._id}
userId={userId} type="Update"/>
    </div>
    </>
  )
}

export default UpdateEvent
