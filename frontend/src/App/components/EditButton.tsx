import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { UploadCloud } from "lucide-react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/Redux/Hook"
import { updateProjectThunk } from "@/Redux/Slice/projectslice"
import { FaEdit } from "react-icons/fa"

interface updateRequest {
    title: string
    description: string
    imageBase64?: string  // ✅ Made optional since image is optional on edit
    category: string
}

interface EditButtonProps {
    projectId: string
}

const EditButton = ({ projectId }: EditButtonProps) => {
    const dispatch = useAppDispatch()
    const { loading, projects } = useAppSelector((state) => state.project)  // ✅ Removed unused variables
    const [imagePreview, setImagePreview] = useState<string>('')
    const [editButton, setEditButton] = useState(true)
    
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<updateRequest>()

    // ✅ Fixed: Pass both id and data
    async function handleEdit(data: updateRequest) {
        try {
            // ✅ Only include imageBase64 if a new image was uploaded
            const updateData: updateRequest = {
                title: data.title,
                description: data.description,
                category: data.category,
            }
            
            // Only add imageBase64 if user uploaded a new image
            if (imagePreview) {
                updateData.imageBase64 = data.imageBase64
            }

            await dispatch(updateProjectThunk({
                id: projectId,
                data: updateData
            })).unwrap()
            
            setEditButton(true)
            reset()
            setImagePreview('')
            alert("Project updated successfully!")
        } catch (error) {
            console.error("Update failed:", error)
            alert("Failed to update project")
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const base64 = reader.result as string
            setImagePreview(base64)
            setValue('imageBase64', base64)
        }
        reader.readAsDataURL(file)
    }

    function openEditForm() {
        setEditButton(false)
    }

    function closeEditForm(e: React.MouseEvent) {
        e.stopPropagation()
        setEditButton(true)
        reset()
        setImagePreview('')
    }

    // ✅ Find the specific project to edit
    const project = projects.find(p => p._id === projectId)

    if (!project) return null

    return (
        <div>
            {editButton ? (
                <div 
                    onClick={openEditForm} 
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded transition"
                    title="Edit project"
                >
                    <FaEdit className="w-4 h-4 text-gray-600 hover:text-rose-500" />
                </div>
            ) : (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeEditForm}
                >
                    <div 
                        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
                        
                        <form onSubmit={handleSubmit(handleEdit)} className="space-y-6">
                            {/* Title Input */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-semibold">
                                    Project Title *
                                </Label>
                                <Input
                                    id="title"
                                    defaultValue={project.title}
                                    placeholder="e.g. Minimalist Branding Concept"
                                    className="focus-visible:ring-rose-500"
                                    {...register('title', { required: 'Title is required' })}
                                />
                                {errors.title && (
                                    <p className="text-xs text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Category Dropdown */}
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-semibold">
                                    Category *
                                </Label>
                                <select
                                    defaultValue={project.category}
                                    {...register('category', { required: 'Select a category' })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
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
                                {errors.category && (
                                    <p className="text-xs text-red-500">{errors.category.message}</p>
                                )}
                            </div>

                            {/* Description Textarea */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-semibold">
                                    Description *
                                </Label>
                                <Textarea
                                    id="description"
                                    defaultValue={project.description}
                                    placeholder="Describe your creative process..."
                                    className="min-h-30 focus-visible:ring-rose-500"
                                    {...register('description', { required: 'Description is required' })}
                                />
                                {errors.description && (
                                    <p className="text-xs text-red-500">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Image Upload Area */}
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">
                                    Project Image (optional - leave blank to keep current)
                                </Label>
                                <div className="flex flex-col items-center justify-center w-full">
                                    <label 
                                        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all overflow-hidden ${
                                            imagePreview 
                                                ? 'border-rose-500' 
                                                : 'border-gray-300 hover:border-rose-400 bg-gray-50'
                                        }`}
                                    >
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover rounded-lg" 
                                            />
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <img 
                                                    src={project.image} 
                                                    alt="Current" 
                                                    className="w-full h-full object-cover rounded-lg opacity-30" 
                                                />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-600 font-medium">
                                                        Click to change image
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        or keep current image
                                                    </p>
                                                </div>
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
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Updating..." : "Update Project"}
                                </button>
                                <button 
                                    type="button"
                                    onClick={closeEditForm} 
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditButton