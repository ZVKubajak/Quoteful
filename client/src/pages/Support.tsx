import auth from "@/auth/auth";
import { updateUsername, deleteUser } from "@/services/userService";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Info } from "lucide-react";
import { Github } from "lucide-react";
import { Mail } from "lucide-react";
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
    .max(20, {
      message: "Username can not be more than 20 characters.",
    }),
});

const Support = () => {
  const [selected, setSelected] = useState<
    "update" | "delete" | "feedback" | null
  >(null);
  const [currentUsername, setCurrentUsername] = useState<string>("");

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

  const onUpdate = async (values: z.infer<typeof usernameFormSchema>) => {
    try {
      await updateUsername(userId, values.username);
      setCurrentUsername(values.username);

      Swal.fire({
        title: `Hello, ${values.username}!`,
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3085d6",
        background: "#333",
        color: "#fff",
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (userId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Deleting your account cannot be undone.",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Go Back",
        confirmButtonColor: "#ed0800",
        cancelButtonColor: "#3085d6",
        background: "#333",
        color: "#fff",
        allowOutsideClick: true,
        allowEscapeKey: true,
      });

      if (result.isConfirmed) {
        await Swal.fire({
          title: "Account Deleted",
          text: "Hope to see you again soon!",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#3085d6",
          background: "#333",
          color: "#fff",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        deleteUser(userId);
        auth.logout();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCurrentUsername(username);
  }, []);

  return (
    <main className="h-screen">
      <section id="support-nav">
        <h1 className="font-montserrat text-center text-5xl pt-20">Support</h1>
        <Separator className="bg-gray-600 mx-auto mt-6 mb-4 w-96" />
        <div className="flex h-5 justify-center space-x-4">
          <p
            className="text-gray-500 transition duration-250 hover:text-white hover:underline hover:cursor-pointer"
            onClick={() => setSelected("update")}
          >
            Update Username
          </p>
          <Separator orientation="vertical" className="bg-gray-400" />
          <p
            className="text-gray-500 transition duration-250 hover:text-white hover:underline hover:cursor-pointer"
            onClick={() => setSelected("delete")}
          >
            Delete Account
          </p>
          <Separator orientation="vertical" className="bg-gray-400" />
          <p
            className="text-gray-500 transition duration-250 hover:text-white hover:underline hover:cursor-pointer"
            onClick={() => setSelected("feedback")}
          >
            Feedback
          </p>
        </div>
      </section>
      <section id="support-container" className="w-1/2 h-[500px] mt-32 mx-auto">
        {selected === "update" && (
          <div className="w-3/5 mx-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onUpdate)}
                className="flex justify-evenly"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Username:</FormLabel>
                      <FormControl>
                        <Input
                          type="username"
                          className="bg-black !text-lg"
                          {...field}
                        />
                      </FormControl>
                      {!form.formState.errors.username && (
                        <FormDescription>
                          Other users will see this. 3-20 characters.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-black text-lg mt-8"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        )}
        {selected === "delete" && (
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              onClick={() => onDelete(userId)}
              className="w-1/5 border-red-600 bg-black text-xl p-5 text-gray-200 hover:bg-red-600 hover:text-white"
            >
              Delete Account
            </Button>
            <div className="flex justify-center w-1/2 text-red-500 mt-4">
              <Info size={20} className="mt-[1px] mr-1" />
              <p>
                All of your quotes will be included in the deletion process.
              </p>
            </div>
          </div>
        )}
        {selected === "feedback" && (
          <div className="text-center text-xl space-y-6 border bg-neutral-950 rounded-2xl w-4/5 mx-auto p-8">
            <p>
              Send feedback directly to my email,{" "}
              <span>zvkubajak@gmail.com</span>.
            </p>
            <p>or</p>
            <div className="flex justify-center text-gray-600 space-x-8">
              <a
                href="https://github.com/ZVKubajak"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github
                  size={64}
                  className="cursor-pointer transition duration-250 hover:text-white"
                />
              </a>
              <a
                href="mailto:zvkubajak@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail
                  size={64}
                  className="cursor-pointer transition duration-250 hover:text-white"
                />
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Support;
