import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import type { Blog } from "../../blogs-list/route";

export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
   try {
      setTimeout(() => console.log("aah"), 1000);
      const id = (await params).id;
      const filePath = path.join(process.cwd(), "public/data/blogs.json");
      const blogs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const blog = blogs.find((blog: Blog) => blog.id == id);
      console.log(typeof blogs[0].id, typeof id);
      if (blog) {
         return NextResponse.json(blog);
      } else {
         return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: "Failed to fetch blog" },
         { status: 500 }
      );
   }
}
