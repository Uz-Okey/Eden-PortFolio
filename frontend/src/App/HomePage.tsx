import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import Project from "./components/Project";
import ServicePage from "./components/ServicePage";
import SkillsPage from "./components/SkillPage";
import { StickyFooter } from "./components/sticky-footer";


const HomePage = () => {
  return (
    <div className="px-6 overflow-hidden sm:px-16 md:px-24 mt-16 max-w-7xl mx-auto">
      <div className="flex flex-col-reverse md:flex-row  items-center justify-between gap-12">
        
        {/* Left Side: Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl font-medium text-gray-500 mb-2">👋 Hi, I'm</h1>
          <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Precious <span className="text-rose-500">Ilebaye</span>
          </h3>
          <p className="text-rose-400 italic font-mono font-semibold uppercase tracking-widest text-sm mb-4">
            Graphic Designer • "Giving every pixel a voice"
          </p>
          <p className="text-gray-600 leading-relaxed">
            I'm a passionate creative and brand designer based in Nigeria, specializing in 
            transforming ideas into stunning visuals that communicate powerfully.
          </p>
          <button className="mt-8 px-8 py-3 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200">
            Let's Talk
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 flex justify-center sm:justify-end">
          <div className="relative group">

 <div className="relative">
          <div className="absolute top-0 right-0 -mr-100 -mt-4 w-full bg-rose-50 rounded-full -z-10 animate-pulse"></div>
          <img 
            src="/❤️4.webp" 
            alt="Graphic Designer" 
            className="max-w-90  hover:outline-6 hover:outline-rose-400 hover:-outline-offset-8  w-full h-full mx-auto aspect-square object-cover rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-rose-100 rounded-full -z-10 animate-pulse"></div>
          </div>
        </div>

      </div>
      <AboutPage/>
      <Project/>
       <SkillsPage/>
      <ServicePage/>
      <ContactPage/>
     <StickyFooter/>
    </div>
  );
};


export default HomePage