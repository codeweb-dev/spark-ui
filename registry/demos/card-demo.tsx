import { Button } from "@/registry/spark-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/spark-ui/card";
import { Input } from "@/registry/spark-ui/input";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="text-lg">Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </div>
          <Button variant="link" className="h-auto p-0">
            Sign Up
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="card-demo-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="card-demo-email"
              type="email"
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="card-demo-password"
                className="text-sm font-medium"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="card-demo-password" type="password" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Login</Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
