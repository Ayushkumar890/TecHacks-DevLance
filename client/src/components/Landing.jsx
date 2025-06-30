import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Mock Header Component
const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-white">DevLance</div>
      <nav className="hidden md:flex space-x-8">
        <a href="#home" className="text-white/90 hover:text-white transition-colors">Home</a>
        <a href="#features" className="text-white/90 hover:text-white transition-colors">Features</a>
        <a href="#about" className="text-white/90 hover:text-white transition-colors">About</a>
        <a href="#contact" className="text-white/90 hover:text-white transition-colors">Contact</a>
        <a href="/login" className="text-white/90 hover:text-white transition-colors">Login</a>
        <a href="/register" className="text-white/90 hover:text-white transition-colors">Register</a>
      </nav>
    </div>
  </header>
)

// Mock Footer Component
const Footer = () => (
  <footer className="bg-white/10 backdrop-blur-lg text-white py-12">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2025 DevLance. All rights reserved.</p>
    </div>
  </footer>
)

// Floating Particles Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 20 + 10
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/20 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  )
}

// Gradient Button Component
const GradientButton = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "relative overflow-hidden group transition-all duration-300 transform hover:scale-105 font-semibold rounded-xl px-8 py-4 text-center"
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl",
    secondary: "bg-white/20 backdrop-blur-lg text-white border border-white/30 hover:bg-white/30"
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <div 
    className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative z-10">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-white/80 leading-relaxed mb-6">{description}</p>
      <div className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-medium">
        Learn More →
      </div>
    </div>
  </div>
)

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Smooth scroll for navigation
    const handleSmoothScroll = (e) => {
      if (e.target.hash) {
        e.preventDefault()
        const target = document.querySelector(e.target.hash)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    
    document.addEventListener('click', handleSmoothScroll)
    return () => document.removeEventListener('click', handleSmoothScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900  overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-14">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
          <FloatingParticles />
          
          {/* Geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DevLance
              </span>
              <br />
              <span className="text-4xl md:text-5xl font-light text-white/90">
                Where Developers Thrive
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the future of freelancing with our open-source ecosystem, transparent collaboration, 
              and revolutionary GitHub integration. Join the revolution!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/login">
              <GradientButton variant="primary" className="min-w-[200px]">
                Get Started Free
              </GradientButton>
              </Link>
              <GradientButton variant="secondary" className="min-w-[200px]">
                Explore Features
              </GradientButton>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl transform rotate-1" />
              {/* <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <div className="text-white/60 text-lg">Dashboard Preview</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Powerful <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover the revolutionary features that make DevLance the ultimate platform for modern developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              delay={0}
              icon={
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              }
              title="Open-Source Synergy"
              description="Empowering collaboration, transparency, and community-driven development for a vibrant developer ecosystem."
            />
            
            <FeatureCard
              delay={200}
              icon={
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              }
              title="Verified Elite Devs"
              description="Ensures developer authenticity, reduces scams, and promotes open source contributions through seamless GitHub integration."
            />
            
            <FeatureCard
              delay={400}
              icon={
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              }
              title="No Middle Payments"
              description="Fair compensation, timely transactions, and cost reduction by eliminating intermediaries in the payment process."
            />
            
            <FeatureCard
              delay={600}
              icon={
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-6h2.5l6 6H4zm16.5-7.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
                </svg>
              }
              title="Community Oversight"
              description="Managed by open-source developers, ensuring a transparent, collaborative, and trustworthy freelance platform environment."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold">
                About DevLance
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Empowering Developers Through 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Innovation</span>
              </h2>
              
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  DevLance revolutionizes freelancing for developers with its open-source ethos and community-driven approach. 
                  Founded on the principles of transparency and trust, DevLance eliminates intermediaries, ensuring fair compensation and timely payments.
                </p>
                <p>
                  Our platform's unique GitHub Profile Sync feature enhances security, verifying each developer's authenticity. 
                  Managed by a community of open-source enthusiasts, DevLance fosters collaboration, innovation, and genuine contributions.
                </p>
              </div>
              
              <GradientButton variant="primary">
                Discover Our Story
              </GradientButton>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl transform -rotate-6" />
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 h-96 flex items-center justify-center">
                  {/* <div className="text-white/60 text-lg">About Us Visual</div> */}
                  <div>
                    <img src="assets/images/Aboutimage.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 relative">
        <div className="container mx-auto relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold">
                Get In Touch
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Let's Start a 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Conversation</span>
              </h2>
              
              <p className="text-xl text-white/70 leading-relaxed">
                Ready to revolutionize your freelancing experience? We'd love to hear from you and help you get started.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    placeholder="Tell us more about your project..."
                  />
                </div>
                
                <GradientButton variant="primary" className="w-full">
                  Send Message
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}