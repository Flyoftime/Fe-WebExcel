import { NextResponse } from "next/server";

export function middleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');


    if (req.method === 'OPTIONS') {
        return res.status(200).end();

    }
    
    return NextResponse.next();
};