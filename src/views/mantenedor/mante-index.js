import React, { useContext } from "react";
import { Context } from "../../store/appContext";

export const ManteIndex = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);

    return (
        <div className="index-container">
            <div className="row">
                <div className="col-md-3">...</div>
                <div className="col-md-9">...</div>
            </div>
            <div className="row">
                <div className="col-lg-12">...</div>
            </div>
            <button type="button" className="btn btn-primary">button1</button>
            <button className="btn btn-success">button2</button>
            <button className="btn btn-danger">button2</button>
            <button className="btn btn-warning">button1</button>
            <button className="btn btn-info">button1</button>
            <button className="btn btn-outline-primary">button2</button>
            <button className="btn btn-outline-info">button1</button>
        </div>
    )
}