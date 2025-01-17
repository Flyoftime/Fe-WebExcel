import Login from '@/components/auth/Login';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import React from 'react';

const Loginpage = async () => {

  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');

  }
  return (
    <div>
      <Login />
    </div>
  );
};

export default Loginpage;
