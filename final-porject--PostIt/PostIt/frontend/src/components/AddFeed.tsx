import React, {useRef} from "react";
import {Button} from "reactstrap";
import ApiService from "../ApiService";
import {handleApiErrors} from "../HelperMethods";
import toast from "react-hot-toast";

export default function AddFeed() {
    const refTextArea = useRef<HTMLTextAreaElement>();
    const apiService = new ApiService();

    async function uploadFeed() {
        try {
            await apiService.addFeed({description: refTextArea.current.value, imageUrl: ""})
            toast("Nice!", {icon: "🔥"})
            resetForm();
        } catch (ex) {
            handleApiErrors(ex);
        }
    }
    function resetForm(){
        refTextArea.current.value = "";
        refTextArea.current.style.height = 'auto';
    }

    return (
        <div className="flex items-stretch justify-center">
            <div className="flex-grow position-relative">
                <textarea ref={refTextArea}
                          className="border border-gray-300 rounded-lg p-3 min-h-24 w-full border-red-300 transition-all"
                          placeholder="Write something..."
                          onBlur={() => {
                              if (refTextArea.current.value) {
                                  return;
                              }
                              console.log("out")
                              refTextArea.current.style.height = '24px';
                          }}
                          onClick={() => {
                              refTextArea.current.style.height = '300px';
                          }}>
                </textarea>
                <div className="position-absolute bottom-1 left-5">
                    <label htmlFor="file-upload"
                           className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                             className="bi bi-camera2" viewBox="0 0 16 16">
                            <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4"/>
                            <path
                                d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.97 5.97 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1M2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0M14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0"/>
                        </svg>
                    </label>
                </div>
                <div className="position-absolute bottom-3 right-2">
                    <button className="bg-blue-950 text-white ml-3 px-4 py-2 rounded-1 cursor-pointer hover:bg-blue-900"
                            onClick={uploadFeed}>Post It!
                    </button>
                </div>
            </div>
            <input id="file-upload" type="file" className="hidden"/>

        </div>
    )
}