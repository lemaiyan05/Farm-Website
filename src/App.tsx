import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Milk, IceCream, Cookie, MapPin, Phone, Clock, Mail, Menu, X, CircleDot } from 'lucide-react'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const sections = [heroRef, aboutRef, productsRef, galleryRef, contactRef]
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ]

  const products = [
    {
      name: 'Fresh Whole Milk',
      description: 'Creamy, farm-fresh milk delivered straight from our grass-fed cows.',
      price: 'ksh 80/liter',
      icon: Milk,
      image: '/fresh-milk.jpg'
    },
    {
      name: 'Artisan Cheese',
      description: 'Handcrafted cheeses aged to perfection using traditional methods.',
      price: 'ksh 150/l',
      icon: CircleDot,
      image: '/cheese-making.jpg'
    },
    {
      name: 'Greek Yogurt',
      description: 'Thick, creamy yogurt made with live cultures and no additives.',
      price: 'ksh 100/tub',
      icon: IceCream,
      image: '/products.jpg'
    },
    {
      name: 'Fresh Butter',
      description: 'Rich, creamy butter churned fresh from our farm cream.',
      price: 'ksh 200/kg',
      icon: Cookie,
      image: '/products.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#4a7c59] rounded-full flex items-center justify-center">
                <Milk className="w-5 h-5 text-white" />
              </div>
              <span className={`font-serif text-xl font-semibold transition-colors ${
                isScrolled ? 'text-[#2c3e2c]' : 'text-white'
              }`}>
                Mootian's Farm
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-[#4a7c59] ${
                    isScrolled ? 'text-[#5a5a5a]' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-[#4a7c59] hover:bg-[#3d6548] text-white"
              >
                Visit Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={isScrolled ? 'text-[#2c3e2c]' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-[#2c3e2c]' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left py-2 text-[#5a5a5a] hover:text-[#4a7c59]"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="./dist/hero-farm.jpg"
            alt="Beautiful dairy farm at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className={`font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-tight ${
              visibleSections.has('hero') ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            Fresh From Our Farm
            <br />
            <span className="text-[#d4a574]">To Your Table</span>
          </h1>
          <p
            className={`text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto ${
              visibleSections.has('hero') ? 'animate-fade-in-up delay-200' : 'opacity-0'
            }`}
          >
            Experience the pure taste of farm-fresh dairy, crafted with care by our family for the last three years.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${
              visibleSections.has('hero') ? 'animate-fade-in-up delay-300' : 'opacity-0'
            }`}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('products')}
              className="bg-[#4a7c59] hover:bg-[#3d6548] text-white px-8"
            >
              Explore Our Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="border-white text-white hover:bg-white/10 px-8"
            >
              Our Story
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20 md:py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              className={`${
                visibleSections.has('about') ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <span className="text-[#4a7c59] font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2c3e2c] mt-3 mb-6">
                7 years of
                <br />
                <span className="text-[#d4a574]">Dairy Excellence</span>
              </h2>
              <p className="text-[#5a5a5a] leading-relaxed mb-6">
                Founded in 2019, Mootian's Dairy Farm began as a small family operation 
                with just three cows and a dream. Today, we're proud to be one of the region's 
                most trusted sources of premium, farm-fresh dairy products.
              </p>
              <p className="text-[#5a5a5a] leading-relaxed mb-8">
                Our commitment to sustainable farming practices and the highest animal welfare 
                standards ensures that every product we create is not only delicious but also 
                ethically produced. We believe happy cows make the best milk!
              </p>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#4a7c59]">5+</div>
                  <div className="text-sm text-[#5a5a5a] mt-1">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#4a7c59]">20+</div>
                  <div className="text-sm text-[#5a5a5a] mt-1">Happy Cows</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-[#4a7c59]">30+</div>
                  <div className="text-sm text-[#5a5a5a] mt-1">Happy Customers</div>
                </div>
              </div>
            </div>

            <div
              className={`relative ${
                visibleSections.has('about') ? 'animate-slide-in-right' : 'opacity-0'
              }`}
            >
              <div className="relative">
                <img
                  src="./dist/farm5.jpg"
                  alt="Farmer with cows"
                  className="rounded-2xl shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-[#d4a574] fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#5a5a5a]">
                    "The freshest milk I've ever tasted!"
                  </p>
                  <p className="text-xs text-[#4a7c59] mt-2 font-medium">- Lemaiyan M.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        ref={productsRef}
        className="py-20 md:py-32 px-4 bg-[#f5f2eb]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className={`text-[#4a7c59] font-medium text-sm uppercase tracking-wider ${
                visibleSections.has('products') ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              Our Products
            </span>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl text-[#2c3e2c] mt-3 mb-4 ${
                visibleSections.has('products') ? 'animate-fade-in-up delay-100' : 'opacity-0'
              }`}
            >
              Farm-Fresh Dairy Delights
            </h2>
            <p
              className={`text-[#5a5a5a] max-w-2xl mx-auto ${
                visibleSections.has('products') ? 'animate-fade-in-up delay-200' : 'opacity-0'
              }`}
            >
              From our pasture to your table, experience the difference that fresh, 
              locally-sourced dairy makes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.name}
                className={`group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white ${
                  visibleSections.has('products')
                    ? `animate-fade-in-up delay-${(index + 1) * 100}`
                    : 'opacity-0'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#4a7c59] text-white text-sm font-medium px-3 py-1 rounded-full">
                    {product.price}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#f5f2eb] rounded-full flex items-center justify-center">
                      <product.icon className="w-5 h-5 text-[#4a7c59]" />
                    </div>
                    <h3 className="font-serif text-xl text-[#2c3e2c]">{product.name}</h3>
                  </div>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={`text-center mt-12 ${
              visibleSections.has('products') ? 'animate-fade-in-up delay-500' : 'opacity-0'
            }`}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-[#4a7c59] hover:bg-[#3d6548] text-white"
            >
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        ref={galleryRef}
        className="py-20 md:py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className={`text-[#4a7c59] font-medium text-sm uppercase tracking-wider ${
                visibleSections.has('gallery') ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              Farm Life
            </span>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl text-[#2c3e2c] mt-3 mb-4 ${
                visibleSections.has('gallery') ? 'animate-fade-in-up delay-100' : 'opacity-0'
              }`}
            >
              A Glimpse Into Our World
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={`relative group overflow-hidden rounded-2xl ${
                visibleSections.has('gallery') ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <img
                src="/cows.jpg"
                alt="Our happy cows"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-serif text-2xl mb-2">Happy Cows</h3>
                <p className="text-white/80 text-sm">Our pasture-raised cows enjoy fresh grass daily</p>
              </div>
            </div>

            <div className="grid gap-6">
              <div
                className={`relative group overflow-hidden rounded-2xl ${
                  visibleSections.has('gallery') ? 'animate-slide-in-right delay-100' : 'opacity-0'
                }`}
              >
                <img
                  src="/cheese-making.jpg"
                  alt="Cheese making process"
                  className="w-full h-[190px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-serif text-xl">Artisan Craft</h3>
                </div>
              </div>

              <div
                className={`relative group overflow-hidden rounded-2xl ${
                  visibleSections.has('gallery') ? 'animate-slide-in-right delay-200' : 'opacity-0'
                }`}
              >
                <img
                  src="/products.jpg"
                  alt="Fresh dairy products"
                  className="w-full h-[190px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-serif text-xl">Fresh Products</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-20 md:py-32 px-4 bg-[#2c3e2c]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div
              className={`${
                visibleSections.has('contact') ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <span className="text-[#4a7c59] font-medium text-sm uppercase tracking-wider">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mt-3 mb-6">
                Visit Our Farm
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                We'd love to welcome you to Mootian's Dairy Farm! Stop by our farm store for 
                the freshest dairy products, or schedule a tour to see how we care for 
                our animals and produce our delicious offerings.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4a7c59]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#4a7c59]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Address</h4>
                    <p className="text-white/70"> East Africa, Kenya, Nyandarua, Kanjuiri</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4a7c59]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#4a7c59]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone</h4>
                    <p className="text-white/70"> +254700433210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4a7c59]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#4a7c59]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <p className="text-white/70">mootianjames5@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4a7c59]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#4a7c59]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Hours</h4>
                    <p className="text-white/70">Mon - Sat: 7:00 AM - 6:00 PM</p>
                    <p className="text-white/70">Sunday: 8:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                visibleSections.has('contact') ? 'animate-slide-in-right' : 'opacity-0'
              }`}
            >
              <div className="bg-white rounded-2xl p-8">
                <h3 className="font-serif text-2xl text-[#2c3e2c] mb-6">Send Us a Message</h3>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#5a5a5a] mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#5a5a5a] mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#5a5a5a] mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#5a5a5a] mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c59] resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#4a7c59] hover:bg-[#3d6548] text-white py-3"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2a1a] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#4a7c59] rounded-full flex items-center justify-center">
                  <Milk className="w-5 h-5 text-white" />
                </div>
                <span className="font-serif text-xl font-semibold text-white">
                  Green Pastures
                </span>
              </div>
              <p className="text-white/60 max-w-md">
                Family-owned dairy farm committed to producing the finest quality milk, 
                cheese, and dairy products using sustainable and ethical farming practices.
              </p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/60 hover:text-[#4a7c59] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#4a7c59] transition-colors"
                  >
                    <span className="text-white text-xs">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2024 Mootian's Dairy Farm. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-white/40 hover:text-white text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-white/40 hover:text-white text-sm transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
