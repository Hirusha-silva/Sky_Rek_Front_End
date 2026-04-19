import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate()
  return (
    <div className="bg-primary selection:bg-accent selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-5 overflow-hidden">
        
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#FDF2F8] rounded-full blur-3xl opacity-60 animate-pulse"></div>
        
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 z-10 text-center lg:text-left">
            <div className="inline-block px-4 py-1 rounded-full border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              New Season: Spring 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-secondary leading-none mb-8">
              Lumina <br />
              <span className="italic font-light pl-[100px] opacity-80">Beauty</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0">
              The future of skin health is here. Experience high-performance, plant-powered skincare designed to protect, nourish, and revitalize in a modern world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={()=>{navigate('/products')}} className="bg-secondary text-white px-10 py-5 rounded-full font-medium hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 cursor-pointer transition-all duration-300">
                Explore Collection
              </button>
              
            </div>
          </div>

          {/* Hero Image with Glassmorphism Card */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80" 
                alt="Lumina Beauty Model" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Glass Card */}
            <div className="absolute bottom-10 -left-10 md:-left-20 backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl border border-white/50 max-w-[200px] hidden sm:block -rotate-3">
            
              <h4 className="text-lg font-serif text-secondary mb-2">Our Promise</h4>
              <p className="text-[10px] text-gray-600 leading-tight">Pure & Safe Beauty</p>
              <div className="mt-3 font-bold text-secondary text-sm">100% natural ingredients with zero harmful chemicals.</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED CATEGORIES (Responsive Grid) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <h2 className="text-4xl font-serif text-secondary mb-4 md:mb-0">Shop by Essence</h2>
            <div className="w-full md:w-1/3 h-[1px] bg-gray-300 hidden md:block"></div>
            <a href="#" className="text-accent font-semibold tracking-widest hover:underline uppercase text-sm">View All Categories</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="group relative overflow-hidden rounded-3xl aspect-square cursor-pointer">
               <img src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h3 className="text-white text-3xl font-serif">Face & Body</h3>
               </div>
            </div>
            {/* Category 2 */}
            <div className="group relative overflow-hidden rounded-3xl aspect-square cursor-pointer">
               <img src="/lucas-mendes-CyfmSpqNMD8-unsplash.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h3 className="text-white text-3xl font-serif">Aromatics</h3>
               </div>
            </div>
            {/* Category 3 */}
            <div className="group relative overflow-hidden rounded-3xl aspect-square cursor-pointer">
               <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h3 className="text-white text-3xl font-serif">Cosmetics</h3>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}