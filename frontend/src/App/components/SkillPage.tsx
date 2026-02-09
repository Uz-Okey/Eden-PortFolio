import { SiCoreldraw, SiAdobephotoshop, SiCanva, SiAdobeillustrator } from "react-icons/si";
import { FaPinterest } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import { motion, type Variants } from "framer-motion";

const SkillsPage = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                type: "spring",
                stiffness: 100
            }
        },
        exit: { opacity: 0, y: 50 }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 70,
                duration: 0.8
            }
        }),
        exit: { opacity: 0, y: 50 }
    };

    const tools = [
        { name: "Photoshop", role: "Image Manipulation", icon: <SiAdobephotoshop />, color: "text-blue-500 md:text-transparent md:group-hover:text-blue-500", bg: "bg-blue-50 md:bg-transparent md:group-hover:bg-blue-50" },
        { name: "CorelDraw", role: "Vector Graphics", icon: <SiCoreldraw />, color: "text-green-600 md:text-transparent md:group-hover:text-green-600", bg: "bg-green-50 md:bg-transparent md:group-hover:bg-green-50" },
        { name: "Canva", role: "Social Media Design", icon: <SiCanva />, color: "text-cyan-400 md:text-transparent md:group-hover:text-cyan-400", bg: "bg-cyan-50 md:bg-transparent md:group-hover:bg-cyan-50" },
        { name: "Pinterest", role: "Creative Research", icon: <FaPinterest />, color: "text-red-600 md:text-transparent md:group-hover:text-red-600", bg: "bg-red-50 md:bg-transparent md:group-hover:bg-red-50" },
        { name: "Illustrator", role: "Logo & Illustration", icon: <SiAdobeillustrator />, color: "text-orange-500 md:text-transparent md:group-hover:text-orange-500", bg: "bg-orange-50 md:bg-transparent md:group-hover:bg-orange-50" },
        { name: "Gemini AI", role: "AI Assisted Design", icon: <RiGeminiFill />, color: "text-purple-500 md:text-transparent md:group-hover:text-purple-500", bg: "bg-purple-50 md:bg-transparent md:group-hover:bg-purple-50" }
    ];

    return (
        <section className="py-24 px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px" }}
                    variants={containerVariants}
                    exit="exit"
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Technical Stack</h2>
                    <p className="text-slate-500 text-lg">Premium tools for premium results.</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {tools.map((tool, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="relative overflow-hidden bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col items-center group cursor-default"
                        >
                            {/* Background */}
                            <div className={`absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${tool.bg}`} />

                            <div className="relative z-10 flex flex-col items-center">
                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    className={`text-6xl mb-6 transition-all duration-500 ${tool.color} grayscale md:grayscale-100 md:group-hover:grayscale-0`}
                                >
                                    {tool.icon}
                                </motion.div>

                                <h3 className="font-bold text-slate-900 text-xl mb-1">{tool.name}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">{tool.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsPage;
