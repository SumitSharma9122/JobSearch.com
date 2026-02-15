import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Github, Linkedin, Twitter, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='relative bg-gray-900 text-gray-300 overflow-hidden'>
            {/* Gradient top border */}
            <div className='h-1 w-full bg-gradient-to-r from-brand-500 via-blue-500 to-brand-500'></div>

            <div className='max-w-6xl mx-auto px-4 pt-16 pb-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-10 mb-12'>
                    {/* Brand */}
                    <div className='md:col-span-1'>
                        <h2 className='text-2xl font-extrabold text-white mb-3'>
                            Job<span className='gradient-text'>Portal</span>
                        </h2>
                        <p className='text-sm text-gray-400 leading-relaxed'>
                            Your one-stop destination for finding dream jobs and hiring top talent.
                        </p>
                        <div className='flex gap-3 mt-5'>
                            {[
                                { icon: <Github size={18} />, href: "#" },
                                { icon: <Linkedin size={18} />, href: "#" },
                                { icon: <Twitter size={18} />, href: "#" },
                            ].map((social, i) => (
                                <a key={i} href={social.href} className='w-9 h-9 rounded-full bg-gray-800 hover:bg-brand-500 flex items-center justify-center transition-all duration-300 hover:scale-110 text-gray-400 hover:text-white'>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className='text-white font-semibold mb-4 text-sm uppercase tracking-wider'>For Job Seekers</h3>
                        <ul className='space-y-3'>
                            {["Browse Jobs", "Companies", "Career Advice", "Resume Builder"].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className='text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group'>
                                        {item}
                                        <ArrowUpRight size={12} className='opacity-0 group-hover:opacity-100 transition-opacity' />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-white font-semibold mb-4 text-sm uppercase tracking-wider'>For Employers</h3>
                        <ul className='space-y-3'>
                            {["Post a Job", "Browse Candidates", "Pricing Plans", "Employer Dashboard"].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className='text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group'>
                                        {item}
                                        <ArrowUpRight size={12} className='opacity-0 group-hover:opacity-100 transition-opacity' />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className='text-white font-semibold mb-4 text-sm uppercase tracking-wider'>Contact Us</h3>
                        <ul className='space-y-3'>
                            <li className='flex items-center gap-2 text-sm text-gray-400'>
                                <Mail size={14} className='text-brand-400' /> support@jobportal.com
                            </li>
                            <li className='flex items-center gap-2 text-sm text-gray-400'>
                                <Phone size={14} className='text-brand-400' /> +91 98765 43210
                            </li>
                            <li className='flex items-center gap-2 text-sm text-gray-400'>
                                <MapPin size={14} className='text-brand-400' /> Bangalore, India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className='border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
                    <p className='text-sm text-gray-500'>
                        &copy; 2025 JobPortal. All rights reserved.
                    </p>
                    <p className='text-sm text-gray-500 flex items-center gap-1'>
                        Made with <Heart size={14} className='text-red-500 animate-bounce-subtle' fill='currentColor' /> by Sumit Sharma
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
