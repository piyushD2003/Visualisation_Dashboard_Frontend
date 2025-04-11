import { create } from "zustand";
import axios from "axios";

const useApiStore = create((set,get) => ({
    selectedFilters: {
        records_number: 90,
        page: 1,
        start_year: "",
        end_year: "",
        intensity: "",
        intensity_min: "",
        intensity_max: "",
        relevance: "",
        likelihood: "",
        likelihood_min: "",
        likelihood_max: "",
        impact: "",
        sector: "",
        topic: "",
        region: "",
        country: "",
        pestle: "",
        source: "",
        swot: "",
    },
    data: [],
    loading: false,

    setFilter: (newFilters) => set((state) => ({
        selectedFilters: { ...state.selectedFilters, ...newFilters }
    })),

    fetchData: async () => {
        set({ loading: true });
        try {
            const { selectedFilters } = get();
            const queryString = new URLSearchParams(selectedFilters).toString();
            console.log(queryString);
            
            const response = await axios.get(`https://visualisation-dashboard-backend.vercel.app/data/dashboard/?action=getIntensity&${queryString}`);
            // const response = await axios.get(`https://visualisation-dashboard-backend.vercel.app/data/dashboard/?action=getIntensity&records_number=90&page=1`);
            
            set({ data: response.data.data, loading: false });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            set({ loading: false });
        }
    },

    overviewdata:{
        avg_intensity: "",
        avg_likelihood: "",
        avg_relevance: "",

        end_year_distribution: [],
        country_distribution: [],
        topic_distribution: [],
        region_distribution: [],

        total_topic: "",
        total_country: "",
        total_region: "",
    },

    fetchOverview: async()=>{
        try {
            const response = await axios.get('https://visualisation-dashboard-backend.vercel.app/data/dashboard/?action=getOverview');
            console.log(response.data);
            
            set({ overviewdata: response.data, loading: false });
            return response.data
        } catch (error) {
            console.error("Error fetching overviewdata:", error);
            set({ loading: false });
        }
    },

    topicDistributionState: [],
    fetchTopicDistribution: async () => {
        const { selectedFilters } = get();
        const queryString = new URLSearchParams(selectedFilters).toString();
        // set((state) => ({ topicDistributionState: ...state.topicDistributionState}));
        try {
            const response = await axios.get(`https://visualisation-dashboard-backend.vercel.app/data/dashboard/?action=getTopicDistribution&${queryString}`);
            console.log("Fetching Topic Distribution:", response.data);

            set({topicDistributionState: response.data});
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.error("Error fetching topic distribution:", error);
            set((state) => ({ topicDistributionState: { ...state.topicDistributionState, loading: false } }));
        }
    },
    
    trendsOverYearsState: { data: [], loading: false },
    fetchTrendsOverYears: async () => {
        const { selectedFilters } = get();
        const queryString = new URLSearchParams(selectedFilters).toString();
        set((state) => ({ trendsOverYearsState: { ...state.trendsOverYearsState, loading: true } }));
        try {
            const response = await axios.get(`https://visualisation-dashboard-backend.vercel.app/data/dashboard/?action=getTrendsOverYears&${queryString}`);
            console.log("Fetching Topic Distribution:", response.data);

            set({ trendsOverYearsState: { data: response.data, loading: false } });
            console.log("ggg",response.data);
            
            return response.data;
        } catch (error) {
            console.error("Error fetching topic distribution:", error);
            set((state) => ({ trendsOverYearsState: { ...state.trendsOverYearsState, loading: false } }));
        }
    },

    worldMapData: [],
    fetchWorldMapData: async () => {
        const { selectedFilters } = get();
        const queryString = new URLSearchParams(selectedFilters).toString();
        try {
            const response = await axios.get(`https://visualisation-dashboard-backend.vercel.app/data/dashboard/?action=getWorldMapData&${queryString}`);
            console.log(response.data.data);
            
            set({ worldMapData: response.data.data });
            return response.data;
        } catch (error) {
            console.error("Error fetching world map data:", error);
        }
    },

    BubblechatData : [],
    fetchBubbleChartData: async () => {     // Add fetchBubbleChartData function
        set({ loading: true });
        try {
            const { selectedFilters } = get();
            const queryString = new URLSearchParams(selectedFilters).toString();

            const response = await axios.get(`https://visualisation-dashboard-backend.vercel.app/data/dashboard/?action=getBubbleChartData&${queryString}`);  // Replace with your actual endpoint
            set({ bubbleChartData: response.data.data, loading: false });
            return response.data;
        } catch (error) {
            console.error("Error fetching bubble chart data:", error);
            set({ loading: false });
        }
    },

    
}));

export default useApiStore;
