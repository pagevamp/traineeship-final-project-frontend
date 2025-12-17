import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  const response = NextResponse.json({ message: 'User Logged out' });
  return response;
}
