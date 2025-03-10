
import { getUserById } from "@/lib/actions/user.actions";
import { sendEmail } from "@/lib/email";
import { BudgeParamProps } from "@/types"
import { redirect } from "next/navigation"
export default async function ConferencePage({ params: { id,event} }: BudgeParamProps) {
  console.log(id,event)
    const data= await getUserById(id);
    if(data){

        sendEmail(data.email,"here is your Budge",`${process.env.NEXT_PUBLIC_SERVER_URL}/budge/${id}/${event}`);
    }

  redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/budge/${id}/${event}`)
}

