import React, { useEffect, useState } from "react";

import { FaGlobe, FaChartBar, FaBolt, FaBalanceScale } from "react-icons/fa"; // Icons for visualization
import useApiStore from "../store/apiStore"; // Fetching data from the store

const Overview = () => {
    const { overviewdata,fetchOverview } = useApiStore(); 
    
    useEffect(() => {
        fetchOverview();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Country Coverage */}
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center shadow p-3 rounded">
                        <FaGlobe className="fs-1 text-primary" />
                        <h3 className="fw-bold mt-2">{overviewdata.total_country||0}</h3>
                        <p className="text-muted">Countries Covered</p>
                    </div>
                </div>

                {/* Topics Analyzed */}
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center shadow p-3 rounded">
                        <FaChartBar className="fs-1 text-success" />
                        <h3 className="fw-bold mt-2">{overviewdata.total_topic||0}</h3>
                        <p className="text-muted">Total Topics Analyzed</p>
                    </div>
                </div>

                {/* Average Intensity */}
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center shadow p-3 rounded">
                        <FaBolt className="fs-1 text-warning" />
                        <h3 className="fw-bold mt-2">{Math.round(overviewdata.avg_intensity * 100) / 100}</h3>
                        <p className="text-muted">Average Intensity</p>
                    </div>
                </div>

                {/* Average Likelihood */}
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center shadow p-3 rounded">
                        <FaBalanceScale className="fs-1 text-danger" />
                        <h3 className="fw-bold mt-2">{Math.round(overviewdata.avg_likelihood * 100) / 100}</h3>
                        <p className="text-muted">Average Likelihood</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
