import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        "0": " #6571FF",
        "1.0": "#6571FF",
    },
    shadowBlur: 0,
    barThickness: 2
});

const TopProgressBar = (props) => {
    const { isLoading } = props;
    return isLoading ? <TopBarProgress/> : null;
}

export default TopProgressBar;
