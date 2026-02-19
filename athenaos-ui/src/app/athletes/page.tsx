"use client";

import React, { useEffect, useState } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { PlayerEmotionProfile } from '@/types';
import { Loader2 } from 'lucide-react';
import { MOCK_PLAYER_PROFILES } from '@/app/api/mockData';

export default function AthletesPage() {
    const [profiles, setProfiles] = useState<PlayerEmotionProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use mock profiles directly — the new backend focuses on match analysis
        // Player intelligence cards are demo data for the Athletes page
        setProfiles(MOCK_PLAYER_PROFILES as unknown as PlayerEmotionProfile[]);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e1a] flex h-[80vh] items-center justify-center">
                <Loader2 className="animate-spin text-purple-500" size={48} />
                <span className="ml-4 text-slate-400">Loading Intelligence Profiles...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            <div className="max-w-7xl mx-auto p-6 pb-20">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-3">
                        Athlete Intelligence
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        AthenaOS tracks psychological resilience, pressure performance, and emotional impact in real-time.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map(p => (
                        <PlayerCard key={p.player_name} profile={p} />
                    ))}
                </div>

                {profiles.length === 0 && (
                    <div className="text-center text-slate-500 mt-20">
                        No athlete data found.
                    </div>
                )}
            </div>
        </div>
    );
}
