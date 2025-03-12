import { fetchMatchesAPI } from "components/shared/api/matchApi";
import { Match } from "types/match.types";
import { create } from "zustand";

interface MatchStore {
    loading: boolean;
    error: string | null;
    matches: Match[];
    selectedStatus: "All" | "Live" | "Finished" | "Match preparing";
    selectedMatch: Match | null;
    lastFetched: number | null;
    fetchMatches: (force?: boolean) => Promise<void>;
    setMatches: (matches: Match[]) => void;
    setMatchesByWS: (matches: Match[]) => void;
    selectMatch: (match: Match | null) => void;
    selectStatus: (status: "All" | "Live" | "Finished" | "Match preparing") => void;
}

export const useMatchesStore = create<MatchStore>((set, get) => ({
    loading: false,
    error: null,
    matches: [],
    selectedStatus: "All",
    selectedMatch: null,
    fetchMatches: async (force = false) => {
        const { lastFetched, matches } = get();
        // Если данные уже загружены и не старше 60 сек, не делаем повторный запрос (если не принудительно)
        if (!force && matches && lastFetched && Date.now() - lastFetched < 60000) {
            return;
        }
        set({ loading: true, error: null });
        try {
            const data = await fetchMatchesAPI();
            set({ matches: data, loading: false, lastFetched: Date.now() });
        } catch (error) {
            console.error(error);
            set({ error: "Ошибка: не удалось загрузить информацию", loading: false });
        }
    },
    setMatches: (matches) => {
        if (JSON.stringify(matches) !== JSON.stringify(get().matches)) {
            set({ matches });
        }
    },
    selectMatch: (match) => {
        set({ selectedMatch: match! })
    },
    setMatchesByWS: (matches) => {
        const { selectedMatch, selectMatch } = get();

        if (JSON.stringify(matches) !== JSON.stringify(get().matches)) {
            set({ matches });
        }

        if (selectedMatch) {
            const filteredMatches = matches.filter((match: Match) => {
                if (match.title === selectedMatch.title) return true;
            })
            selectMatch(filteredMatches[0] || null)
        }
    },
    selectStatus: (status) => set({ selectedStatus: status }),
    lastFetched: null,
}));
