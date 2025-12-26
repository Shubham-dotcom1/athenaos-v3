import React from 'react';
import { Twitter, Linkedin, Github, Youtube, Trophy, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0f1115] border-t border-slate-800 pt-16 pb-8 text-slate-400">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Section: Brand & Newsletter */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="max-w-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                                AthenaOS
                            </span>
                        </div>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            The official emotional intelligence engine for ICC Women's Cricket.
                            Transforming match data into real-time narratives, fan engagement, and athlete psychology insights.
                        </p>
                        <div className="flex items-center gap-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                            <span className="flex items-center gap-1.5">
                                <Trophy size={14} className="text-pink-500" />
                                Official AI Partner
                            </span>
                            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                            <span>ICC Women's World Cup</span>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="w-full md:w-auto">
                        <h3 className="text-white font-semibold mb-2">Get Match Intelligence Delivered</h3>
                        <p className="text-sm text-slate-500 mb-4">Daily digests of emotional arcs and key turning points.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="coach@team.com"
                                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm w-full md:w-72 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <button className="bg-white text-slate-900 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-slate-800 py-12 mb-12">
                    <div>
                        <h4 className="text-white font-semibold mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/dashboard" className="hover:text-purple-400 transition-colors">Mission Control</Link></li>
                            <li><Link href="/athletes" className="hover:text-purple-400 transition-colors">Athlete Intelligence</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Match Simulator</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Story Engine</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-6">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">API Documentation</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Emotional Scoring Methodology</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Analyst Guide</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">About AthenaOS</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                                Careers
                                <span className="bg-purple-500/10 text-purple-400 text-[10px] px-1.5 py-0.5 rounded font-medium">HIRING</span>
                            </Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Press Kit</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-6">Connect</h4>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors"><Linkedin size={18} /></a>
                            <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors"><Github size={18} /></a>
                            <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors"><Youtube size={18} /></a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Globe size={14} /> Mumbai, India (HQ)
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Partners & Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Partners/Trust Badges */}
                        <span className="text-lg font-serif font-bold tracking-widest">ICC</span>
                        <span className="text-base font-bold tracking-wider">BCCI</span>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-slate-600">
                        <span>&copy; 2025 AthenaOS Inc. All rights reserved.</span>
                        <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
                        <Link href="#" className="hover:text-slate-400 flex items-center gap-1">
                            <ShieldCheck size={12} />
                            Data Ethics
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
