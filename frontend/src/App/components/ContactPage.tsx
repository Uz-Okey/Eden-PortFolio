
import { fetchEmailPost } from "@/Redux/api/projectApiService";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react";
import { useForm } from 'react-hook-form';
interface contactFrontendResquest {
    name: string;
    message: string;
    contact: string;
    email: string;
}

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<contactFrontendResquest>();

const [isLoading, setIsLoading] = useState(false)
    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            detail: "chikaugwu0121@gmail.com",
            bgColor: "bg-rose-50",
            iconColor: "text-rose-400"
        },
        {
            icon: Phone,
            title: "Phone",
            detail: "(+234) 9016126060",
            bgColor: "bg-rose-50",
            iconColor: "text-rose-400"
        },
        {
            icon: MapPin,
            title: "Location",
            detail: "Lagos, Nigeria",
            bgColor: "bg-rose-50",
            iconColor: "text-rose-400"
        },
        {
            icon: Clock,
            title: "Response Time",
            detail: "Within 24 hours",
            bgColor: "bg-rose-50",
            iconColor: "text-rose-400"
        }
    ]


    async function onsubmit(data: contactFrontendResquest) {
        setIsLoading(true);
        try {
            await fetchEmailPost(data);
            reset();
            alert("successfully sent");
        } catch (error) {
            alert("not successful");
            console.error('unable to send email', error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
            {/* Status Badge */}
            <div className="flex items-center gap-3 mb-8">
                <span className="bg-rose-400 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    Currently Available
                </span>
                <span className="text-gray-500 text-sm">Accepting new projects</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left Section - Contact Info */}
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-gray-600  leading-relaxed mb-12">
                        I'm always excited to work on new creative projects. Whether you need a complete
                        brand identity, stunning marketing materials, or just want to discuss your ideas, I'm
                        here to help bring your vision to life.
                    </p>

                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        {contactInfo.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                                >
                                    <div className={`${item.bgColor} p-4 rounded-xl`}>
                                        <Icon className={`w-6 h-6 hover:rotate-180 hover:scale-105 duration-500 transition-all ${item.iconColor}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {item.detail}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Right Section - Contact Form */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h2 className="text-3xl font-black text-gray-900 mb-8">
                        Send a Message
                    </h2>


                    <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                        {/* Name and Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-50 outline-none transition-all"
                                    {...register('name', { required: true })} />
                                {errors.name && <p>Last name is required.</p>}

                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="email"

                                    placeholder="Your name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-50 outline-none transition-all"
                                    {...register('email', { required: true })} />
                                {errors.email && <p>email is required.</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Contact <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"

                                placeholder="Your Contact"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-50 outline-none transition-all"
                                {...register('contact', { required: true })} />
                            {errors.contact && <p>contact is required.</p>}
                        </div>
                        {/* Message */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Message <span className="text-red-500">*</span>
                            </label>

                            <textarea

                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-50 outline-none transition-all resize-none"
                                placeholder="Tell me about your project..."
                                required
                                rows={6}
                                {...register('message', { required: true })} />
                            {errors.message && <p>message is required.</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-rose-400 text-white py-4 rounded-lg font-bold text-lg hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                        >
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            {isLoading ? "Sending..." : "Send Message"}
                        </button>

                        {/* Privacy Text */}
                        <p className="text-xs text-gray-500 text-center">
                            By sending this message, you agree to my terms of service and privacy policy.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactPage