import React, {useEffect, useState} from "react";
import moment from "moment";
export default function Feed({imageUrl, createdDate, username, description, onClick}) {
    return (
        <div>
            <div className="max-w-lg mx-auto bg-white shadow rounded-lg overflow-hidden p-3 mb-3">
             
                <div className="flex justify-between">
                    <div className="text-left">
                        <p className="text-gray-900 font-medium text-lg mr-3">{username}</p>
                       
                    </div>
                    <div>
                        <button className="text-gray-500 hover:text-red-500 focus:outline-none"
                                onClick={onClick}>
                                           <span>
                                              <i className="bi bi-fire text-3xl"></i>
                                           </span>
                        </button>
                    </div>
                </div>
                <div className="">
                    {imageUrl &&
                        <img className="w-full h-56 object-cover rounded object-center" src={imageUrl}
                             alt="Post Image"/>
                    }
                    <div className="mb-2">
                        <p className="text-gray-700 text-2xl">{description}</p>
                    </div>
                    <p className="text-gray-500 text-left text-sm">Posted
                        on {moment.utc(createdDate).format("MMMM DD, yyyy")}</p>
                </div>

            </div>
        </div>
    )
}