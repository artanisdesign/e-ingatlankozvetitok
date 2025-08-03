import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")
  const secret = request.nextUrl.searchParams.get("secret")

  let slug = path || "/"

  if (!secret) {
    return NextResponse.json(
      { message: "Missing secret param" },
      { status: 401 }
    )
  }

  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }
  if (!slug) {
    return NextResponse.json({ message: "Missing path param" }, { status: 400 })
  }
  revalidatePath(slug)

  return NextResponse.json({ revalidated: true, now: Date.now(), path: slug })
}
