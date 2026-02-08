import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Feather, Layout, Target } from "lucide-react";
import Slider from "react-slick";
import { motion, type Variants } from "framer-motion";

const AboutPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 8000,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const skills = [
        { icon: <Palette className="w-6 h-6 text-rose-500" />, title: "Branding", desc: "Crafting unique identities that tell a story." },
        { icon: <Feather className="w-6 h-6 text-rose-500" />, title: "Illustration", desc: "Adding a hand-drawn touch to digital spaces." },
        { icon: <Layout className="w-6 h-6 text-rose-500" />, title: "Graphic Design", desc: "Creating layouts that are beautiful and functional." },
        { icon: <Target className="w-6 h-6 text-rose-500" />, title: "Strategy", desc: "Designing with a focus on your business goals." },
    ];

    const Quotes = [
        { writer: "John Ruskin", quote: "The purest and most thoughtful minds are those which love color the most." },
        { writer: "Coco Chanel", quote: "The best color in the world is the one that looks good on YOU." },
        { writer: "Steve Jobs", quote: "Design is not just what it looks like and feels like. Design is how it works." },
        { writer: "Lindon Leader", quote: "Color in a logo is like perfume on a woman — when it's good, it's delightful." },
        { writer: "Saul Bass", quote: "Design is thinking made visual." },
        { writer: "Wassily Kandinsky", quote: "Color is a power which directly influences the soul." },
        { writer: "Terence Conran", quote: "Color is the skin of a design" },
        { writer: "Robert Henri", quote: "Color is only beautiful when it means something." }
    ];



    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 100 } },
        exit: { opacity: 0, y: 100, transition: { duration: 0.6 } }
    }

    const skillVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: i * 0.1,
                type: "spring",
                stiffness: 100
            }
        }),
        exit: {
            opacity: 0,
            y: 30,
            transition: { duration: 0.4 }
        }
    };

    const statVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: i * 0.15,
                type: "spring",
                stiffness: 100
            }
        }),
        exit: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div id="about" className="max-w-6xl mx-auto px-6">
            {/* Skills Grid */}
            <motion.div
                className="space-y-12 my-30"
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="text-center md:mb-30">
                    <motion.h2

                        className="text-3xl font-bold mb-1">What I Do Best</motion.h2>
                    <div className="h-1 w-20 bg-rose-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={skillVariants}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: false, margin: "-50px" }}
                        >
                            <Card className="border-none bg-rose-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 h-full">
                                <CardContent className="pt-8 pb-6 text-center space-y-4">
                                    <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm">
                                        {skill.icon}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800">{skill.title}</h3>
                                    <p className="text-sm text-gray-600">{skill.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* About Section */}
            <motion.div
                className="mb-24"
                initial="hidden"
                whileInView="visible"
                exit="exit"
                variants={containerVariants}
                viewport={{ once: false, margin: "-100px" }}
            >
                <div className="space-y-6 backdrop-blur-md bg-white/50 p-6 md:p-10 rounded-2xl text-center">
                    <motion.h1
                        className="font-bold text-4xl md:text-5xl text-gray-900"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false }}
                    >
                        About Me
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: false }}
                    >
                        I'm Precious Ilebeya, a Nigeria-based Graphic Designer. I believe every brand has a soul,
                        and my job is to make that soul visible through thoughtful design and vibrant colors.
                    </motion.p>
                    <motion.p
                        className="text-gray-600  text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        With 3+ years of experience, I've helped startups and established brands
                        find their voice in a crowded digital world.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: false }}
                    >
                        <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 text-lg rounded-full shadow-rose-200 shadow-xl transition-all mx-auto">
                            View My CV
                        </Button>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: false, margin: "-100px" }}
                        className="my-20"
                    >
                        <div className="grid md:grid-cols-4 gap-6 sm:grid-cols-2">
                            {[
                                { value: "100%", label: "Build Projects", from: "purple-500", to: "rose-500" },
                                { value: "97%", label: "Design Quality", from: "pink-500", to: "violet-500" },
                                { value: "4yrs", label: "Years of Experience", from: "purple-500", to: "yellow-500" },
                                { value: "100%", label: "Work Credibility", from: "pink-500", to: "blue-500" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    variants={statVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: false, margin: "-50px" }}
                                    className="shadow-2xl hover:bg-white/90 p-10 rounded-lg transition-colors"
                                >
                                    <p className={`bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text font-extrabold text-transparent md:text-3xl text-2xl`}>
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-600 mt-2">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Quote Section */}
            <motion.div
                className="text-center my-20"
                initial="hidden"
                whileInView="visible"
                exit="exit"
                variants={containerVariants}
                viewport={{ once: false, margin: "-100px" }}
            >
                <h2 className="text-3xl font-bold">Inspiration</h2>
                <p className="text-gray-700 mt-2">Words that fuel my creativity</p>
            </motion.div>

            <motion.div
                className="pb-22"
                initial="hidden"
                whileInView="visible"
                exit="exit"
                variants={containerVariants}
                viewport={{ once: false, margin: "-100px" }}
            >
                <Slider {...settings}>
                    {Quotes.map((item, index) => (
                        <div key={index} className="px-3">
                            <div className="h-64 flex flex-col justify-center p-8 bg-gray-900 rounded-[2rem] text-center text-white">
                                <h2 className="text-lg md:text-xl font-medium italic leading-snug">
                                    "{item.quote}"
                                </h2>
                                <p className="mt-6 text-rose-400 text-xs font-semibold tracking-widest uppercase">
                                    — {item.writer} —
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </motion.div>
        </div>
    );
};

export default AboutPage;