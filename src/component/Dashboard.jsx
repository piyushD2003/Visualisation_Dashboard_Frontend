import React from "react";
import Intensity from "./Intensity";
import { useNavigate } from "react-router-dom";
import Overview from "./Overview";
import TopicDistribution from "./TopicDistribution";
import TrendsOverYears from "./TrendsOverYears";
import Heatmap from "./Heatmap";
import BubbleChart from "./BubbleChart"; // Corrected import
import Navtab from "./Navtab";
const Dashboard = () => {
    const navigate = useNavigate();

    return (<>
                <Navtab />
        <div className="container mt-4">
            <div className="mx-auto mb-4">
                    <Overview />
            </div>
            <div
                className="card dashboard-card mx-auto mb-4"
                style={{ maxWidth: "900px", cursor: "pointer" }}
                onClick={() => navigate("/intensity")}
                >
                <div className="card-body">
                    <Intensity detailedView={true} />
                </div>
            </div>

            <div className="row justify-content-center">
                <div
                    className="col-md-6"
                    style={{ maxWidth: "450px", cursor: "pointer" }}
                    onClick={() => navigate("/topicdistribution")}
                    >
                    <div className="card dashboard-card mb-4">
                        <div className="card-body">
                            <TopicDistribution detailedView={true} />
                        </div>
                    </div>
                </div>
                <div
                    className="col-md-6"
                    style={{ maxWidth: "450px", cursor: "pointer" }}
                    onClick={() => navigate("/trendsoveryears")}
                    >
                    <div className="card dashboard-card mb-4">
                        <div className="card-body">
                            <TrendsOverYears detailedView={true} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="card dashboard-card mx-auto mb-4"
                style={{ maxWidth: "900px", cursor: "pointer" }}
                onClick={() => navigate("/heatmap")}
                >
                <div className="card-body">
                    <Heatmap detailedView={true} />
                </div>
            </div>
            <div
                className="card dashboard-card mx-auto mb-4"
                style={{ maxWidth: "900px", cursor: "pointer" }}
                onClick={() => navigate("/bubblechart")}
                >
                <div className="card-body">
                    <BubbleChart detailedView={true} />
                </div>
            </div>
        </div>
                </>
    );
};

export default Dashboard;