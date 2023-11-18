import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { setCookie } from "./app/utils/cookie";

export async function middleware(request, res) {

  const jwt = request.cookies.get("myToken");
  console.log("JWT ALMACENADA EN COOKIE", jwt);

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log("token brr: ", jwt.value);

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("keymasterjagh06")
    );
    console.log("payload: ", payload);
    console.log("id de usuario: ", payload._id);

    return NextResponse.next();
  } catch (error) {
    console.log("mas error: ", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/client/dashboard/content-manager", "/client/dashboard/:path*"],
};
