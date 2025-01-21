import auth from "@/auth/auth";
import { updateUsername } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Swal from "sweetalert2";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Support = () => {
  return (
    <main className="h-screen border">
      <div className="">
        <h1 className="font-montserrat text-center text-5xl mt-20">Support</h1>
        <Separator className="bg-gray-600 mx-auto mt-6 mb-4 w-96" />
        <div className="flex h-5 justify-center space-x-4">
          <p className="text-gray-500 transition duration-250 hover:text-white hover:underline hover:cursor-pointer">
            Update Username
          </p>
          <Separator orientation="vertical" className="bg-gray-400" />
          <p className="text-gray-500 transition duration-250 hover:text-white hover:underline hover:cursor-pointer">
            Delete Account
          </p>
          <Separator orientation="vertical" className="bg-gray-400" />
          <p className="text-gray-500 transition duration-250 hover:text-white hover:underline hover:cursor-pointer">
            Feedback
          </p>
        </div>
      </div>
      <section></section>
    </main>
  );
};

export default Support;
