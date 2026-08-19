import React from 'react'
import {useLocation} from "react-router";

export const VisualizerId = () => {
    const location = useLocation();
    const { initialImage, name } = loaction.state || {};
    return (
        <section>
            <h1> {name || 'UNtitled Project'}</h1>

            <div className="visualizer">
                {initialImaage && (
                    <div className="image-container">
                        <h2>Source Image</h2>
                        <img src={initialImage} alt="source" />
                    </div>
                )}
            </div>
        </section>
    )
}
export default VisualizerId
