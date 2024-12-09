// import { NextResponse } from "next/server";

// export async function handler(request) {
//   return NextResponse.json(
//     {
//       error: "Route not found",
//       message: "The requested API route does not exist.",
//     },
//     { status: 404 }
//   );
// }

// pages/api/[...slug].js
export default function handler(req, res) {
  // This will be invoked for any undefined routes
  return res.status(404).json({
    error: "API route not found",
    route: req.url,
  });
}
