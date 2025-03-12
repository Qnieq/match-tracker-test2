import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useMatchesStore } from 'store/useMatchesStore';

import MatchItem from '../../shared/match-items/MatchItem';
import { Match } from 'types/match.types';
import { statusConvert } from './statusConvert';
import { matchWebSocket } from 'components/shared/websockets/matchWebSocket';

const MatchTracker: React.FC = () => {
    const { matches, selectedStatus, fetchMatches } = useMatchesStore();

    useEffect(() => {
        fetchMatches();
        const ws = matchWebSocket();
        return () => {
            ws.close();
        };
    }, []);

    const filteredMatch = useMemo(() => {
        return matches?.filter((match: Match) => {
            if (selectedStatus === "All") return true;
            return statusConvert(match.status).status === selectedStatus;
        }) ?? [];
    }, [matches, selectedStatus]);


    const matchList = useMemo(() => {
        return filteredMatch?.map(match => (
            <MatchItem key={match.title + match.time} match={match} />
        ));
    }, [matches, filteredMatch]);

    return (
        <View className="flex flex-col gap-3">
            {matches && matchList}
        </View>
    );
};
export default MatchTracker;
