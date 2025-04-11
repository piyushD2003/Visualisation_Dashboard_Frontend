import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import useApiStore from "../store/apiStore";
import useFilterStore from "../store/filterStore";
import Navtab from "./Navtab";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopicDistribution = ({ detailedView = false }) => {
    const [chartData, setChartData] = useState(null);
    const { fetchTopicDistribution, topicDistributionState, setFilter ,selectedFilters} = useApiStore();
    const { filters, fetchFilters, loading } = useFilterStore();

    useEffect(() => {
        fetchTopicDistribution()
        fetchFilters(); // Fetch available filter options
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTopicDistribution();
                
                if (data && data.data) {
                    const processedData = data.data.map(item => ({
                        topic: item.topic || "Unknown",
                        count: item.count,
                    }));

                    setChartData({
                        labels: processedData.map(item => item.topic),
                        datasets: [
                            {
                                label: "Topic Distribution",
                                data: processedData.map(item => item.count),
                                backgroundColor: [
                                    "#FF6384", "#36A2EB", "#FFCE56",
                                    "#4BC0C0", "#9966FF", "#FF9F40"
                                ],
                                hoverOffset: 10,
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error fetching topic distribution:", error);
            }
        };

        fetchData();
    }, [selectedFilters]); // Re-fetch on filter change

    const handleSelectFilter = async (key, value) => {
        setFilter({ [key]: value });
    };

    if (detailedView) {
        return (
            <div>
                {chartData ? (
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "right",
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (tooltipItem) => {
                                            let value = tooltipItem.raw || 0;
                                            return ` ${tooltipItem.label}: ${value}`;
                                        },
                                    },
                                },
                            },
                        }}
                    />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        );
    }
    return (
        <>
        <Navtab />
            <div className="container mt-4" style={{ width: "800px" }}>
                <h2>Topic Distribution</h2>
                {chartData ? (
                    <div style={{width: "600px", overflowX:"auto"}}>
                    <div style={{minWidth: "1000px", minHeight:"500px"}}>
                        <Pie
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: "right", // Adjust legend position
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (tooltipItem) => {
                                                let value = tooltipItem.raw || 0;
                                                return ` ${tooltipItem.label}: ${value}`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                    </div>
                ) : (
                    <p>Loading chart...</p>
                )}

                {/* FILTER DROPDOWNS */}
                <nav className="nav nav-pills flex-column flex-sm-row ps-5 ms-4 m-3">
                    {/* Sector Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                            Sector
                        </a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("sector", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters.sector.map((sector, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSelectFilter("sector", sector)}>
                                        {sector}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* Region Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                            Region
                        </a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("region", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters.region.map((region, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSelectFilter("region", region)}>
                                        {region}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* Country Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                            Country
                        </a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("country", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters.country.map((country, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSelectFilter("country", country)}>
                                        {country}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* PEST Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                            PEST
                        </a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("pestle", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters.pestle.map((pest, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSelectFilter("pestle", pest)}>
                                        {pest}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* SWOT Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                            SWOT
                        </a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("swot", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters.swot.map((swot, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSelectFilter("swot", swot)}>
                                        {swot}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                </nav>
            </div>
        </>
    );
};

export default TopicDistribution;
