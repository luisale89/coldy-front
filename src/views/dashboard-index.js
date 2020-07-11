import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Dashboard_index = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);

    return (
        <div className="dashb-container-fluid">
            Hola Mundo, this will be the index dashboard
            <button className="btn btn-primary">button1</button>
            <button className="btn btn-success">button1</button>
            <button className="btn btn-danger">button1</button>
            <button className="btn btn-warning">button1</button>
            <button className="btn btn-info">button1</button>
            <button className="btn btn-outline-primary">button1</button>
            <button className="btn btn-outline-success">button1</button>
            <button className="btn btn-outline-warning">button1</button>
            <button className="btn btn-outline-danger">button1</button>
            <button className="btn btn-outline-info">button1</button>
        </div>
    )
}