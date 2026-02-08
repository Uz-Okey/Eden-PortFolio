import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { loginThunk } from "@/Redux/Slice/authslice";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner"
interface LoginRequest {
    email: string;
    password: string;
}
const LoginPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginRequest>();
    const location = useLocation()
    const navigation = useNavigate()
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((state) => state.auth)
    const from = location.state?.from || '/'

    const onSubmit = async (data: LoginRequest) => {
        const result = await dispatch(loginThunk(data))

        if (loginThunk.fulfilled.match(result)) {
            toast.success("Logged in successfully!")
            navigation(from, { replace: true })
            reset()
        } else if (loginThunk.rejected.match(result)) {
            toast.error(result.payload || "Invalid credentials")
            reset()
        }
    };

    return (
        // This wrapper centers the card horizontally and vertically
        <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="******"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col pt-6 gap-3">
                        <Button type="submit" disabled={loading} className="w-full bg-rose-500 hover:bg-rose-600">
                            {loading ? "loading..." : "Login"}
                        </Button>
                        <div className="text-center text-sm mt-2">
                            Don&apos;t have an account?
                            <Link to="/RegisterPage">
                                <Button variant="link" disabled={loading} className="p-1 h-auto text-rose-500">Login</Button>
                            </Link>

                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;