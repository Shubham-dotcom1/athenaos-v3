"use client";

import Link from "next/link";
import { ArrowRight, Activity, Brain, TrendingUp, Play } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-indigo-500/30">
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">

        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto mb-24 space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
            AthenaOS — Real-Time Emotional Intelligence for <span className="text-indigo-400">Elite Cricket Performance</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Measure pressure, resilience, and momentum to uncover the psychological story behind every match.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium pt-2">
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Event-Driven Intelligence
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Built for Coaches & Analysts
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Designed for Elite Women’s Cricket
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href={user ? "/dashboard" : "/auth/login"}
              className="px-8 py-3.5 bg-white text-[#0B0F19] rounded-lg font-semibold hover:bg-slate-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5 active:scale-95"
            >
              <Play size={18} fill="currentColor" />
              Launch Live Dashboard
            </Link>
            <button className="px-8 py-3.5 border border-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-800 transition-all active:scale-95">
              Watch 60s Demo
            </button>
          </div>
        </section>


        {/* LIVE MATCH CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-32">
          {/* Card 1 */}
          <Link href={user ? "/dashboard" : "/auth/login"} className="group block bg-white rounded-xl p-6 shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-[1.01] transition-all cursor-pointer border border-slate-100/5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-red-500 uppercase">Live Analysis</span>
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-indigo-600 transition-colors" size={20} />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-1">India Women vs Australia Women</h3>
            <p className="text-slate-500 font-medium">T20 · Wankhede Stadium</p>
          </Link>

          {/* Card 2 */}
          <div className="group bg-[#131722] rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-indigo-400" />
                <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Quick Insight</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">Match Emotional Timeline</h3>
            <p className="text-slate-400">Live pressure & momentum shifts detected.</p>
          </div>
        </section>


        {/* PRODUCT VALUE SECTION */}
        <section className="max-w-6xl mx-auto border-t border-slate-800/50 pt-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Turning Emotion Into Data.</h2>
            <p className="text-slate-400">Beyond the scoreboard—quantifying the intangible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-[#0F1420] border border-slate-800 p-8 rounded-2xl hover:bg-[#131929] transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Emotional Engine</h3>
              <p className="text-slate-400 leading-relaxed">
                Real-time emotional modeling from match events and commentary, calculating impact scores for every ball.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-[#0F1420] border border-slate-800 p-8 rounded-2xl hover:bg-[#131929] transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Athlete Intelligence</h3>
              <p className="text-slate-400 leading-relaxed">
                Tracks resilience, volatility, and pressure response per player to identify clutch performers.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-[#0F1420] border border-slate-800 p-8 rounded-2xl hover:bg-[#131929] transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Momentum Insights</h3>
              <p className="text-slate-400 leading-relaxed">
                Identifies collapse risk, comebacks, and psychological turning points before they happen.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/50 py-12 text-center">
        <p className="text-slate-500 text-sm font-medium">Built for high-performance sports analysis</p>
        <p className="text-slate-600 text-xs mt-2">© {new Date().getFullYear()} AthenaOS</p>
      </footer>
    </div>
  );
}
