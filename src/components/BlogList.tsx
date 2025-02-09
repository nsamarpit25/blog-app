"use client";
import type { Blog } from "@/app/api/blogs-list/route";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

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
      <div className="p-4 container">
         <h1 className="text-5xl text-white text-center">Blogs</h1>
         <div>
            {blogs?.map((blog: Blog) => (
               <div
                  key={blog.id}
                  className="mt-2"
               >
                  <h2>{blog.title}</h2>
                  <p>{blog.excerpt}</p>
                  <p>{blog.date}</p>
                  <Image
                     src={blog.imageUrl}
                     width={200}
                     height={200}
                     alt="Random"
                  />
                  <Link href={`/blog/${blog.id}`}>
                     <Button>Read Now</Button>
                  </Link>
               </div>
            ))}
         </div>
      </div>
   );
};

{
   /* <Card className="py-4">
   <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <p className="text-tiny uppercase font-bold">Daily Mix</p>
      <small className="text-default-500">12 Tracks</small>
      <h4 className="font-bold text-large">Frontend Radio</h4>
   </CardHeader>
   <CardBody className="overflow-visible py-2">
      <Image
         alt="Card background"
         className="object-cover rounded-xl"
         src="https://heroui.com/images/hero-card-complete.jpeg"
         width={270}
      />
   </CardBody>
</Card>; */
}

export default BlogList;
