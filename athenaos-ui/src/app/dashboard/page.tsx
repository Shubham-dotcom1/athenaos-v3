"use client";

import { useEffect, useState } from 'react';
import { AthenaAPI } from '@/app/api/athena';
import EmotionalTimeline from '@/components/EmotionalTimeline';
import KeyMoments from '@/components/KeyMoments';

import FanGame from '@/components/FanGame';
import PlayerInsights from '@/components/PlayerInsights';
import MatchNarrativeStrip from '@/components/MatchNarrativeStrip';
import RoleSelector from '@/components/RoleSelector';
import CollectiveSentiment from '@/components/CollectiveSentiment';
import EmotionReplay from '@/components/EmotionReplay';
import PredictionCard from '@/components/PredictionCard';
import { RoleProvider, useRole } from '@/contexts/RoleContext';
import { Loader2 } from 'lucide-react';
import { MatchInfo, MatchEvent, KeyMoments as KeyMomentsType, EmotionalTimelineResponse, PlayerEmotionProfile } from '@/types';
import MatchController from '@/components/MatchController';
import { useRealtimeEmotion } from '@/hooks/useRealtimeEmotion';

// Mock Data for Initial Load Simulation
const MOCK_MATCH_INFO: MatchInfo = {
    sport: "cricket",
    category: "women",
    teams: ["India Women", "Australia Women"],
    venue: "Wankhede Stadium",
    match_type: "T20"
};

const MOCK_EVENTS: MatchEvent[] = [
    { timestamp: "1.1", event_type: "DOT", player: "Smriti Mandhana", bowler: "Schutt", commentary: "Good length ball, defended.", match_context: { innings: 2, runs_needed: 160, balls_remaining: 119, wickets_left: 10 } },
    { timestamp: "1.2", event_type: "FOUR", player: "Smriti Mandhana", bowler: "Schutt", commentary: "Beautiful cover drive for four!", match_context: { innings: 2, runs_needed: 156, balls_remaining: 118, wickets_left: 10 } },
    { timestamp: "1.3", event_type: "DOT", player: "Smriti Mandhana", bowler: "Schutt", commentary: "No run.", match_context: { innings: 2, runs_needed: 156, balls_remaining: 117, wickets_left: 10 } },
    { timestamp: "2.1", event_type: "WICKET", player: "Shafali Verma", bowler: "Gardner", commentary: "OUT! Caught at mid-off.", match_context: { innings: 2, runs_needed: 154, balls_remaining: 112, wickets_left: 9 } },
    { timestamp: "2.4", event_type: "SIX", player: "Harmanpreet Kaur", bowler: "Gardner", commentary: "Massive six over long on! Captain leading from front.", match_context: { innings: 2, runs_needed: 145, balls_remaining: 108, wickets_left: 9 } },
    { timestamp: "3.2", event_type: "FOUR", player: "Ellyse Perry", bowler: "Renuka Singh", commentary: "Classic Perry drive through the covers.", match_context: { innings: 1, runs_needed: 0, balls_remaining: 0, wickets_left: 0 } },
    { timestamp: "3.5", event_type: "DOT", player: "Harmanpreet Kaur", bowler: "Perry", commentary: "Pressure building here.", match_context: { innings: 2, runs_needed: 140, balls_remaining: 100, wickets_left: 9 } },
    { timestamp: "4.1", event_type: "WICKET", player: "Alyssa Healy", bowler: "Renuka Singh", commentary: "Clean bowled! Renuka strikes early!", match_context: { innings: 1, runs_needed: 0, balls_remaining: 0, wickets_left: 0 } },
    { timestamp: "4.2", event_type: "FOUR", player: "Harmanpreet Kaur", bowler: "Perry", commentary: "Release shot! Four runs.", match_context: { innings: 2, runs_needed: 136, balls_remaining: 95, wickets_left: 9 } },
    { timestamp: "14.2", event_type: "SIX", player: "Ashleigh Gardner", bowler: "Deepti Sharma", commentary: "Powerful strike down the ground!", match_context: { innings: 1, runs_needed: 0, balls_remaining: 0, wickets_left: 0 } },
    { timestamp: "15.4", event_type: "DOT", player: "Deepti Sharma", bowler: "Gardner", commentary: "Tight bowling keeps the pressure on.", match_context: { innings: 2, runs_needed: 45, balls_remaining: 26, wickets_left: 5 } },
    { timestamp: "18.1", event_type: "WICKET", player: "Harmanpreet Kaur", bowler: "Gardner", commentary: "Heartbreak! She is gone.", match_context: { innings: 2, runs_needed: 10, balls_remaining: 11, wickets_left: 3 } },
    { timestamp: "18.5", event_type: "SIX", player: "Richa Ghosh", bowler: "Gardner", commentary: "SHE SMASHES IT! WHAT A HIT!", match_context: { innings: 2, runs_needed: 2, balls_remaining: 7, wickets_left: 3 } }
];

