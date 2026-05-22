import { getSession } from 'better-auth/api'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {headers} from 'next/headers'

export async function proxy(request) {
console.log('Proxy middleware triggered for:', request.url)
  const session = await auth.api.getSession({
    headers: await headers()
  })
  console.log('Session in proxy:', session)
  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/my-requests',
        '/dashboard/add-pet',
        '/dashboard/my-listings',
        '/dashboard/update-pet/:path*',
        '/home/detail/:path*'
    ]
}
