import React, { useEffect, useState } from "react";
import { Chart as ChartJS, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2"; // Import Line chart
import useApiStore from "../store/apiStore";
import useFilterStore from "../store/filterStore";
import Navtab from "./Navtab";

ChartJS.register(MatrixController, MatrixElement, LinearScale, CategoryScale, Tooltip, Legend);

const Heatmap = ({ detailedView = false }) => {
    const [chartData, setChartData] = useState(null);
    const [lineChartData, setLineChartData] = useState(null); // State for Line Chart
    const { setFilter, worldMapData, fetchWorldMapData, fetchLineChartData, selectedFilters } = useApiStore(); // Assuming you have fetchLineChartData in apiStore
    const { filters, fetchFilters, loading } = useFilterStore();
    const metrics = [
        "total_events",
        "avg_intensity",
        "avg_likelihood",
        "most_common_sector",
        "most_common_topic",
        "pestle_distribution",
    ];

    useEffect(() => {
        fetchFilters();
    }, []);

    const handleSelectFilter = async (key, value) => {
        setFilter({ [key]: value });
    };

    useEffect(() => {
        const fetchHeatmapData = async () => {
            try {
                const data = await fetchWorldMapData();

                if (data && data.data) {
                    const processedData = [];
                    data.data.forEach(item => {
                        metrics.forEach(metric => {
                            processedData.push({
                                x: item.country,
                                y: metric,
                                d: item[metric] || 0,
                                value: item[metric] || 0
                            });
                        });
                    });

                    setChartData({
                        datasets: [
                            {
                                label: "Event Heatmap",
                                data: processedData,
                                backgroundColor: (ctx) => {
                                    const value = ctx.dataset.data[ctx.dataIndex].d;
                                    const alpha = Math.min(1, value / 15);
                                    return `rgba(255, 0, 0, ${alpha})`;
                                },
                                borderWidth: 0,
                                width: 50,
                                height: 25,
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchTrendsData = async () => {
            try {
                const data = await fetchLineChartData();  // Assuming fetchLineChartData is in your apiStore
                if (data && data.data) {
                    // Process line chart data as needed
                    const labels = data.data.map(item => item.year); // Example: Assuming your API returns year
                    const values = data.data.map(item => item.value);   // Example: Assuming your API returns value

                    setLineChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: "Trends Over Years",
                                data: values,
                                fill: false,
                                borderColor: "rgb(75, 192, 192)",
                                tension: 0.1
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error fetching trends data:", error);
            }
        };


        fetchHeatmapData();
    }, [selectedFilters]);

    if(detailedView){
        return(
            <div className="container">
                {chartData ? (
                    <Chart type="matrix" data={chartData} options={{
                        scales: {
                            x: {
                                type: "category",
                                title: { display: true, text: "Country" },
                                labels: [...new Set(chartData.datasets[0].data.map(item => item.x))],
                                ticks: {
                                    callback: function (value, index, values) {
                                        const label = this.getLabelForValue(value);
                                        return label.length > 10 ? label.substring(0, 10) + '...' : label;
                                    },
                                    font: {
                                        size: 10
                                    },
                                    maxRotation: 90,
                                    minRotation: 90,
                                    autoSkip: false,

                                },
                                categoryPercentage: 0.9,
                                barPercentage: 0.9
                            },
                            y: {
                                type: "category",
                                title: { display: true, text: "Metric", font: { size: '1em' }  },
                                labels: metrics,
                                offset: false
                            },
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                bodyFont: { size: '1em' },  // Relative font size for tooltip
                                titleFont: { size: '1.1em' },
                                callbacks: {
                                    label: (context) => {
                                        const dataset = context.dataset;
                                        const dataPoint = dataset.data[context.dataIndex];
                                        return `${dataPoint.y.valueOf()}: ${dataPoint.value}`;
                                    }
                                }
                            }
                        },
                    }} />
                ) : (
                    <p>Loading heatmap...</p>
                )}
            </div>
        )
    }

    return (
        <>
        <Navtab />
        <div className="container mt-4">
            <h2 className="mb-4">World Event Heatmap</h2>

            <div className="filters">
                {/*<Dropdown label="End Year" options={filters.end_year} selected={selectedFilters.end_year} onChange={(val) => handleSelectFilter("end_year", val)} />
                <Dropdown label="Topic" options={filters.topic} selected={selectedFilters.topic} onChange={(val) => handleSelectFilter("topic", val)} />
                <Dropdown label="Region" options={filters.region} selected={selectedFilters.region} onChange={(val) => handleSelectFilter("region", val)} />*/}
            </div>

            {chartData ? (
                <div style={{overflowX:"auto"}}>
                    <div style={{ width: "2500px", height: "500px"}}>
                    <Chart type="matrix" data={chartData} options={{
                        scales: {
                            x: {
                                type: "category",
                                title: { display: true, text: "Country" },
                                labels: [...new Set(chartData.datasets[0].data.map(item => item.x))],
                                ticks: {
                                    callback: function (value, index, values) {
                                        const label = this.getLabelForValue(value);
                                        return label.length > 10 ? label.substring(0, 10) + '...' : label;
                                    },
                                    font: {
                                        size: 10
                                    },
                                    maxRotation: 90,
                                    minRotation: 90,
                                    autoSkip: false,

                                },
                                categoryPercentage: 0.9,
                                barPercentage: 0.9,
                            },
                            y: {
                                type: "category",
                                title: { display: true, text: "Metric" },
                                labels: metrics,
                                offset: false
                            },
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const dataset = context.dataset;
                                        const dataPoint = dataset.data[context.dataIndex];
                                        return `${dataPoint.y.valueOf()}: ${dataPoint.value}`;
                                    }
                                }
                            }
                        },
                    }} />
                </div>
                </div>
            ) : (
                <p>Loading heatmap...</p>
            )}

            {/* Line Chart Section */}
            <div className="container mt-4">

                {/* Filters */}
                <nav className="nav nav-pills flex-column flex-sm-row ps-5 ms-4 m-3">
                    {/* Country Filter */}
                    <li className="nav-item dropdown flex-sm-fill text-sm-center">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Country</a>
                        <ul className="dropdown-menu overflow-auto" style={{ maxHeight: "250px",maxWidth:"2000px", overflowY: "auto" }}>
                            <li>
                                <button className="dropdown-item" onClick={() => handleSelectFilter("country", "")}>
                                    None
                                </button>
                            </li>
                            {loading ? <li>Loading...</li> : filters?.country?.map((country, index) => (  // Use optional chaining
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
                            {loading ? <li>Loading...</li> : filters?.region?.map((region, index) => ( // Use optional chaining
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
                            {loading ? <li>Loading...</li> : filters?.sector?.map((sector, index) => ( // Use optional chaining
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
                            {loading ? <li>Loading...</li> : filters?.topic?.map((topic, index) => ( // Use optional chaining
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
        </div>
                        </>
    );
};

export default Heatmap;