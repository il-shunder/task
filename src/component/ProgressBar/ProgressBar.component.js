import React, { Component } from "react";
import "./ProgressBar.style.scss";
import check from "./check.svg";

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = { width: window.innerWidth };
    }

    render() {
        if (this.props.steps.length < 2) return null;
        let isActive = true;
        const lineWidth = (this.state.width - this.props.steps.length * 80) / this.props.steps.length;
        return (
            <div className="progressbar">
                <div className="progressbar__row">
                    {this.props.steps.map((el, i) => {
                        if (i > this.props.active) isActive = false;
                        return (
                            <>
                                <div className={isActive ? "progressbar__prev active" : "progressbar__prev"} style={{ width: lineWidth }}>
                                    <div className="progressbar__line"></div>
                                    <span></span>
                                </div>
                                <div className={isActive ? `progressbar__item active ${i < this.props.active ? "checked" : ""}` : "progressbar__item"} key={i}>
                                    <div className="progressbar__body">
                                        {i < this.props.active ? <img src={check} alt="" /> : i + 1}
                                        <div className="progressbar__name">{el}</div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ProgressBar;
