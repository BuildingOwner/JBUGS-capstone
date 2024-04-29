import { useEffect } from "react";
import "./WeekItem.css"

const WeekItem = (props) => {
    // useEffect(() => {
    //     console.log(props)
    // })
    return (
        <div className="week-item">
            <b className="search-engine">{props.weekNumber}</b>
            <div className="generator-wrapper">
                <div className="generator" />
            </div>
        </div>
    );
}

export default WeekItem;