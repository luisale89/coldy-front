import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Dashboard_index = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);

    return (
        <div className="dashb-container-fluid">Hola Mundo, this will be the index dashboard</div>
    )
}