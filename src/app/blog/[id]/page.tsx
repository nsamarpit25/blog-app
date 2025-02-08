import type { Blog } from "@/app/api/blogs-list/route";
import BlogPage from "@/components/BlogPage";
import axios, { AxiosError } from "axios";
import { Suspense } from "react";

export default async function page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   let blog: Blog = {
      id: "",
      title: "",
      excerpt: "",
      date: "",
      content: "",
      readTime: "",
   };
   try {
      const { data } = await axios.get(
         `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`
      );
      blog = data;
   } catch (error) {
      if (error instanceof AxiosError) {
         console.log(error.response?.data.error);
      }
   }

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div>
            <h1>Blog Page</h1>
            <BlogPage blog={blog} />
         </div>
      </Suspense>
   );
}
