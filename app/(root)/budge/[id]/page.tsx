'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getUserById } from "@/lib/actions/user.actions"
import { SearchParamProps, CreateUserParams } from "@/types"
import Image from "next/image"
import {useEffect, useState } from "react"
import { GiAirBalloon } from "react-icons/gi";
export default function ConferencePage({ params: { id } }: SearchParamProps) {
  const [edit,setEdite]=useState<boolean>(false)
  const [user, setUser]=useState<CreateUserParams|null>(null)
  useEffect(()=>{
    const getUser= async()=>{
      if(!id) return;
    
      // const user= await getUserById(id);
      // console.log(user)
      const data= await getUserById(id);
      setUser(data)
      console.log(data)
    }
    getUser()

  },[id])
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 w-10 h-10 flex items-center justify-center">
            <span className="text-black text-2xl">∞</span>
          </div>
          <span className="text-xl font-medium">devops.js</span>
          <span className="text-gray-400 ml-4">The JavaScript DevOps Conference</span>
        </div>
        <div className="text-xl">February 15 - 16, 2024</div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl text-center mb-16">
          Registration to the event is now closed.
        </h1>

        {/* Badge Card */}
        <div className="max-w-md mx-auto">
          <Card className="relative bg-zinc-900 border-yellow-400 border-2 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 grid grid-cols-6 gap-4 p-4 opacity-10">
              {[...Array(24)].map((_, i) => (
                // <div key={i} className="w-full aspect-square bg-white rounded-lg flex items-center justify-center" >
                //   </div>
                  <GiAirBalloon key={i} size={ 96}   className="text-white" />
              ))}
            </div>
            
            <div className="relative p-6 space-y-6">
              {/* Badge Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-400 w-6 h-6 flex items-center justify-center">
                    <span className="text-black text-xs">∞</span>
                  </div>
                  <span className="text-white">devops.js</span>
                </div>
                <span className="text-2xl text-white">#00706</span>
              </div>

              {/* Badge Content */}
              <div className="flex items-center gap-6 py-5">
                <div className="  rounded-full overflow-hidden">
                  <Image 
                    width={96} 
                    height={96} 
                    src={user?.photo as string} 
                    alt="user photo" 
                    className="object-cover w-full h-full" 
                    quality={100} 
                  />
                </div>
                <div className="space-y-1 text-white">
                  <input 
                    type="text" 
                    contentEditable='true' 
                    id="title" 
                    className="text-2xl font-medium bg-transparent border-none text-white focus:outline-none" 
                    defaultValue={user?.firstName + " " + user?.lastName} 
                  />
                  <input 
                    contentEditable='true' 
                    type="text" 
                    id="subtitle" 
                    className="text-gray-400 bg-transparent border-none focus:outline-none w-full"  
                    defaultValue={user?.email}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Edit Button */}
          <div className="flex justify-center mt-8">
            <Button 
           onClick={() =>setEdite(!edit)}
              variant="outline"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-12"
            >
              EDIT
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

