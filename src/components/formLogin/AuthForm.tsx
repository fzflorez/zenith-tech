"use client";

import { loginAction, signUpAction } from "@/src/actions/users";
import {
  loginDefaultValues,
  LoginFormData,
  loginSchema,
  registerDefaultValues,
  RegisterFormData,
  registerSchema,
} from "@/src/schemas/AuthSchema";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type Props = {
  type: "login" | "signUp";
};

type FormData = LoginFormData | RegisterFormData;

export default function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(isLoginForm ? loginSchema : registerSchema),
    defaultValues: isLoginForm ? loginDefaultValues : registerDefaultValues,
  });

  const {
    register,
    formState: { errors },
  } = form;

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const { fullName, email, password } = data as RegisterFormData;

      let errorMessage: string | null;
      let title: string;
      let description: string;

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Sesión iniciada";
        description = "Has iniciado sesión correctamente";
      } else {
        errorMessage = (await signUpAction(fullName!, email, password))
          .errorMessage;
        title = "Registrado";
        description = "Verifica tu correo electrónico para confirmar tu cuenta";
      }

      if (!errorMessage) {
        toast.success(title, { description, duration: 6000 });
        if (isLoginForm) {
          router.replace("/");
        } else {
          router.replace("/login");
        }
      } else {
        if (errorMessage.includes("registrado")) {
          toast.error("El correo ya está registrado", {
            description: "Por favor inicia sesión con tu cuenta",
          });
          router.push("/login");
        } else {
          toast.error(errorMessage);
        }
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {!isLoginForm && (
              <div className="grid w-full gap-2">
                <Label htmlFor="fullName">Nombre</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ingrese su nombre"
                  disabled={isPending}
                  {...register("fullName")}
                />
                {"fullName" in errors && errors.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message as string}
                  </p>
                )}
              </div>
            )}

            <div className="grid w-full gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese su correo electrónico"
                disabled={isPending}
                {...register("email")}
              />
              {"email" in errors && errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                disabled={isPending}
                {...register("password")}
              />
              {"password" in errors && errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center gap-4">
          <Button className="w-full cursor-pointer" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Iniciando...
              </span>
            ) : isLoginForm ? (
              "Iniciar Sesión"
            ) : (
              "Registrarse"
            )}
          </Button>

          <p className="text-sm">
            {isLoginForm
              ? "¿Aún no tienes una cuenta?"
              : "¿Ya tienes una cuenta?"}{" "}
            <Link
              href={isLoginForm ? "/sign-up" : "/login"}
              className="text-blue-500 underline"
            >
              {isLoginForm ? "Regístrate" : "Inicia sesión"}
            </Link>
          </p>
        </CardFooter>
      </form>
    </FormProvider>
  );
}
