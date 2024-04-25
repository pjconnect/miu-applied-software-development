import toast from "react-hot-toast";
import {AxiosResponse} from "axios";

export function handleApiErrors(ex) {
    toast(ex.response.data, {icon: '⚠️'});
}

export function saveJwtInLoginResponse(loginResponse: AxiosResponse<{ token: string }>) {
    localStorage.setItem('jwt', loginResponse.data.token);
}
