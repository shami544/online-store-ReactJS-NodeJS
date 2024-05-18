
import React from "react";



export default function Loading() {
	return (
		<div>
			{/* <h2>Loading in ReactJs - GeeksforGeeks</h2> */}
			{/* <ReactLoading type="balls" color="#0000FF"
				height={100} width={50} /> */}
			{/* <ReactLoading type="bars" color="#0000FF"
				height={100} width={50} /> */}
			{/* <ReactLoading type="bubbles" color="#0000FF"
				height={100} width={50} /> */}
			{/* <ReactLoading type="cubes" color="#0000FF"
				height={100} width={50} /> */}
			{/* <ReactLoading type="cylon" color="#0000FF"
				height={100} width={50} /> */}
			{/* <ReactLoading type="spin" color="#0000FF"
				height={100} width={50} /> */}
			{/* <ReactLoading type="spokes" color="#0000FF"
				height={100} width={50} /> */}
			{/* <ReactLoading
				type="spinningBubbles"
				color="#0000FF"
				height={100}
				width={50}
			/> */}
			<div class="text-center" style={{ marginTop: "250px", marginBottom: "250px" }}>
				<div class="spinner-border" role="status">
					<span class="visually-hidden" >Loading...</span>
				</div>
			</div>
		</div>
	);
}
