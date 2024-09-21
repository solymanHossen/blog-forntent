
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    const url = req.nextUrl.clone();
    if (!token && !url.pathname.startsWith('/auth/login') && !url.pathname.startsWith('/auth/register')) {
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }
    if (token && url.pathname === '/auth/register') {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }
    if (token && url.pathname === '/auth/login') {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/blog/','/blog/popular-blog/', '/auth/register','/auth/login' ],
};
