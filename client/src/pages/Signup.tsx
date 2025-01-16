import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validator from "validator";
import { signUp } from "@/auth/authService";
import auth from "@/auth/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
import { Input } from "@/components/ui/input";

const signupFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username can not be more than 20 characters.",
    }),
  email: z.string().refine((value) => validator.isEmail(value), {
    message: "Invalid email address.",
  }),
  password: z.string().refine((value) => validator.isStrongPassword(value), {
    message:
      "Password must be 8-20 characters long, include at least one lowercase letter, one uppercase letter, one number, and one special character.",
  }),
});

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      const { token } = await signUp(values);
      auth.login(token);

      navigate("/");
    } catch (errorMessage: any) {
      console.error("Signup Failed:", errorMessage);
      form.setError("root", {
        message: "Unable to create account, please try again.",
      });
    }
  };

  return (
    <main>
      <h1 className="text-center font-caveat text-6xl py-16">
        Create an Account
      </h1>

      <div className="flex justify-evenly">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/5 border-2 border-gray-400 rounded-xl shadow-xl shadow-gray-900 px-12 py-8 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="username"
                      placeholder="Bryce Berczik"
                      className="bg-zinc-950 border-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Other users will see this. 3-20 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="my@email.com"
                      className="bg-zinc-950 border-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password123!"
                      className="bg-zinc-950 border-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Password must be 8-20 characters long, include at least one
                    lowercase letter, one uppercase letter, one number, and one
                    special character.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </main>
  );
};

export default SignUp;
