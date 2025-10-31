import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function AboutPage() {
  const [teamPhotos, setTeamPhotos] = useState({
    "Qualicha N.": "/api/placeholder/300/300",
    "Vincent K.": "/api/placeholder/300/300",
    "Rooney K.": "/api/placeholder/300/300",
    "Ochieng O.": "/api/placeholder/300/300"
  });

  const fileInputs = useRef({});

  const handlePhotoUpload = (memberName, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTeamPhotos(prev => ({
          ...prev,
          [memberName]: e.target.result
        }));
        // Save to localStorage for persistence
        localStorage.setItem(`teamPhoto_${memberName.replace(/\s+/g, '_')}`, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (memberName) => {
    fileInputs.current[memberName]?.click();
  };

  // Load saved photos from localStorage on component mount
  useEffect(() => {
    const savedPhotos = {};
    team.forEach(member => {
      const savedPhoto = localStorage.getItem(`teamPhoto_${member.name.replace(/\s+/g, '_')}`);
      if (savedPhoto) {
        savedPhotos[member.name] = savedPhoto;
      }
    });
    if (Object.keys(savedPhotos).length > 0) {
      setTeamPhotos(prev => ({ ...prev, ...savedPhotos }));
    }
  }, []);
  const stats = [
    { number: "10,000+", label: "Happy Students" },
    { number: "500+", label: "Active Services" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const team = [
    {
      name: "Qualicha N.",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in modern web technologies and user experience.",
      testimonial: "CampusConnect saved me hours every week! Laundry pickup and delivery is a game changer."
    },
    {
      name: "Vincent K.",
      role: "Project Manager",
      bio: "Agile project manager ensuring seamless development and delivery of campus solutions.",
      testimonial: "Found amazing tutoring services and never have to worry about printing assignments again."
    },
    {
      name: "Rooney K.",
      role: "UI/UX Designer",
      bio: "Creative designer crafting intuitive interfaces that enhance student productivity.",
      testimonial: "The platform is so easy to use. Booked 5 services in under 2 minutes!"
    },
    {
      name: "Ochieng O.",
      role: "Backend Developer",
      bio: "Backend specialist building robust APIs and scalable systems for campus services.",
      testimonial: "CampusConnect made campus life so much easier. Highly recommend to all students!"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Student First",
      description: "Everything we do is designed with students' needs and convenience in mind."
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description: "We work closely with students, vendors, and administrators to improve campus life."
    },
    {
      icon: "🔒",
      title: "Trust & Safety",
      description: "Your security and privacy are our top priorities in everything we build."
    },
    {
      icon: "⚡",
      title: "Innovation",
      description: "We constantly evolve our platform to meet the changing needs of campus communities."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Header with Back Button */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lime-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-lime-400 to-blue-400 bg-clip-text text-transparent">CampusConnect</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing campus life by connecting students with essential services through a seamless, modern platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-6">
                CampusConnect was born from a simple idea: college life shouldn't be complicated.
                We believe that students should spend their time focusing on what matters most -
                their education and personal growth - not hunting for laundry services or waiting
                in line for printing.
              </p>
              <p className="text-gray-300 text-lg">
                Our platform brings together all the essential services students need in one
                convenient place, making campus life easier, more efficient, and more enjoyable
                for everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-lime-400/10 to-blue-400/10 border border-lime-400/20 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎓</div>
                  <h3 className="text-2xl font-bold mb-4">Student-Centric Design</h3>
                  <p className="text-gray-300">
                    Every feature we build starts with one question: "How does this help students?"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">CampusConnect by Numbers</h2>
            <p className="text-gray-400">Our impact on campus communities</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-8 text-center hover:border-lime-400/50 transition-colors"
              >
                <div className="text-4xl font-bold text-lime-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-400">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-[#0e0e0e] border border-gray-800 rounded-xl p-6 hover:border-lime-400/50 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-lime-400 transition-colors">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">How It All Started</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  CampusConnect began as a solution to a common problem. Our founders, Sarah and Mike,
                  were university students struggling to find reliable campus services. Hours spent
                  waiting in lines, searching for service providers, and coordinating schedules took
                  valuable time away from studying and personal growth.
                </p>
                <p>
                  After graduating, they saw an opportunity to create a platform that would solve
                  these challenges for current and future students. What started as a simple idea
                  has grown into a comprehensive platform serving thousands of students across
                  multiple campuses.
                </p>
                <p>
                  Today, CampusConnect continues to evolve, always listening to student feedback
                  and adapting to the changing needs of campus communities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold mb-4">From Problem to Solution</h3>
                  <p className="text-gray-300 mb-6">
                    What began as frustration with campus services became a mission to improve
                    student life for everyone.
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-400">
                    <div className="text-center">
                      <div className="text-lime-400 font-bold">2020</div>
                      <div>Idea Born</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lime-400 font-bold">2021</div>
                      <div>MVP Launch</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lime-400 font-bold">2023</div>
                      <div>10K Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-400">The people behind CampusConnect</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-[#0e0e0e] border border-gray-800 rounded-xl p-6 text-center hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-400/10 transition-all duration-300 group"
              >
                <div className="relative mb-4">
                  <div className="relative">
                    <img
                      src={teamPhotos[member.name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=84cc16&color=000&size=80&font-size=0.5`}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-lime-400/20 group-hover:border-lime-400/50 transition-colors duration-300 cursor-pointer"
                      onClick={() => triggerFileInput(member.name)}
                    />
                    <input
                      type="file"
                      ref={(el) => fileInputs.current[member.name] = el}
                      onChange={(e) => handlePhotoUpload(member.name, e)}
                      accept="image/*"
                      className="hidden"
                    />
                    <div
                      className="absolute bottom-0 right-1/2 transform translate-x-6 w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-lime-500 transition-colors"
                      onClick={() => triggerFileInput(member.name)}
                      title="Upload photo"
                    >
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-lime-400 text-black text-xs px-2 py-1 rounded-full font-medium">
                    {member.role.split(' ')[0]}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-lime-400 transition-colors">{member.name}</h3>
                <p className="text-lime-400 font-medium mb-3 text-sm">{member.role}</p>
                <p className="text-gray-400 text-xs mb-4 leading-relaxed">{member.bio}</p>
                <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-3">
                  <p className="text-gray-300 text-xs italic leading-relaxed">"{member.testimonial}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-lime-400/10 to-blue-400/10 border border-lime-400/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-300 text-lg mb-8">
              Be part of the CampusConnect revolution. Whether you're a student looking for services
              or a vendor wanting to reach more customers, we have a place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-400/25"
              >
                Get Started Today
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}