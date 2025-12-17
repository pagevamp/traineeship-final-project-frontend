import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    }
  );

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message || 'Login failed' },
      { status: backendRes.status }
    );
  }

  const response = NextResponse.json({ message: 'Logged in successfully' });

  response.cookies.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 48,
  });

  return response;
}
