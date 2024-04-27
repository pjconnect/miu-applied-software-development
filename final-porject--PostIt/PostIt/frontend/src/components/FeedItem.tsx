import React, {useState} from "react";
import moment from "moment";
import {handleApiErrors} from "../HelperMethods";
import ApiService from "../ApiService";

export default function FeedItem({postId, imageUrl, createdDate, username, description, liked}) {
    
    const [localLiked, setLocalLiked] = useState(liked);
    const apiService = new ApiService();

    async function likePost(){
        try {
            if(liked){
                await  apiService.unlikePost(postId);
            }else{
                await apiService.likePost(postId)
            }
        }catch (ex){
            handleApiErrors(ex);
        }
    }
    
    return (
        <div>
            <div className="max-w-lg mx-auto bg-white shadow rounded-lg overflow-hidden p-3 mb-3">
                <div className="flex justify-between">
                    <div className="text-left">
                        <p className="text-gray-900 font-medium text-lg mr-3">{username}</p>
                    </div>
                    <div>
                        <button className={ "focus:outline-none" +  (localLiked ? " text-red-500" : " text-gray-500") }
                                onClick={() =>{
                                    setLocalLiked(!localLiked);
                                    likePost();
                                }}>
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