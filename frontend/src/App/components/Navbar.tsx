
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "@/Redux/Hook";
import { logoutThunk } from "@/Redux/Slice/authslice";


const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState(false)
    const { user, isAdmin, isAuthenticated } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    function handleScroll() {
        if (window.scrollY > 300) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = async () => {
        await dispatch(logoutThunk());
        // After logout is done, navigate
    }

    return (
        <nav className={`w-full z-50 sm:px-6 max-w-7xl md:px-20 mx-auto -mt-10 transition-all  duration-300 ${scroll
            ? "fixed top-0 left-0 bg-white/80 backdrop-blur-md shadow-md mt-0 py-4"
            : "relative bg-white py-4 "
            }`}>
            <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>

                {/* Logo */}
                <Link to='/' className='flex gap-2 items-center'>
                    <img src={"/logo.webp"} className='w-10 h-10 rounded-full shadow-lg' alt="Logo" />
                    <h1 className="text-2xl font-bold">
                        Eden
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-8 font-medium text-gray-600'>
                    <Link to="/" className='text-rose-400'>Home</Link>
                    <a href="#services" className='hover:text-rose-400'>Service</a>
                    <a href="#about" className='hover:text-rose-400'>About</a>
                    <a href="#contact" className='hover:text-rose-400'>Contact</a>
                </div>
                <div>
                    <div>
                        {user && isAuthenticated ? (
                            <div className='hidden md:flex items-center gap-2'>

                                {user && isAdmin && isAuthenticated ? (
                                    <button>
                                        <p className="text-rose-400 font-bold">welcome admin 👋 {user.username}</p>
                                        <Link to='/PostPage'>
                                          create post
                                        </Link>
                                      
                                    </button>
                                ) : (
                                    <p className="text-rose-400 font-bold">Hello 👋 {user.username}</p>
                                )}
                                <Link to='/' >
                                    <button
                                        className="px-6 py-2 bg-rose-400 text-white rounded-full hover:bg-rose-300 transition-all shadow-md"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </Link>
                            </div>

                        ) : (
                            <div className='md:flex hidden items-center gap-2 ml-4'>
                                <Link to="/LoginPage">
                                    <button className='px-4 py-2 hover:text-rose-400 transition-colors'>
                                        Login
                                    </button>
                                </Link>
                                <Link to='/RegisterPage'>
                                    <button className='px-6 py-2 bg-rose-400 text-white rounded-full hover:bg-rose-300 transition-all shadow-md'>
                                        Register
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>

                {/* Mobile Toggle Button */}
                <div
                    className='md:hidden text-3xl cursor-pointer text-gray-700'
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? "×" : "≡"}
                </div>

                {/* Mobile Sidebar Menu */}
                <div
                    className={`fixed top-0 right-0 h-screen w-[75%] bg-white shadow-2xl flex flex-col p-10 gap-8 font-semibold text-lg transition-transform duration-300 ease-in-out md:hidden ${open ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="text-3xl self-end cursor-pointer" onClick={() => setOpen(false)}>×</div>

                    <Link to="/" className='text-rose-400' onClick={() => setOpen(false)}>Home</Link>
                    <a href="services" className='hover:text-rose-400'  onClick={() => setOpen(false)}>Service</a>
                    <a href="#about" className='hover:text-rose-400'  onClick={() => setOpen(false)}>About</a>
                    <a href="#contact" className='hover:text-rose-400'  onClick={() => setOpen(false)}>Contact Us</a>

                    {user ? (
                        <div className='flex flex-col gap-4 md:hidden items-center'>
                          {user && isAdmin && isAuthenticated ? (
                                    <button>
                                        <p className="text-rose-400 font-bold">welcome admin👋 
                                            
                                            </p> <p>{user.username}</p>
                                        <Link to='/PostPage'>
                                          create post
                                        </Link>
                                      
                                    </button>
                                ) : (
                                    <p className="text-rose-400 font-bold">Hello 👋 {user.username}</p>
                                )}

                            <Link to='/'>
                                <button
                                    className="px-6 py-2 bg-rose-400 text-white rounded-full hover:bg-rose-300 transition-all shadow-md"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button></Link>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4 mt-auto'>
                            <Link to="/" onClick={() => setOpen(false)}>

                                <button className='w-full flex items-center ps-4 gap-10 py-3 hover:text-rose-400 border border-rose-200 rounded-xl'><FaArrowRightFromBracket />Login</button>
                            </Link>
                            <Link to='/RegisterPage' onClick={() => setOpen(false)}>
                                <button className='w-full py-3 bg-rose-400 hover:bg-rose-300 text-white rounded-xl'>Register</button>
                            </Link>
                        </div>
                    )
                    }

                </div >
            </div >
        </nav >
    )
}

export default Navbar