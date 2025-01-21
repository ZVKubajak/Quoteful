import auth from "@/auth/auth";
import { updateUsername } from "@/services/userService";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";
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

const usernameFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20),
});

const Support = () => {
  const [selected, setSelected] = useState<
    "update" | "delete" | "feedback" | null
  >(null);

  const navigate = useNavigate();

  let userId = "";
  let username = "";
  if (!auth.guestLoggedIn()) {
    const profile = auth.getProfile();
    if (profile) {
      (userId = profile.id), (username = profile.username);
    }
  } else {
    Swal.fire({
      title: "Account Required",
      text: "You need an account to write a quote.",
      icon: "warning",
      confirmButtonText: "Create Account",
      confirmButtonColor: "#3085d6",
      background: "#333",
      color: "#fff",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/signup");
      }
    });
  }

  const form = useForm<z.infer<typeof usernameFormSchema>>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <main className="h-screen">
      <section id="support-nav">
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
      </section>
      <section></section>
    </main>
  );
};

export default Support;
