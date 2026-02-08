import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { createProjectThunk } from "@/Redux/Slice/projectslice";
import { useLocation, useNavigate } from "react-router";
interface frontendRequest {
    title: string;
    description: string;
    imageBase64: string;
    category: string;
    author: string;
}

const PostPage = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { loading } = useAppSelector((state) => state.project);
    const from = location.state?.from || '/'
    const [imagePreview, setImagePreview] = useState<string>('');
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<frontendRequest>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setImagePreview(base64);
            setValue('imageBase64', base64);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: frontendRequest) => {
        const result = await dispatch(createProjectThunk(data))
        if (createProjectThunk.fulfilled.match(result)) {
            reset()
            toast.success("Approved 👍")
            navigate(from, { replace: true })
            setImagePreview(``)
        } else if (createProjectThunk.rejected.match(result)) {
            reset()
            toast.error("Something went wrong 🥹")
            setImagePreview(``)
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Card className="w-full max-w-lg shadow-xl border-none">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-gray-900">Create New Post</CardTitle>
                    <CardDescription>
                        Showcase your latest graphic design masterpiece.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Title Input */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-semibold">Project Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Minimalist Branding Concept"
                                className="focus-visible:ring-rose-500"
                                {...register('title', { required: 'Title is required' })}
                            />
                            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="author" className="text-sm font-semibold">Author's Id *</Label>
                            <Input
                                id="title"
                                placeholder="Enter your author ID"
                                className="focus-visible:ring-rose-500"
                                {...register('author', { required: 'Title is required' })}
                            />
                            {errors.author && <p className="text-xs text-red-500">{errors.author.message}</p>}
                        </div>

                        {/* Category Dropdown */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-semibold">Category *</Label>
                            <select
                                {...register('category', { required: 'Select a category' })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select Category</option>
                                <option value="Logo Designs">Logo Designs</option>
                                <option value="Business Cards">Business Cards</option>
                                <option value="Book Designs">Book Designs</option>
                                <option value="Flyers">Flyers</option>
                                <option value="Packaging Designs">Packaging Designs</option>
                                <option value="Branding Identity">Branding Identity</option>
                                <option value="Social Media Designs">Social Media Designs</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                        </div>

                        {/* Description Textarea */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-semibold">Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your creative process..."
                                className="min-h-30 focus-visible:ring-rose-500"
                                {...register('description', { required: 'Description is required' })}
                            />
                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                        </div>

                        {/* Image Upload Area */}
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">Project Image *</Label>
                            <div className="flex flex-col items-center justify-center w-full">
                                <label className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all ${imagePreview ? 'border-rose-500' : 'border-gray-300 hover:border-rose-400 bg-gray-50'}`}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">Click to upload image</p>
                                        </div>
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            {errors.imageBase64 && <p className="text-xs text-red-500">Image is required</p>}
                        </div>

                        {/* Submit Buttons */}
                        <div className="pt-4 space-y-3">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-rose-100"
                            >
                                {loading ? "Posting..." : "Publish Post"}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full text-gray-500 hover:text-rose-500"
                                onClick={() => { reset(); setImagePreview(''); }}
                            >
                                Reset Form
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostPage;