import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ApiService from "../ApiService";
import AddFeed from "./AddFeed";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

export function ScrollFeed() {
    const apiService = new ApiService();
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        await getPagedItem(currentPage);
        setCurrentPage(currentPage + 1);
    }

    async function getPagedItem(pageNumber) {
        const items = await apiService.getFeedData(pageNumber);
        console.log('i', items);
    }

    return (
        <div>
            <div className="p-1 w-full bg-black"/>
            <AddFeed/>
            <div className="p-1 w-full bg-black"/>
            <div className="text-center">
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv" children={undefined}>
                    {items.map((i, index) => (
                        <div style={style} key={index}>
                            div - #{index}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
           
        </div>
    );
}