import AuthForm from "@/src/components/formLogin/AuthForm";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-24">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex justify-center text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <AuthForm type="login" />
      </Card>
    </div>
  );
}
