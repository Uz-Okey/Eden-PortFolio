import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { registerThunk } from "@/Redux/Slice/authslice";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"
interface registerRequest {
    email: string;
    password: string;
    username: string;
}
const RegisterPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<registerRequest>();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigation = useNavigate();
    const { loading } = useAppSelector((state) => state.auth)


    const from = location.state?.from || '/';



    const onSubmit = async(data: registerRequest) => {
        const result = await dispatch(registerThunk(data))
        if (registerThunk.fulfilled.match(result)) {
            navigation(from, { replace: true })
            toast.success("Registered Successfully.")
            reset()
        } else if (registerThunk.rejected.match(result)) {
            toast.error(result.payload || "error try registering again")
            reset()
        }
    };

    if (loading) {
        return (
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-62.5" />
                    <Skeleton className="h-4 w-62.5" />
                </div>
            </div>
        )
    }

   

    return (
        // This wrapper centers the card horizontally and vertically
        <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Register</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details below to Register your account
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="username"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
                        </div>
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
                                placeholder="*****"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col pt-6 gap-3">
                        <Button type="submit" disabled={loading} className="w-full bg-rose-500 hover:bg-rose-600">
                            {loading ? "Loading..." : "Register"}
                        </Button>
                        <div className="text-center text-sm mt-2">
                            Aleady have an account?
                            <Link to="/LoginPage">
                                <Button variant="link" className="p-1 h-auto text-rose-500">Login</Button>
                            </Link>

                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;