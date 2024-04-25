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
            toast("Posted!", {icon: "🔥"})
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
                <div className="position-absolute bottom-2 left-5">
                    <label htmlFor="file-upload"
                           className="cursor-pointer">
                        <i className="bi bi-camera2 text-5xl"></i>
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