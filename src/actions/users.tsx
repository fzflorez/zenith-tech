"use server";

import { createClient } from "../auth/server";
import { getErrorMessage } from "../lib/utils";

type ActionResult = {
  errorMessage: string | null;
};

export const loginAction = async (
  email: string,
  password: string
): Promise<ActionResult> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      let customMessage = "Ha ocurrido un error, por favor intenta de nuevo.";

      if (error.message === "Invalid login credentials") {
        customMessage = "Correo o contraseña incorrectos";
      }

      return { errorMessage: customMessage };
    }

    return { errorMessage: null };
  } catch (error: unknown) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const logOutAction = async (): Promise<ActionResult> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error: unknown) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signUpAction = async (
  fullName: string,
  email: string,
  password: string
): Promise<ActionResult> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName },
      },
    });

    if (error) {
      return { errorMessage: error.message };
    }

    if (
      data.user &&
      Array.isArray(data.user.identities) &&
      data.user.identities.length === 0
    ) {
      return { errorMessage: "Este correo ya está registrado" };
    }

    return { errorMessage: null };
  } catch (error: unknown) {
    return { errorMessage: getErrorMessage(error) };
  }
};
