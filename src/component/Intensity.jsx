import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import useApiStore from "../store/apiStore";
import useFilterStore from "../store/filterStore";
import Navtab from "./Navtab"; // Import Navtab

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Intensity = ({ detailedView = false }) => {
    const [chartData, setChartData] = useState(null);
    const { setFilter, fetchData, selectedFilters } = useApiStore();
    const { filters, fetchFilters, loading } = useFilterStore();

    useEffect(() => {
        fetchFilters();
    }, []);

    const handleSelectFilter = async (key, value) => {
        setFilter({ [key]: value });
    };

    useEffect(() => {
        const fetchIntensityData = async () => {
            try {
                const data = await fetchData();
                console.log(data);

                if (data && data.data) {
                    const processedData = data.data.map(item => ({
                        country: item.country || "Unknown",
                        avg_intensity: item.avg_intensity,
                    }));

                    setChartData({
                        labels: processedData.map(item => item.country),
                        datasets: [
                            {
                                label: "Average Intensity",
                                data: processedData.map(item => item.avg_intensity),
                                backgroundColor: "rgba(75, 192, 192, 0.6)",
                                maxBarThickness: 40
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchIntensityData();
    }, [selectedFilters]);

    if (detailedView) {
        return (
            <div className="container">
                {chartData ? (
                    <Bar
                        data={chartData}
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            plugins: {
                                legend: { display: true },
                                title: { display: true, text: "Detailed Intensity by Country" }
                            },
                            scales: {
                                x: { beginAtZero: true },
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
                <h2>Detailed Intensity Visualization</h2>
                {chartData ? (
                    <Bar
                        data={chartData}
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            plugins: {
                                legend: { display: false },
                            },
                            scales: {
                                x: { beginAtZero: true },
                                y: {
                                    ticks: {
                                        autoSkip: false,
                                        font: {
                                            size: 10,
                                        },
                                    }
                                }
                            }
                        }}
                    />
                ) : (
                    <p>Loading chart...</p>
                )}
                <nav className="nav nav-pills flex-column flex-sm-row ps-5 ms-4 m-3">
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">End Year</a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("end_year", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters?.end_year?.map((year, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSelectFilter("end_year", year)}>
                                        {year}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Topic</a>
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
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Region</a>
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
                </nav>
            </div>
        </>
    );
};

export default Intensity;