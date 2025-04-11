import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import useApiStore from "../store/apiStore";
import useFilterStore from "../store/filterStore";
import Navtab from "./Navtab";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendsOverYears = ({ detailedView = false }) => {
    const [chartData, setChartData] = useState(null);
    const { setFilter, fetchTrendsOverYears, selectedFilters } = useApiStore();
    const { filters, fetchFilters, loading } = useFilterStore();

    useEffect(() => {
        fetchFilters();
    }, []);

    const handleSelectFilter = async (key, value) => {
        setFilter({ [key]: value });
    };

    useEffect(() => {
        const fetchTrendsData = async () => {
            try {
                const data = await fetchTrendsOverYears();
                console.log(data);

                if (data && data.data) {
                    const processedData = data.data.map(item => ({
                        year: item.year,
                        avg_intensity: item.avg_intensity,
                        avg_likelihood: item.avg_likelihood,
                        avg_relevance: item.avg_relevance
                    }));

                    setChartData({
                        labels: processedData.map(item => item.year),
                        datasets: [
                            {
                                label: "Avg Intensity",
                                data: processedData.map(item => item.avg_intensity),
                                borderColor: "rgba(255, 99, 132, 1)",
                                backgroundColor: "rgba(255, 99, 132, 0.2)",
                                tension: 0.4
                            },
                            {
                                label: "Avg Likelihood",
                                data: processedData.map(item => item.avg_likelihood),
                                borderColor: "rgba(54, 162, 235, 1)",
                                backgroundColor: "rgba(54, 162, 235, 0.2)",
                                tension: 0.4
                            },
                            {
                                label: "Avg Relevance",
                                data: processedData.map(item => item.avg_relevance),
                                borderColor: "rgba(75, 192, 192, 1)",
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                                tension: 0.4
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error fetching trends data:", error);
            }
        };

        fetchTrendsData();
    }, [selectedFilters]);

    if (detailedView) {
        return (
            <div className="container">
                {chartData ? (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: true },
                            title: { display: true, text: "Trends Over Years" }
                        },
                        scales: {
                            x: { beginAtZero: true },
                            y: { beginAtZero: true }
                        }
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
        <div className="container mt-4">
            <h2 className="mb-4">Trends Over Years</h2>
            <div className="d-flex justify-content-center align-items-center">
                {chartData ? (
                    <div style={{ maxWidth: "900px", width: "100%", height: "400px" }}>
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: true },
                                    title: { display: true, text: "Trends Over Years" }
                                },
                                scales: {
                                    x: { beginAtZero: true },
                                    y: { beginAtZero: true }
                                }
                            }}
                        />
                    </div>
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>

            {/* Filters */}
            <nav className="nav nav-pills flex-column flex-sm-row ps-5 ms-4 m-3">
                {/* Country Filter */}
                <li className="nav-item dropdown flex-sm-fill text-sm-center">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Country</a>
                    <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                        <li>
                            <button className="dropdown-item" onClick={() => handleSelectFilter("country", "")}>
                                None
                            </button>
                        </li>
                        {loading ? <li>Loading...</li> : filters?.country?.map((country, index) => (
                            <li key={index}>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("country", country)}>
                                    {country}
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
            </nav>
        </div>
                        </>
    );
};

export default TrendsOverYears;