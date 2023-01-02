import "./Gallery.css"
import Tile from "./Tile"
import { MuuriComponent } from "react-muuri-official";
import { useState } from "react";
import PageInfo from "../types/PageInfo";


interface GalleryProps {
	pages: PageInfo[];
}


const Gallery = (props: GalleryProps) => {

	const [pages, setPages] = useState<PageInfo[]>(props.pages)


	return (
			<MuuriComponent
				dragEnabled
				layoutDuration={300}
				layoutEasing={"ease-out"}
			>
				{pages.map((page) =>
					<Tile key = {page.id} originalIndex = {page.id} page = {page.pageProxy} />
				)}
			</MuuriComponent>
	)
};

export default Gallery;
