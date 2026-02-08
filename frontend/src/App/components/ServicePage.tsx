import { Check, Sparkles, Crown, Zap } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useState } from "react"

const ServicePage = () => {
    const [selectedCategory, setSelectedCategory] = useState(0)

    const PriceVariant: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: i * 0.1,
                stiffness: 100,
                type: "spring"
            }

        }),
        exit: { opacity: 0, y: 50 }
    }

    const ButtonVariant: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: i * 0.1,
                stiffness: 100,
                type: "spring"
            }

        }),
        exit: { opacity: 0, y: 50 }
    }

    const CustomeVariant: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 100 } },
        exit: { opacity: 0, y: 50 }
    }
    const contactVariant: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 100 } },
        exit: { opacity: 0, y: 50 }
    }

    const pricing = [
        {
            category: "Logo Designs",
            description: "Professional logos and brand identity packages to make your business memorable",
            tiers: [
                {
                    name: "Starter",
                    price: "₦15,000",
                    icon: Zap,
                    color: "blue",
                    features: [
                        "2 initial logo concepts",
                        "2 revisions",
                        "High-resolution PNG files",
                        "Basic brand guidelines",
                        "3-5 day delivery"
                    ]
                },
                {
                    name: "Standard",
                    price: "₦35,000",
                    icon: Sparkles,
                    color: "purple",
                    popular: true,
                    features: [
                        "4 initial logo concepts",
                        "5 revisions",
                        "All file formats (PNG, JPG, SVG, AI)",
                        "Complete brand guidelines",
                        "Social media kit",
                        "2-3 day delivery",
                        "Source files included"
                    ]
                },
                {
                    name: "Premium",
                    price: "₦70,000",
                    icon: Crown,
                    color: "rose",
                    features: [
                        "6 initial logo concepts",
                        "Unlimited revisions",
                        "All file formats + vector files",
                        "Full brand identity package",
                        "Business card design",
                        "Letterhead design",
                        "Social media templates",
                        "24-hour priority delivery",
                        "Lifetime support"
                    ]
                }
            ]
        },
        {
            category: "Business Cards",
            description: "Stand out with custom business cards that leave a lasting impression",
            tiers: [
                {
                    name: "Starter",
                    price: "₦8,000",
                    icon: Zap,
                    color: "blue",
                    features: [
                        "Single-sided design",
                        "2 design concepts",
                        "2 revisions",
                        "Print-ready PDF",
                        "Standard size (3.5\" x 2\")",
                        "3-4 day delivery"
                    ]
                },
                {
                    name: "Standard",
                    price: "₦15,000",
                    icon: Sparkles,
                    color: "purple",
                    popular: true,
                    features: [
                        "Double-sided design",
                        "3 design concepts",
                        "4 revisions",
                        "Print-ready files (PDF, AI)",
                        "QR code integration",
                        "2 day delivery",
                        "Source files"
                    ]
                },
                {
                    name: "Premium",
                    price: "₦30,000",
                    icon: Crown,
                    color: "rose",
                    features: [
                        "Double-sided premium design",
                        "5 design concepts",
                        "Unlimited revisions",
                        "All file formats",
                        "Special finishes guidance",
                        "Multiple variations",
                        "24-hour delivery",
                        "Free print consultation"
                    ]
                }
            ]
        },
        {
            category: "Flyers",
            description: "Eye-catching flyers for events, promotions, and announcements",
            tiers: [
                {
                    name: "Starter",
                    price: "₦10,000",
                    icon: Zap,
                    color: "blue",
                    features: [
                        "Single page flyer",
                        "2 design concepts",
                        "2 revisions",
                        "A5 or A4 size",
                        "Print-ready PDF",
                        "3-4 day delivery"
                    ]
                },
                {
                    name: "Standard",
                    price: "₦20,000",
                    icon: Sparkles,
                    color: "purple",
                    popular: true,
                    features: [
                        "Single or double-sided",
                        "3 design concepts",
                        "5 revisions",
                        "Multiple sizes",
                        "Social media versions",
                        "All file formats",
                        "2 day delivery"
                    ]
                },
                {
                    name: "Premium",
                    price: "₦40,000",
                    icon: Crown,
                    color: "rose",
                    features: [
                        "Multi-page flyer/brochure",
                        "5 design concepts",
                        "Unlimited revisions",
                        "All sizes & formats",
                        "Digital & print versions",
                        "Animated social media version",
                        "24-hour delivery",
                        "Print vendor coordination"
                    ]
                }
            ]
        },
        {
            category: "Branding Identity",
            description: "Complete brand identity systems that tell your story consistently",
            tiers: [
                {
                    name: "Starter",
                    price: "₦50,000",
                    icon: Zap,
                    color: "blue",
                    features: [
                        "Logo design",
                        "Color palette (3 colors)",
                        "2 font selections",
                        "Basic brand guidelines (PDF)",
                        "Business card design",
                        "5-7 day delivery"
                    ]
                },
                {
                    name: "Standard",
                    price: "₦100,000",
                    icon: Sparkles,
                    color: "purple",
                    popular: true,
                    features: [
                        "Complete logo suite",
                        "Extended color palette",
                        "Typography system",
                        "Comprehensive brand guidelines",
                        "Business stationery set",
                        "Social media templates",
                        "Email signature",
                        "3-5 day delivery"
                    ]
                },
                {
                    name: "Premium",
                    price: "₦200,000",
                    icon: Crown,
                    color: "rose",
                    features: [
                        "Full brand identity system",
                        "Logo variations & applications",
                        "Complete color system",
                        "Custom iconography",
                        "Pattern/texture library",
                        "All marketing collateral",
                        "Website style guide",
                        "Brand workshop included",
                        "Priority support for 3 months"
                    ]
                }
            ]
        },
        {
            category: "Social Media Designs",
            description: "Scroll-stopping social media graphics that boost engagement",
            tiers: [
                {
                    name: "Starter",
                    price: "₦12,000",
                    icon: Zap,
                    color: "blue",
                    features: [
                        "5 custom posts",
                        "2 design concepts per post",
                        "Instagram & Facebook formats",
                        "Basic animations",
                        "2 revisions per design",
                        "3-4 day delivery"
                    ]
                },
                {
                    name: "Standard",
                    price: "₦30,000",
                    icon: Sparkles,
                    color: "purple",
                    popular: true,
                    features: [
                        "15 custom posts",
                        "Story templates (5)",
                        "All platform formats",
                        "Motion graphics",
                        "Content calendar template",
                        "Editable templates",
                        "2-3 day delivery"
                    ]
                },
                {
                    name: "Premium",
                    price: "₦60,000",
                    icon: Crown,
                    color: "rose",
                    features: [
                        "30 custom posts",
                        "Story templates (15)",
                        "Reels/TikTok templates",
                        "Advanced animations",
                        "Carousel designs",
                        "Content strategy guide",
                        "Monthly refresh",
                        "Priority 24-hour delivery"
                    ]
                }
            ]
        },
        {
            category: "Packaging Designs",
            description: "Product packaging that protects and promotes your brand",
            tiers: [
                {
                    name: "Starter",
                    price: "₦40,000",
                    icon: Zap,
                    color: "blue",
                    features: [
                        "Single packaging design",
                        "2 design concepts",
                        "Basic dieline/template",
                        "3 revisions",
                        "Print-ready files",
                        "5-7 day delivery"
                    ]
                },
                {
                    name: "Standard",
                    price: "₦80,000",
                    icon: Sparkles,
                    color: "purple",
                    popular: true,
                    features: [
                        "Complete packaging system",
                        "4 design concepts",
                        "Custom dieline creation",
                        "Multiple product variations",
                        "5 revisions",
                        "3D mockups",
                        "3-5 day delivery"
                    ]
                },
                {
                    name: "Premium",
                    price: "₦150,000",
                    icon: Crown,
                    color: "rose",
                    features: [
                        "Full product line packaging",
                        "Unlimited concepts",
                        "Structural design innovation",
                        "Multiple size variations",
                        "Unlimited revisions",
                        "Photorealistic 3D renders",
                        "Print production support",
                        "Material recommendations"
                    ]
                }
            ]
        },
        {
            category: "Book Designs",
            description: "Professional book covers and interior layouts that captivate readers",
            tiers: [
                {
                    name: "Starter",
                    price: "₦25,000",
                    icon: Zap,
                    color: "blue",
                    features: [
                        "Front cover design only",
                        "2 design concepts",
                        "3 revisions",
                        "eBook & print formats",
                        "Standard templates",
                        "5-7 day delivery"
                    ]
                },
                {
                    name: "Standard",
                    price: "₦50,000",
                    icon: Sparkles,
                    color: "purple",
                    popular: true,
                    features: [
                        "Full cover (front, back, spine)",
                        "3 design concepts",
                        "Basic interior layout",
                        "5 revisions",
                        "All formats (print, eBook, PDF)",
                        "3D mockup",
                        "3-5 day delivery"
                    ]
                },
                {
                    name: "Premium",
                    price: "₦100,000",
                    icon: Crown,
                    color: "rose",
                    features: [
                        "Complete book design package",
                        "5 cover concepts",
                        "Full interior layout & formatting",
                        "Chapter headers & illustrations",
                        "Unlimited revisions",
                        "Multiple format optimization",
                        "Print-ready files",
                        "Publishing platform setup support"
                    ]
                }
            ]
        },
        {
            category: "Others",
            description: "Custom design solutions for unique projects and special requirements",
            tiers: [
                {
                    name: "Starter",
                    price: "₦20,000",
                    icon: Zap,
                    color: "blue",
                    features: [
                        "Simple custom design",
                        "2 concepts",
                        "3 revisions",
                        "Basic file formats",
                        "Consultation included",
                        "5-7 day delivery"
                    ]
                },
                {
                    name: "Standard",
                    price: "₦50,000",
                    icon: Sparkles,
                    color: "purple",
                    popular: true,
                    features: [
                        "Medium complexity project",
                        "4 concepts",
                        "5 revisions",
                        "All necessary formats",
                        "Strategy consultation",
                        "3-5 day delivery",
                        "Source files included"
                    ]
                },
                {
                    name: "Premium",
                    price: "Custom Quote",
                    icon: Crown,
                    color: "rose",
                    features: [
                        "Complex/large-scale project",
                        "Unlimited concepts",
                        "Unlimited revisions",
                        "Full creative direction",
                        "Dedicated project manager",
                        "Priority delivery",
                        "Ongoing support",
                        "Custom terms negotiable"
                    ]
                }
            ]
        }
    ]

    const getTierColorClasses = (color: string, isPrimary: boolean = false) => {
        const colors = {
            blue: isPrimary
                ? "bg-blue-500 text-white"
                : "text-blue-600 bg-blue-50 border-blue-200",
            purple: isPrimary
                ? "bg-purple-500 text-white"
                : "text-purple-600 bg-purple-50 border-purple-200",
            rose: isPrimary
                ? "bg-rose-400 text-white"
                : "text-rose-600 bg-rose-50 border-rose-200"
        }
        return colors[color as keyof typeof colors] || colors.blue
    }

    return (
        <section id="services" className="py-20 px-6 mx-auto min-h-screen">
            {/* Header */}
            <motion.div
                variants={CustomeVariant}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                
                viewport={{ once: false, margin: "-50px" }}
                className="text-center mb-16">
                <h1  className="text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">
                    Our Services
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Professional design solutions tailored to your needs and budget
                </p>
                <div className="h-1.5 w-24 bg-rose-400 mx-auto mt-6 rounded-full"></div>
            </motion.div>

            {/* Category Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
                {pricing.map((service, index) => (
                    <motion.button
                        key={index}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        variants={ButtonVariant}
                        viewport={{ once: false, margin: "-50px" }}
                        onClick={() => setSelectedCategory(index)}
                        className={`px-3 py-1 rounded-full font-bold text-sm transition-all duration-300 uppercase tracking-wider border-2 ${selectedCategory === index
                            ? "bg-rose-400 text-white border-rose-400 shadow-xl scale-105"
                            : " text-gray-600 border-gray-200 hover:border-rose-300 hover:text-rose-400"
                            }`}
                    >
                        {service.category}
                    </motion.button>
                ))}
            </div>

            {/* Selected Category Info */}
            <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {pricing[selectedCategory].category}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    {pricing[selectedCategory].description}
                </p>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div
                key={`pricing-${selectedCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
                {pricing[selectedCategory].tiers.map((tier, index) => {
                    const Icon = tier.icon
                    return (
                        <motion.div
                            key={`${selectedCategory}-${index}`}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            variants={PriceVariant}
                            viewport={{ once: false, margin: "-50px" }}

                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${tier.popular
                                ? "border-purple-500 scale-105"
                                : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-2xl ${getTierColorClasses(tier.color, true)} flex items-center justify-center mb-6`}>
                                <Icon className="w-8 h-8" />
                            </div>

                            {/* Tier Name */}
                            <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                                {tier.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-black text-gray-900">
                                    {tier.price}
                                </span>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <div className={`rounded-full p-1 mt-0.5 ${getTierColorClasses(tier.color)}`}>
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className="text-gray-700 text-sm leading-relaxed">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${tier.popular
                                ? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl"
                                : getTierColorClasses(tier.color, true) + " hover:shadow-lg"
                                }`}>
                                Get Started
                            </button>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Contact CTA */}
            <motion.div
                variants={contactVariant}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, margin: "-50px" }}
                className="mt-20 text-center bg-gradient-to-r from-rose-400 to-purple-600 rounded-3xl p-12 text-white">
                <h3 className="text-3xl font-black mb-4 uppercase">
                    Need a Custom Solution?
                </h3>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                    Have a unique project in mind? Let's discuss a custom package tailored specifically to your needs.
                </p>
                <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Contact Us
                </button>
            </motion.div>
        </section>
    )
}

export default ServicePage