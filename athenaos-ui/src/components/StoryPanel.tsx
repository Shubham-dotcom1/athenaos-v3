"use client";

import { useState } from 'react';
import Card from './Card';
import { AthenaAPI } from '@/app/api/athena';
import { Loader2, Sparkles, Copy, Share2 } from 'lucide-react';
import { KeyMoments } from '@/types';



interface Props {
    timeline: any[];
    moments: KeyMoments;
    players: string[];
    replayTime?: number;
}

export default function StoryPanel({ timeline, moments, players, replayTime }: Props) {
    const [storyData, setStoryData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [tone, setTone] = useState("emotional");
    const [type, setType] = useState("match_recap");

    const generate = async () => {
        setLoading(true);
        try {
            const timestamp = replayTime ? replayTime.toFixed(1) : undefined;
            const context = timestamp ? `Over ${timestamp} Pressure High` : undefined; // Mock context derived from time

            const res = await AthenaAPI.generateStory(
                type,
                tone,
                timeline,
                moments,
                players,
                "Match in Progress",
                timestamp,
                context
            );
            setStoryData(res);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="AI Story Engine" className="h-full flex flex-col">
            <div className="flex gap-2 mb-4">
                <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="bg-slate-700 text-white text-sm rounded px-3 py-2 border border-slate-600 focus:outline-none focus:border-purple-500"
                >
                    <option value="emotional">Emotional</option>
                    <option value="hype">Hype Mode</option>
                    <option value="analytical">Analytical</option>
                </select>

                <button
                    onClick={generate}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium rounded px-4 py-2 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    {replayTime ? `Analyze ${replayTime.toFixed(1)}` : 'Generate Recap'}
                </button>
            </div>

            <div className="flex-1 bg-slate-900/50 rounded-lg p-4 border border-slate-800 overflow-y-auto min-h-[150px]">
                {storyData ? (
                    <div className="animate-fade-in space-y-4">
                        {/* Header Metadata */}
                        <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider">{storyData.moment_label}</div>
                                <div className={`text-sm font-bold ${storyData.emotion_level.includes("High") ? 'text-red-400' : 'text-green-400'
                                    }`}>
                                    {storyData.emotion_level}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-400">Confidence</div>
                                <div className="text-sm font-mono text-blue-400">{(storyData.confidence * 100).toFixed(0)}%</div>
                            </div>
                        </div>

                        {/* Narrative */}
                        <div className="text-slate-300 leading-relaxed text-sm">
                            {storyData.story_text}
                        </div>

                        {/* Insights */}
                        {storyData.insights && (
                            <div className="bg-slate-800/50 rounded p-3 text-xs text-slate-400 space-y-1">
                                <div className="font-semibold text-slate-300 mb-1">Why this mattered:</div>
                                {storyData.insights.map((insight: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <span className="text-purple-500">•</span>
                                        <span>{insight}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 text-sm italic gap-2">
                        <Sparkles className="text-slate-700" size={32} />
                        <span>Click &ldquo;Generate Recap&rdquo; to get an AI-powered match narrative...</span>
                    </div>
                )}
            </div>
        </Card>
    );
}
