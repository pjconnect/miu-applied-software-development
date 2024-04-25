import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ApiService from "../ApiService";
import AddFeed from "./AddFeed";

export function ScrollFeed() {
    const apiService = new ApiService();
    const [items, setItems ] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        await getPagedItem(currentPage);
        setCurrentPage(currentPage + 1);
    }

    async function getPagedItem(pageNumber) {
        const feedData = await apiService.getFeedData(pageNumber);
        var x = items.concat(feedData.data.feed)
        setItems(x);
        console.log(feedData.data.feed);
    }

    return (
        <div>
            <div className="p-1 w-full"/>
            <AddFeed/>
            <div className="p-1 w-full"/>
            <div className="text-center">
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv" children={undefined}>
                    {items.map((i, index) => (
                        <div key={index}>

                            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                                <img className="w-full h-56 object-cover object-center" src="imageplaceholder 300x300"
                                     alt="Post Image"/>
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-10 h-10 rounded-full"
                                                 src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                                 alt="User Avatar"/>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 font-medium text-lg">pay3d</p>
                                            <p className="text-gray-500 text-sm">Posted on April 25, 2024</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-gray-700 text-base">I want to go now</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    ))}
                </InfiniteScroll>
            </div>

        </div>
    );
}