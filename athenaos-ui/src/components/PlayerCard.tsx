import React from 'react';
import { PlayerEmotionProfile } from '@/types';
import { Shield, Activity } from 'lucide-react';

interface Props {
    profile: PlayerEmotionProfile;
}

export default function PlayerCard({ profile: p }: Props) {
    return (
        <div className="group bg-slate-900/60 hover:bg-slate-900/90 transition-all p-4 rounded-xl border border-slate-800 hover:border-purple-500/30 shadow-sm hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg
                        ${p.player_name.includes('India') ? 'bg-gradient-to-br from-blue-600 to-blue-400' : 'bg-gradient-to-br from-yellow-500 to-yellow-600'}
                        bg-slate-800 border border-slate-700`}>
                        {p.player_name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg leading-tight group-hover:text-purple-400 transition-colors">{p.player_name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <Activity size={12} className="text-slate-500" />
                            <span className={`text-xs uppercase font-bold tracking-wide ${p.pressure_performance === 'High' ? 'text-green-400' : 'text-yellow-400'}`}>
                                {p.pressure_performance} Pressure
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Impact</div>
                    <div className="text-2xl font-bold text-white leading-none">{p.average_emotion_impact}</div>
                </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/50">
                <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span className="flex items-center gap-1.5 font-medium"><Shield size={12} className="text-blue-400" /> Resilience Score</span>
                        <span className="font-mono text-slate-300">{(p.resilience_score * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 shadow-[0_0_8px_theme(colors.blue.500)]"
                            style={{ width: `${p.resilience_score * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
