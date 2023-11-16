import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import cookies from "js-cookie";
import React, { useEffect } from "react";

export async function middleware(request, res) {
 
  
}

export const config = {
  matcher: ["//client/dashboard/verify", "/client/dashboard/:path*"],
};
