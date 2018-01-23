import React from "react";
import {Link} from 'react-router-dom';

export default () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Page Not Found!</h1>
                <p>Hmmm we cannot find your page...</p>
                <Link to="/" className="button button--link">Go to Home</Link>
            </div>
        </div>
    );
}
