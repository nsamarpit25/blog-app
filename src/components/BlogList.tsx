"use client";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const BlogList = () => {
   useEffect(() => {
      const fetchBlogs = async () => {
         try {
            const { data } = await axios.get("/api/blogs-list");
            console.log(data);
         } catch (error) {
            console.error(error);
            toast.error("Failed to fetch blogs");
         }
      };
      fetchBlogs();
   }, []);

   return <div>Blogs....</div>;
};

export default BlogList;
