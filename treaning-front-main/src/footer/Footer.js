import './Footer.css';
import React from 'react';

function Footer() {
    return (<>
        <dev style={{zIndex:"3"}}>
            <div style={{zIndex:"3"}} >
                <footer class="w3-container w3-padding-16" style={{ backgroundColor: "white", boxShadow: "-1px 4px 20px 0px #a5a5a5", color: "#225f1f" }}>
                    <h5>Footer</h5>
                </footer>

                <footer class="w3-container" style={{ backgroundColor: "#198754", color: "white" }}>
                    <p>Powered by <a target="_blank">belal</a></p>
                </footer>
            </div>
        </dev>
    </>)
}

export default Footer