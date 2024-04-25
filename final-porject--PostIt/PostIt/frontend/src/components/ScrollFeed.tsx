import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ApiService from "../ApiService";
import Feed from "./Feed";
import {handleApiErrors, redirectBasedOnErrorCode} from "../HelperMethods";
import {useNavigate} from "react-router-dom";

export function ScrollFeed() {
    const apiService = new ApiService();
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            await getPagedItem(currentPage);
            setCurrentPage(currentPage + 1);
        } catch (ex:any) {
            handleApiErrors(ex);
            redirectBasedOnErrorCode(ex, navigate);
        }
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
            <div className="text-center">
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv" children={undefined}>
                    {items.map((i, index) => (
                        <div key={index}>
                            <Feed imageUrl={i.imageUrl} createdDate={i.created} description={i.description}
                                  username={i.user.username} onClick={() => {
                            }}/>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>

        </div>
    );
}