import React, { useContext } from "react";
import { Context } from '../store/appContext';

export const Home1 = () => {

    const {store, actions} = useContext(Context);

    return (
        <div className="container">
            <h1>{store.fname}</h1>
            <h2>{store.lname}</h2>
            <button className="btn btn-success" onClick={actions.loadSomeData}>test_store</button>
        </div>
    );
}