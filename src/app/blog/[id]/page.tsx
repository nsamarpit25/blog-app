import type { Blog } from "@/app/api/blogs-list/route";
import BlogPage from "@/components/BlogPage";
import { AxiosError } from "axios";

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
      const data = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`,
         { next: { revalidate: 100 } }
      );
      blog = await data.json();
   } catch (error) {
      if (error instanceof AxiosError) {
         throw new Error(error.response?.data.error);
      }
   }

   return (
      <div>
         <h1>Blog Page</h1>
         <BlogPage blog={blog} />
      </div>
   );
}
