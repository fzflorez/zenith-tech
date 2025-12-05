import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede superar los 50 caracteres." }),
  email: z
    .email({ message: "Debe ingresar un correo electrónico válido." })
    .min(1, "El correo electrónico es requerido"),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export const registerDefaultValues: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
};

export const loginDefaultValues: LoginFormData = {
  email: "",
  password: "",
};
