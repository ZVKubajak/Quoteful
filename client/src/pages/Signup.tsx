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

const signUpFormSchema = z.object({
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

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
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
      <div></div>
    </main>
  );
};

export default SignUp;
