import "./Gallery.css"
import Tile from "../components/Tile"
import { MuuriComponent } from "react-muuri-official";
import { useState } from "react";
import PageInfo from "../types/PageInfo";


interface GalleryProps {
	pages: PageInfo[];
}


const Gallery = (props: GalleryProps) => {
	
	return (
			<MuuriComponent
				dragEnabled
				layoutDuration={300}
				layoutEasing={"ease-out"}
			>
				{props.pages.map((page) =>
					<Tile key = {page.id} originalIndex = {page.id} page = {page.pageProxy} />
				)}
			</MuuriComponent>
	)
};

export default Gallery;