function DashboardContent() {
    const { role } = useRole();
    // Realtime Hook
    const { realtimeData: realtimeTimeline } = useRealtimeEmotion("demo_match_001");

    const [loading, setLoading] = useState(true);
    const [timelineData, setTimelineData] = useState<EmotionalTimelineResponse | null>(null);
    const [playerProfiles, setPlayerProfiles] = useState<PlayerEmotionProfile[]>([]);
    const [matchInfo] = useState<MatchInfo>(MOCK_MATCH_INFO);

    const [replayTime, setReplayTime] = useState(0);

    useEffect(() => {
        const initData = async () => {
            try {
                // 1. Analyze Emotion
                const timelineRes = await AthenaAPI.analyzeEmotion(MOCK_MATCH_INFO, MOCK_EVENTS);
                setTimelineData(timelineRes);

                // 2. Get Player Profiles
                const players = ["Smriti Mandhana", "Harmanpreet Kaur", "Richa Ghosh", "Shafali Verma", "Ellyse Perry", "Ashleigh Gardner", "Renuka Singh", "Deepti Sharma", "Alyssa Healy"];
                const profilesRes = await AthenaAPI.getPlayerProfiles(players, MOCK_EVENTS, timelineRes.timeline);
                setPlayerProfiles(profilesRes);

            } catch (e) {
                console.error("Failed to load dashboard data", e);
            } finally {
                setLoading(false);
            }
        };

        initData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
                <Loader2 className="animate-spin text-purple-500" size={48} />
                <span className="ml-4 text-xl font-light">Analyzing Neural Signals...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <MatchNarrativeStrip />

            <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            {matchInfo.teams[0]} vs {matchInfo.teams[1]}
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">{matchInfo.venue} • {matchInfo.match_type}</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-end gap-3">
                        <RoleSelector />
                        <div className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs animate-pulse">
                            High Pressure Detected
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 items-start">

                    {/* Left Column: Main Content */}
                    <div className="flex flex-col gap-6 min-w-0">
                        {/* Key Moments */}
                        {timelineData && role !== 'analyst' && <KeyMoments moments={timelineData.key_moments} />}

                        {/* Timeline */}
                        {/* Use Realtime Data if available, otherwise mock */}
                        {realtimeTimeline && realtimeTimeline.length > 0 ? (
                            <EmotionalTimeline data={realtimeTimeline} />
                        ) : (
                            timelineData && <EmotionalTimeline data={timelineData.timeline} />
                        )}

                        {/* Player Insights */}
                        <PlayerInsights profiles={playerProfiles} />

                        {/* Replay Bar (Anchored) */}
                        <div className="sticky bottom-6 z-10">
                            <EmotionReplay replayTime={replayTime} onTimeUpdate={setReplayTime} />
                        </div>
                    </div>

                    {/* Right Column: AI Story & Insights */}
                    <div className="flex flex-col gap-6 w-full">
                        {timelineData && role !== 'fan' && <PredictionCard timeline={timelineData.timeline} />}

                        <CollectiveSentiment />

                        {role === 'fan' && <FanGame />}


                    </div>
                </div>
            </div>

            {/* Real-time Match Simulator (Hidden/Admin) */}
            <MatchController />
        </div>
    );
}

export default function Dashboard() {
    return (
        <RoleProvider>
            <DashboardContent />
        </RoleProvider>
    );
}
