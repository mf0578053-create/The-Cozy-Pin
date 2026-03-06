import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  Heart, 
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aero-Dynamic Runner",
    price: 189.00,
    category: "Footwear",
    image: "https://picsum.photos/seed/shoes1/600/800",
    rating: 4.8
  },
  {
    id: 2,
    name: "Minimalist Shell Jacket",
    price: 245.00,
    category: "Outerwear",
    image: "https://picsum.photos/seed/jacket1/600/800",
    rating: 4.9
  },
  {
    id: 3,
    name: "Carbon Fiber Watch",
    price: 599.00,
    category: "Accessories",
    image: "https://picsum.photos/seed/watch1/600/800",
    rating: 4.7
  },
  {
    id: 4,
    name: "Ergo-Grip Backpack",
    price: 120.00,
    category: "Gear",
    image: "https://picsum.photos/seed/bag1/600/800",
    rating: 4.6
  }
];

const CATEGORIES = ["All", "Footwear", "Outerwear", "Accessories", "Gear"];

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-brand-accent rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-brand-accent/20" />
    <div className="relative w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center border border-brand-primary/5">
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Abstract "CP" Monogram: A unique mark combining 'C' and 'P' */}
        <path d="M18 11a6 6 0 1 0-6 6h6V5" />
        <circle cx="12" cy="11" r="2" fill="currentColor" />
      </svg>
    </div>
  </div>
);

const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setSearchOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-brand-primary/95 backdrop-blur-xl py-4 shadow-2xl border-b border-white/10' 
        : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#" className="text-xl font-display font-bold tracking-tighter flex items-center gap-3 transition-colors duration-300 text-white">
            <Logo />
            THE COZY PIN
          </a>
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
            <a href="#shop" className="hover:text-brand-accent transition-colors">Shop</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Collections</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Journal</a>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white">
          <button 
            onClick={() => setSearchOpen(true)}
            className="p-2.5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95"
          >
            <Search size={20} />
          </button>
          <button className="p-2.5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 relative">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-brand-accent text-brand-primary text-[9px] font-black rounded-full flex items-center justify-center border-2 border-brand-primary shadow-sm">
              2
            </span>
          </button>
          <button 
            className="lg:hidden p-2.5 hover:bg-white/10 rounded-full transition-all"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[70] flex flex-col p-6"
          >
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center mb-12">
              <span className="text-2xl font-display font-bold tracking-tighter">SEARCH</span>
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-2 border border-black/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="max-w-3xl mx-auto w-full mt-24">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input 
                  autoFocus
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?" 
                  className="w-full text-4xl md:text-6xl font-display font-bold border-b-2 border-black/10 pb-4 focus:outline-none focus:border-brand-accent transition-colors"
                />
                <button type="submit" className="absolute right-0 bottom-6 p-2 bg-brand-accent rounded-full">
                  <ArrowRight size={24} />
                </button>
              </form>
              <div className="mt-12 flex flex-wrap gap-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Popular:</span>
                {["Shoes", "Jackets", "Bags", "Watches"].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      onSearch(tag);
                      setSearchOpen(false);
                    }}
                    className="text-sm font-bold hover:text-brand-accent transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-primary text-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-display font-bold tracking-tighter">THE COZY PIN</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 border border-white/20 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-display font-bold">
              <a href="#" onClick={() => setMobileMenuOpen(false)}>Shop</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)}>Collections</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)}>Journal</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)}>About</a>
            </div>
            <div className="mt-auto flex gap-6">
              <Instagram size={24} />
              <Twitter size={24} />
              <Facebook size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-brand-primary text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=2070" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-brand-accent text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8 shadow-xl shadow-brand-accent/20"
          >
            <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
            New Season Drop
          </motion.span>
          <h1 className="text-7xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter mb-10">
            COZY <br />
            <span className="text-brand-accent italic">LIVING</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-md leading-relaxed">
            High-performance gear designed for the modern explorer. Engineered for the city, built for the wild.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-brand-accent text-brand-primary font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
              Shop Collection <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 font-bold rounded-full hover:bg-white/20 transition-colors">
              View Lookbook
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-12 right-12 hidden lg:block"
      >
        <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center text-[10px] font-bold tracking-[0.2em] uppercase">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="animate-pulse">Est. 2024</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            <text className="fill-white text-[8px]">
              <textPath href="#circlePath">
                PREMIUM QUALITY • SUSTAINABLE DESIGN • THE COZY PIN • 
              </textPath>
            </text>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

const ProductCard = ({ product }: { product: Product, key?: React.Key }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-brand-accent transition-colors">
            <Heart size={18} />
          </button>
          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-brand-accent transition-colors">
            <ShoppingBag size={18} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full py-3 bg-brand-primary text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2">
            Quick Add <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
          <h3 className="font-display font-bold text-lg leading-tight">{product.name}</h3>
        </div>
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} className={i < Math.floor(product.rating) ? "fill-brand-accent text-brand-accent" : "text-gray-300"} />
        ))}
        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = ({ searchQuery }: { searchQuery: string }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="shop" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">
            {searchQuery ? `RESULTS FOR "${searchQuery.toUpperCase()}"` : 'CURATED SELECTION'}
          </h2>
          <p className="text-gray-500 max-w-md">
            {searchQuery 
              ? `Found ${filteredProducts.length} items matching your search.` 
              : 'Hand-picked essentials for your daily rotation. Quality over quantity, always.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-brand-primary text-white' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-center"
            >
              <Search size={48} className="text-gray-200 mb-4" />
              <h3 className="text-2xl font-display font-bold mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your search or category filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-brand-accent rounded-[3rem] p-12 md:p-24 flex flex-col items-center text-center overflow-hidden relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 text-brand-primary">
            JOIN THE <br />COZY CLUB
          </h2>
          <p className="text-brand-primary/70 mb-10 text-lg">
            Subscribe to receive early access to drops, exclusive content, and 10% off your first order.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 w-full">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-8 py-4 bg-white rounded-full text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
            <button className="px-10 py-4 bg-brand-primary text-white font-bold rounded-full hover:scale-105 transition-transform">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <a href="#" className="text-4xl font-display font-bold tracking-tighter mb-8 flex items-center gap-4">
              <Logo className="scale-125 origin-left" />
              THE COZY PIN
            </a>
            <p className="text-white/50 max-w-sm mb-8">
              Redefining comfort through technical innovation and minimalist design. Based in Tokyo, shipping worldwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-brand-accent">Shop</h4>
            <ul className="flex flex-col gap-4 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-brand-accent">Support</h4>
            <ul className="flex flex-col gap-4 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>© 2024 The Cozy Pin. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to products section if searching
    if (query) {
      const element = document.getElementById('shop');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar onSearch={handleSearch} />
      <main>
        <Hero />
        <FeaturedProducts searchQuery={searchQuery} />
        
        {/* Banner Section */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000" 
                alt="Lifestyle" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:pl-12">
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8">
                DESIGNED <br />FOR LIFE
              </h2>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                Our philosophy is simple: build products that last. We use premium materials and technical construction to ensure every piece in your wardrobe serves a purpose.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-display font-bold text-brand-primary mb-2">100%</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Recycled Materials</p>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-brand-primary mb-2">Lifetime</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Repair Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
