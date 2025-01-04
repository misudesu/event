import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function page() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  redirect(`/budge/${userId}`)
}
