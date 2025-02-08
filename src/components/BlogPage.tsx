import type { Blog } from "@/app/api/blogs-list/route";
import { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
   blog: Blog;
}

const BlogPage: FC<Props> = ({ blog }) => {
   return (
      <div className="p-4 w-full flex flex-col items-start gap-2">
         Blog
         <h1>{blog.title}</h1>
         <div>{blog.excerpt}</div>
         <div>{blog.date}</div>
         <div>{blog.content}</div>
         <div>{blog.readTime}</div>
         <Link href="/">
            <Button>Back</Button>
         </Link>
      </div>
   );
};

export default BlogPage;
