"use client";

import React from 'react';
import StoryPanel from '@/components/StoryPanel';
import { Sparkles, BookOpen } from 'lucide-react';

// Mock data for initial story generation
const MOCK_TIMELINE: any[] = [
    { timestamp: "18.1", emotion_score: 0.2, emotion_label: "Neutral" },
    { timestamp: "18.2", emotion_score: 0.8, emotion_label: "Euphoria" },
    { timestamp: "18.3", emotion_score: 0.9, emotion_label: "Euphoria" }
];

export default function StoriesPage() {
    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            <div className="max-w-7xl mx-auto p-6 pb-20">
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-pink-500/20 rounded-xl">
                            <Sparkles className="text-pink-400" size={32} />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                            Match Narratives
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg max-w-2xl ml-1">
                        AI-generated storytelling converting data into drama.
                        Relive the match through the lens of emotional momentum.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Story Generator */}
                    <div className="lg:col-span-2">
                        <StoryPanel
                            timeline={MOCK_TIMELINE}
                            moments={{
                                turning_point: { timestamp: "18.2", emotion_score: 0.8, emotion_label: "Euphoria", context_weight: 1, sentiment_raw: 0.8 },
                                highest_pressure: { timestamp: "18.1", emotion_score: 0.9, emotion_label: "High Pressure", context_weight: 1, sentiment_raw: 0.9 }
                            }}
                            players={["Richa Ghosh", "Smriti Mandhana", "Ellyse Perry"]}
                        />
                    </div>

                    {/* Sidebar / Archive (Placeholder for MVP) */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4 text-slate-300 font-semibold">
                                <BookOpen size={20} />
                                <h3>Archive</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors cursor-pointer group">
                                    <span className="text-xs text-slate-500 font-mono mb-1 block">YESTERDAY</span>
                                    <h4 className="font-medium text-slate-200 group-hover:text-pink-400 transition-colors">IND-W vs ENG-W</h4>
                                    <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                                        A nail-biting finish as Harmanpreet Kaur steers the ship through stormy waters...
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors cursor-pointer group">
                                    <span className="text-xs text-slate-500 font-mono mb-1 block">2 DAYS AGO</span>
                                    <h4 className="font-medium text-slate-200 group-hover:text-pink-400 transition-colors">AUS-W vs SA-W</h4>
                                    <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                                        Wolvaardt's elegance wasn't enough to stop the Australian juggernaut in the semi-final...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
                            <h3 className="text-purple-300 font-medium mb-2">Did you know?</h3>
                            <p className="text-slate-400 text-sm">
                                AthenaOS analyzes over 50 micro-expressions and contextual events to determine the "Emotional Temperature" of a match narrative.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
