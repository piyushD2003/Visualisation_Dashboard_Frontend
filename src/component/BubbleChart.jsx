import React, { useEffect, useState } from "react";
import { Chart } from 'react-chartjs-2';
import {Chart as ChartJS ,BubbleController,CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import useApiStore from "../store/apiStore";
import useFilterStore from "../store/filterStore";
import Navtab from "./Navtab";

ChartJS.register(CategoryScale,BubbleController, LinearScale, PointElement, Title, Tooltip, Legend);

const BubbleChart = ({ detailedView = false }) => {
    const [chartData, setChartData] = useState(null);
    const { setFilter, bubbleChartData, fetchBubbleChartData, selectedFilters } = useApiStore();
    const { filters, fetchFilters, loading } = useFilterStore();
    const [relevanceRange, setRelevanceRange] = useState("");
    const [intensityRange, setIntensityRange] = useState("");

    useEffect(() => {
        fetchFilters();
    }, []);

    const handleSelectFilter = async (key, value) => {
        setFilter({ [key]: value });
    };

    const getRangeValues = (range) => {
        switch (range) {
            case "Low":
                return { min: 0, max: 3 };
            case "Medium":
                return { min: 3, max: 7 };
            case "High":
                return { min: 7, max: 10 };
            default:
                return { min: "", max: "" };  // No range
        }
    };

    const handleRelevanceChange = (range) => {
        setRelevanceRange(range);
        updateFilters(range, intensityRange);
    };

    const handleIntensityChange = (range) => {
        setIntensityRange(range);
        updateFilters(relevanceRange, range);
    };

    const updateFilters = async (relevance, intensity) => {
        let relevanceValues = getRangeValues(relevance);
        let intensityValues = getRangeValues(intensity);

        let newFilters = {
            relevance_min: relevanceValues.min,
            relevance_max: relevanceValues.max,
            intensity_min: intensityValues.min,
            intensity_max: intensityValues.max,
        };

        // Update the filters using setFilter from apiStore
        await setFilter(newFilters);
    };

    useEffect(() => {
        const fetchBubbleData = async () => {
            try {
                const data = await fetchBubbleChartData();

                if (data && data.data) {
                    const processedData = {
                        datasets: [
                            {
                                label: 'Relevance vs Intensity',
                                data: data.data.map(item => ({
                                    x: item.avg_relevance,
                                    y: item.avg_intensity,
                                    r: Math.sqrt(item.event_count) * 2,  // Adjust scaling factor as needed
                                    topic: item.topic,
                                    sector: item.sector,
                                    country: item.country,
                                })),
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',  // Customize color
                            },
                        ],
                    };
                    setChartData(processedData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBubbleData();
    }, [selectedFilters]);

    if (detailedView) {
        return (
            <div className="container">
                {chartData ? (
                    <Chart type='bubble' data={chartData} options={{
                        scales: {
                            x: { title: { display: true, text: 'Relevance' } },
                            y: { title: { display: true, text: 'Intensity' } },
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const dataPoint = context.dataset.data[context.dataIndex];
                                        return [
                                            `Topic: ${dataPoint.topic}`,
                                            `Sector: ${dataPoint.sector}`,
                                            `Country: ${dataPoint.country || 'N/A'}`,
                                            `Relevance: ${dataPoint.x}`,
                                            `Intensity: ${dataPoint.y}`,
                                            `Event Count: ${dataPoint.r * 10}`, // Adjust for scaling
                                        ];
                                    },
                                },
                            },
                        },
                    }} />
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        );
    }

    return (
        <>
            <Navtab />
            <div className="container mt-4">
                <h2 className="mb-4">Relevance vs. Intensity Bubble Chart</h2>
                {/* Chart */}
                {loading ? (
                    <p>Loading chart...</p>
                ) : chartData ? (
                    <Chart type='bubble' data={chartData} options={{
                        scales: {
                            x: { title: { display: true, text: 'Relevance' } },
                            y: { title: { display: true, text: 'Intensity' } },
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const dataPoint = context.dataset.data[context.dataIndex];
                                        return [
                                            `Topic: ${dataPoint.topic}`,
                                            `Sector: ${dataPoint.sector}`,
                                            `Country: ${dataPoint.country || 'N/A'}`,
                                            `Relevance: ${dataPoint.x}`,
                                            `Intensity: ${dataPoint.y}`,
                                            `Event Count: ${dataPoint.r * 10}`, // Adjust for scaling
                                        ];
                                    },
                                },
                            },
                        },
                    }} />
                ) : (
                    <p>No data available.</p>
                )}
                {/* Filters */}
                <nav className="nav nav-pills flex-column flex-sm-row ps-5 ms-4 m-3">
                    {/* Topic Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Topic</a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("topic", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters?.topic?.map((topic, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSelectFilter("topic", topic)}>
                                        {topic}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* Sector Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Sector</a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("sector", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters?.sector?.map((sector, index) => (
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
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Region</a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("region", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters?.region?.map((region, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSelectFilter("region", region)}>
                                        {region}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* Relevance Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Relevance</a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleRelevanceChange("")}>
                                    None
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleRelevanceChange("Low")}>
                                    Low (0-3)
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleRelevanceChange("Medium")}>
                                    Medium (3-7)
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleRelevanceChange("High")}>
                                    High (7-10)
                                </button>
                            </li>
                        </ul>
                    </li>

                    {/* Intensity Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Intensity</a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleIntensityChange("")}>
                                    None
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleIntensityChange("Low")}>
                                    Low (0-5)
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleIntensityChange("Medium")}>
                                    Medium (5-10)
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleIntensityChange("High")}>
                                    High (10-15)
                                </button>
                            </li>
                        </ul>
                    </li>
                </nav>
            </div>
        </>
    );
};

export default BubbleChart;