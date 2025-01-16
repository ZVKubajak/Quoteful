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
  FormDescription,
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
    message:
      "Password must be 8-20 characters long, include at least one lowercase letter, one uppercase letter, one number, and one special character.",
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
    }
  };

  return (
    <main className="flex justify-evenly pt-56">
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
          <div className="flex justify-evenly">
            <Button
              type="submit"
              variant="outline"
              className="bg-neutral-950 border-lime-300 px-20"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default Login;
