"use client";

import React, { useEffect, useState } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { AthenaAPI } from '@/app/api/athena';
import { PlayerEmotionProfile, MatchEvent } from '@/types';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Reusing Mocks for static fallback if needed
const MOCK_EVENTS: MatchEvent[] = [
    {
        timestamp: "18.2",
        event_type: "FOUR",
        player: "Richa Ghosh",
        commentary: "Smashed!",
        match_context: { runs_needed: 10, balls_remaining: 10, wickets_left: 5 }
    },
    {
        timestamp: "18.3",
        event_type: "SIX",
        player: "Richa Ghosh",
        commentary: "Huge!",
        match_context: { runs_needed: 4, balls_remaining: 9, wickets_left: 5 }
    },
];

import { useRealtimeEmotion } from '@/hooks/useRealtimeEmotion';

export default function AthletesPage() {
    const [profiles, setProfiles] = useState<PlayerEmotionProfile[]>([]);
    const [loading, setLoading] = useState(true);

    // Subscribe to Real-Time Data
    const { rawData: liveEvents } = useRealtimeEmotion("demo_match_001");

    useEffect(() => {
        if (!liveEvents || liveEvents.length === 0) return;

        // Create a map of latest impact by player
        setProfiles(currentProfiles => {
            if (currentProfiles.length === 0) return currentProfiles;

            const updated = currentProfiles.map(p => {
                // Find latest event for this player
                // We filter descending by time effectively if we just take the last match? 
                // rawData is rebuilt on every snapshot, usually ordered by time asc.
                const playerEvents = liveEvents.filter(e => e.playerId === p.player_name.toLowerCase().replace(" ", "-"));

                if (playerEvents.length > 0) {
                    const lastEvent = playerEvents[playerEvents.length - 1];
                    // Update impact score dynamically
                    return {
                        ...p,
                        average_emotion_impact: parseFloat(lastEvent.emotion_score.toFixed(2)),
                        pressure_performance: (Math.abs(lastEvent.emotion_score) > 0.5 ? "High" : "Medium") as "High" | "Medium" | "Low" // Dynamic override
                    };
                }
                return p;
            });
            return updated;
        });

    }, [liveEvents]);

    useEffect(() => {
        const loadAthletes = async () => {
            try {
                // Extended roster for the dedicated page
                const roster = ["Richa Ghosh", "Smriti Mandhana", "Ellyse Perry", "Harmanpreet Kaur", "Renuka Singh", "Alyssa Healy"];

                // Fetch profiles
                const res = await AthenaAPI.getPlayerProfiles(roster, MOCK_EVENTS, []);

                setProfiles(res || []);
            } catch (error) {
                console.error("Failed to load athletes", error);
                toast.error("Failed to load player intelligence.");
            } finally {
                setLoading(false);
            }
        };

        loadAthletes();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="animate-spin text-purple-500" size={48} />
                <span className="ml-4 text-slate-400">Loading Intelligence Profiles...</span>
            </div>
        );
    }

    return (
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
                    No athlete data found. Run a match simulation to generate intelligence.
                </div>
            )}
        </div>
    );
}
