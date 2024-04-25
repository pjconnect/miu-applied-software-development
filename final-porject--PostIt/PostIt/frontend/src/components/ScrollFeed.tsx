import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ApiService from "../ApiService";
import AddFeed from "./AddFeed";
import moment from "moment";

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
                            <div className="max-w-lg mx-auto bg-white shadow rounded-lg overflow-hidden p-3 mb-3">
                                {i.imageUrl &&
                                    <img className="w-full h-56 object-cover object-center" src={i.imageUrl}
                                         alt="Post Image"/>
                                }
                                <div className="flex justify-between">
                                    <div className="text-left">
                                        <p className="text-gray-900 font-medium text-lg mr-3">{i.user.username}</p>
                                        <p className="text-gray-500 text-sm">Posted
                                            on {moment.utc(i.created).format("MMMM DD, yyyy")}</p>
                                    </div>
                                    <div >
                                        <button className="text-gray-500 hover:text-red-500 focus:outline-none"
                                                onClick={() => {}}>
                                           <span>
                                              <i className="bi bi-fire text-3xl"></i>
                                           </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="mt-4">
                                        <p className="text-gray-700 text-2xl">{i.description}</p>
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