"use client";
import type { Blog } from "@/app/api/blogs-list/route";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const BlogList = () => {
   const [blogs, setBlogs] = useState<Blog[]>();
   useEffect(() => {
      const fetchBlogs = async () => {
         try {
            const { data } = await axios.get("/api/blogs-list");
            setBlogs(data.blogs_list);
         } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
               toast.error(error.response?.data.error);
            }
         }
      };
      fetchBlogs();
   }, []);

   return (
      <div className="p-4  w-full">
         <h1>Blogs....</h1>
         <div>
            {blogs?.map((blog: Blog) => (
               <div
                  key={blog.id}
                  className="mt-2"
               >
                  <h2>{blog.title}</h2>
                  <p>{blog.excerpt}</p>
                  <p>{blog.date}</p>
                  <Button>Read Now</Button>
               </div>
            ))}
         </div>
      </div>
   );
};

export default BlogList;
