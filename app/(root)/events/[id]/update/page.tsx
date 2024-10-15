import React from 'react'
import { auth } from '@clerk/nextjs/server'
import EventForm from '@/components/ui/shared/EventForm';

const UpdateEvent=()=> {
  const {sessionClaims}=auth();
  const userId=sessionClaims?.userId as string;
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
      <h1 className='wrapper h3-bold text-center sm:text-left'>CreateEvent</h1>
    </section>
    <div className='wrapper my-8 '>
<EventForm userId={userId} type="Update"/>
    </div>
    </>
  )
}

export default UpdateEvent
