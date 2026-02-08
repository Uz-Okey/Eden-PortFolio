import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useAppDispatch } from "../../Redux/Hook";
import { currentProfileThunk } from "../../Redux/Slice/authslice";

const MainLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Check authentication status on app load/refresh
        dispatch(currentProfileThunk());
    }, [dispatch]);
    const balls = [
        { size: "w-4 h-4", pos: "top-10 left-10", color: "from-pink-200 to-rose-300", anim: "animate-bounce" },
        { size: "w-10 h-10", pos: "top-10 left-30", color: "from-pink-200 to-rose-300", anim: "animate-bounce" },
        { size: "w-7 h-7", pos: "top-20 left-100", color: "from-pink-200 to-rose-300", anim: "animate-bounce" },
        { size: "w-12 h-12", pos: "top-1/4 right-20", color: "from-fuchsia-300 to-purple-400", anim: "float-xy" },
        { size: "w-8 h-8", pos: "top-1/2 left-1/3", color: "from-pink-400 to-fuchsia-500", anim: "animate-pulse opacity-50" },
        { size: "w-20 h-20", pos: "bottom-10 right-1/4", color: "from-rose-500 to-pink-300", anim: "animate-pulse opacity-50" },
        { size: "w-6 h-6", pos: "top-20 right-1/3", color: "from-lavender-200 to-violet-900", anim: "animate-bounce" },
        { size: "w-16 h-16", pos: "bottom-20 left-10", color: "from-pink-300 to-indigo-500", anim: "spin-slow" },
        { size: "w-5 h-5", pos: "top-5 right-5", color: "from-rose-400 to-pink-500", anim: "animate-bounce" },
        { size: "w-10 h-10", pos: "bottom-1/3 right-10", color: "from-purple-200 to-fuchsia-300", anim: "animate-bounce" },
        { size: "w-3 h-3", pos: "top-1/3 left-5", color: "from-pink-100 to-rose-200", anim: "animate-bounce" },
        { size: "w-24 h-24", pos: "top-40 left-1/2", color: "to-fuchsia-400 from-pink-900", anim: "animate-pulse opacity-50" },
        { size: "w-7 h-7", pos: "bottom-5 right-1/2", color: "from-rose-300 to-orange-200", anim: "animate-pulse opacity-50" },
        { size: "w-14 h-14", pos: "top-3/4 left-1/4", color: "from-orange-300 to-fuchsia-400", anim: "animate-bounce" },
        { size: "w-9 h-9", pos: "bottom-1/4 right-1/3", color: "from-pink-200 to-orange-400", anim: "animate-bounce" },
        { size: "w-4 h-4", pos: "top-2/3 right-5", color: "from-rose-100 to-pink-400", anim: "animate-bounce" },
        { size: "w-5 h-5", pos: "bottom-10 left-1/3", color: "from-fuchsia-200 to-rose-200", anim: "animate-bounce" },
    ];

    return (
        <div className="relative w-full min-h-screen bg-[#f8f3ee68] overflow-x-hidden">
            <div className="my-10">
               
            </div>

            {/* Fixed background balls */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {balls.map((ball, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full shadow-lg mix-blend-multiply filter opacity-80 duration-700 ease-in-out transform-gpu bg-linear-to-br ${ball.size} ${ball.pos} ${ball.color} ${ball.anim}`}
                    />
                ))}
            </div>

            {/* Page content */}
            <div className="relative z-10">
                 <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;