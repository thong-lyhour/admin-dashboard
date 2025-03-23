'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function login(formData: any) {
    const user = { userName: formData.userName, password: formData.password };

    // Check user credentials here

    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires })


    const cookiesStore = await cookies();
    cookiesStore.set('session', session, { expires, httpOnly: true })

    return true;
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value;
    if(!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;

    if(!session) return;


    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000) as Date;
    const res = NextResponse.next();
    res.cookies.set('session', await encrypt(parsed), {
        httpOnly: true,
        expires: parsed.expires as Date
    });
    return res;
}