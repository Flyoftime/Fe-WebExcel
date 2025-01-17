import Register from '@/components/Auth/Register'
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
const Registerpage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');

  }
  return (
    <div>
      <Register />
    </div>
  )
}

export default Registerpage