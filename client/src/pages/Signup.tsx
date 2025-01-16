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
    .max(20),
  email: z.string().refine((value) => validator.isEmail(value), {
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .max(20)
    .refine((value) => validator.isStrongPassword(value), {
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
                  {!form.formState.errors.username && (
                    <FormDescription>
                      Other users will see this. 3-20 characters.
                    </FormDescription>
                  )}
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
                  {!form.formState.errors.password && (
                    <FormDescription>
                      Password must be 8-20 characters long, include at least
                      one lowercase letter, one uppercase letter, one number,
                      and one special character.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-red-500 text-sm text-center">
                {form.formState.errors.root.message}
              </p>
            )}

            <div>
              <div className="flex justify-evenly">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-neutral-950 border-purple-500 text-lg px-16 transition duration-250 hover:bg-default-950 hover:text-inherit hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <p className="text-center text-md text-gray-300 pt-8">
        Already have an account? Login{" "}
        <Link to="/login">
          <span className="text-blue-400 hover:text-blue-500">here</span>.
        </Link>
      </p>
    </main>
  );
};

export default SignUp;
