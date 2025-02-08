import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface Blog {
   id: string;
   title: string;
   excerpt: string;
   date: string;
   content: string;
   readTime: string;
}

export async function GET() {
   try {
      const filePath = path.join(process.cwd(), "public/data/blogs.json");
      const blogs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const blogs_list = blogs.map((blog: Blog) => {
         return {
            id: blog.id,
            title: blog.title,
            excerpt: blog.excerpt,
            date: blog.date,
         };
      });
      return NextResponse.json({ blogs_list });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: "Failed to fetch blogs" },
         { status: 500 }
      );
   }
}
