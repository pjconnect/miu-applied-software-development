import React, {useRef} from "react";
import {Button} from "reactstrap";
import ApiService from "../ApiService";

export default function AddFeed() {
    const refTextArea = useRef<HTMLTextAreaElement>();
    const apiService = new ApiService();
    function uploadFeed(){
        var x  = apiService.addFeed({description: refTextArea.current.value, imageUrl: ""}) 
        console.log('xx', x);
    }
    
    
    return (
        <div className="flex items-center justify-center">
            <label htmlFor="file-upload"
                   className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                     className="bi bi-camera2" viewBox="0 0 16 16">
                    <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4"/>
                    <path
                        d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.97 5.97 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1M2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0M14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0"/>
                </svg>
            </label>
            <div className="flex-grow">
                <textarea ref={refTextArea} className="border border-gray-300 rounded-lg p-2 w-full h-12 border-red-300 transition-all"
                          placeholder="Write something..."
                          onBlur={() => {
                              console.log("out")
                              refTextArea.current.style.height = '3rem';
                          }}
                          onClick={() => {
                              refTextArea.current.style.height = '300px';
                          }}></textarea>
            </div>
            <input id="file-upload" type="file" className="hidden"/>
            <button className="bg-green-500 text-white ml-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600"
                    onClick={uploadFeed}>Upload
            </button>
        </div>
    )
}