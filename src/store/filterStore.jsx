import { create } from "zustand";
import axios from "axios";

const useFilterStore = create((set) => ({
    filters: {
        intensity_range:{},
        likelihood_range:{},
        end_year: [],
        topic: [],
        region: [],
        country:[],
        sector:[],
        pestle:[],
        source:[],
        swot:[]
    },

    loading: false,

    fetchFilters: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("https://visualisation-dashboard-backend.vercel.app/data/dashboard/?action=getFilter");
            console.log(response.data);
            
            set({ filters: response.data, loading: false });
            return response.data
        } catch (error) {
            console.error("Error fetching filters:", error);
            set({ loading: false });
        }
    },
}));

export default useFilterStore;
