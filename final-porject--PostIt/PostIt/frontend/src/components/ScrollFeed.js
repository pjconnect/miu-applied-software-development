import React, {Component} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Home} from "./Home";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

export class ScrollFeed extends Component {
    static displayName = Home.name;
    state = {
        items: Array.from({length: 200})
    };

    fetchData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(Array.from({length: 20}))
            });
        }, 1500);
    }

    render() {
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {this.state.items.map((i, index) => (
                        <div style={style} key={index}>
                            div - #{index}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}