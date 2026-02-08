import { useAppDispatch, useAppSelector } from "@/Redux/Hook"
import { createFavThunk, deleteProjectThunk, getAllProjectsThunk } from "@/Redux/Slice/projectslice"
import { motion, type Variants, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Eye, Heart, User, Inbox, X } from "lucide-react"
import { CiTrash } from "react-icons/ci";
import EditButton from "./EditButton"


// Define the Project type
type Project = {
    _id: string
    image: string
    title: string
    description: string
    category: string
    author: {
        username: string
    }
    meta: {
        favs: number
        views: number
    }
}



const Project = () => {
    const { projects, loading, error } = useAppSelector((state) => state.project)
    const dispatch = useAppDispatch()
    const { user, isAdmin, isAuthenticated } = useAppSelector((state) => state.auth)
    const [activeCategory, setActiveCategory] = useState<string>("All")
    const [selectedProject, setSelectedProject] = useState<Project | null>(null) // Fixed type
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

    // Animations: Each card triggers independently as it enters view
    const projectVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    }

     function handleFav(id: string) {  
         dispatch(createFavThunk(id))
      
    }


    // Modal animation
    const modalVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    }

    const modalContentVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            transition: { duration: 0.2 }
        }
    }

    const Categories = [
        { name: "All", value: "All" },
        { name: "Logo Designs", value: "Logo Designs" },
        { name: "Branding Identity", value: "Branding Identity" },
        { name: "Flyers", value: "Flyers" },
        { name: "Business Cards", value: "Business Cards" },
        { name: "Social Media Designs", value: "Social Media Designs" },
        { name: "Packaging Designs", value: "Packaging Designs" },
        { name: "Book Designs", value: "Book Designs" },
        { name: "Others", value: "Others" },
    ]

    useEffect(() => {
        dispatch(getAllProjectsThunk())
    }, [dispatch])

    // Filter Logic
    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory)

    if (loading) return (
        <div className="flex justify-center items-center min-h-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-rose-500"></div>
        </div>
    )

    if (error) return (
        <div className="text-center text-red-500 py-20 bg-red-50 rounded-2xl mx-6">
            <p className="font-bold text-lg">Oops! Something went wrong.</p>
            <p className="text-sm">{error}</p>
        </div>
    )

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">Portfolio Work</h2>
                <div className="h-1.5 w-24 bg-rose-500 mx-auto rounded-full"></div>
            </div>

            {/* Category Filter Bar */}
            <div className="flex flex-wrap justify-center overflow-hidden gap-3 mb-16 overflow-x-auto scrollbar-hide">
                {Categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(cat.value)}
                        className={`px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap border uppercase tracking-widest
                        ${activeCategory === cat.value
                                ? "bg-rose-500 text-white border-rose-500 shadow-xl shadow-rose-200 scale-105"
                                : " text-gray-500 border-gray-100 hover:border-rose-300 hover:text-rose-500"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((items) => (
                            <motion.div
                                key={items._id}
                                layout
                                variants={projectVariants}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, margin: "-50px" }}
                                className="group relative bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                {/* Image & Hover Overlay */}
                                <div
                                    className="relative overflow-hidden cursor-pointer"
                                  // Click on image
                                >
                                    <img
                                        src={items.image}
                                        alt={items.title}
                                        className="w-full h-full max-h-60 max-w-100 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <div className="flex items-center gap-6 text-white text-sm font-bold">
                                            <span className="flex items-center gap-2">
                                                <Heart onClick={()=>handleFav(items._id)} className="w-5 h-5 text-rose-500 fill-rose-500" /> {items.meta.favs}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Eye className="w-5 h-5" /> {items.meta.views}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-4 space-y-4">
                                    <span className="px-2 py-1 bg-rose-50 text-rose-600 text-[10px] font-black rounded-sm uppercase tracking-tighter">
                                        {items.category}
                                    </span>
                                    <h3 className="text-[18px] font-bold text-gray-800 group-hover:text-rose-500 transition-colors leading-tight">
                                        {items.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                        {items.description}
                                    </p>

                                    {/* //Delete button */}
                                    {/*Edit Button*/}
                                    {isAdmin && isAuthenticated && user?._id === items.author._id && (<div><button onClick={() => setConfirmDelete(items._id)} className="hover:text-rose-400"><CiTrash /></button>
                                        <EditButton projectId={items._id} />
                                    </div>)}


                                    {confirmDelete === items._id && (
                                        <div>
                                            <p>Are you sure?</p>

                                            <button
                                                onClick={() => setConfirmDelete(null)}
                                                className="px-4 py-1 hover:bg-gray-300"
                                            >
                                                X
                                            </button>
                                            <button onClick={async () => {
                                                await dispatch(deleteProjectThunk(items._id))
                                                setConfirmDelete(null)
                                            }} className="hover:bg-rose-400 px-4 py-2">
                                                <CiTrash />
                                            </button>
                                        </div>
                                    )}

                                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-400 text-xs italic">
                                            <User className="w-4 h-4" />
                                            <span>{items.author.username}</span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(items)} // Click on button
                                            className="text-[11px] font-black text-gray-900 underline underline-offset-8 hover:text-rose-500 transition-colors tracking-widest uppercase"
                                        >
                                            View Project
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400"
                        >
                            <Inbox className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-xl font-medium">No projects in this category yet.</p>
                            <button
                                onClick={() => setActiveCategory("All")}
                                className="mt-4 text-rose-500 font-bold underline"
                            >
                                View all work
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {selectedProject && ( // Fixed condition
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)} // Close on background click
                    >
                        <motion.div
                            variants={modalContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg group"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Full Image */}
                            <div className="relative w-full bg-gray-100">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-auto max-h-[70vh] object-contain"
                                />
                            </div>

                            {/* Project Details */}
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <span className="inline-block px-4 py-2 bg-rose-50 text-rose-600 text-xs font-black rounded-full uppercase tracking-wider">
                                        {selectedProject.category}
                                    </span>
                                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                {/* Meta Information */}
                                <div className="flex items-center gap-8 pt-6 border-t border-gray-200">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <span className="font-semibold">{selectedProject.author.username}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span onClick={()=>handleFav(selectedProject._id)} className="flex items-center cursor-pointer gap-2 text-gray-600">
                                            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                                            <span  className="font-bold cursor-pointer">{selectedProject.meta.favs}</span>
                                        </span>
                                        <span className="flex items-center gap-2 text-gray-600">
                                            <Eye className="w-5 h-5 text-gray-500" />
                                            <span className="font-bold">{selectedProject.meta.views}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Project