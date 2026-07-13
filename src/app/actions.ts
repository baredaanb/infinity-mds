'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === 'admin1') {
    // Set a secure HttpOnly cookie for 24 hours
    const cookieStore = await cookies();
    cookieStore.set('auth_token', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Redirect to home dashboard
    redirect('/home');
  } else {
    return { error: 'Invalid username or password. Access Denied.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  redirect('/');
}
