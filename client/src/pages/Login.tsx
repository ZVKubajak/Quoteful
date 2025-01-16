import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validator from "validator";
import { login } from "@/auth/authService";
import auth from "@/auth/auth";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginFormSchema = z.object({
  email: z.string().refine((value) => validator.isEmail(value), {
    message: "Invalid email address.",
  }),
  password: z.string().refine((value) => validator.isStrongPassword(value), {
    message: "Invalid password.",
  }),
});

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const { token } = await login(values);
      auth.login(token);

      navigate("/");
    } catch (errorMessage: any) {
      console.error("Login Failed:", errorMessage);
      form.setError("root", {
        message:
          "No account found with that email address or incorrect password.",
      });
    }
  };

  const handleGuestLogin = () => {
    const guestToken = `guest-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("guest_token", guestToken);

    navigate("/");
  };

  return (
    <main>
      <h1 className="text-center font-caveat text-8xl pt-16 pb-20">Login</h1>
      <div className="flex justify-evenly">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/5 border-2 border-gray-400 rounded-xl shadow-xl shadow-gray-900 px-12 py-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
                      className="bg-zinc-950 border-zinc-600"
                      {...field}
                    />
                  </FormControl>
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
                  className="bg-neutral-950 border-lime-300 text-lg px-16 transition duration-250 hover:bg-default-950 hover:text-inherit hover:shadow-lg hover:shadow-lime-300/10"
                >
                  Submit
                </Button>
              </div>

              <p className="text-center text-lg py-3">or</p>

              <div className="flex justify-evenly">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-neutral-950 border-sky-300 text-md px-14 transition duration-250 hover:bg-default-950 hover:text-inherit hover:shadow-lg hover:shadow-sky-300/10"
                  onClick={handleGuestLogin}
                >
                  Continue As Guest
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Login;
