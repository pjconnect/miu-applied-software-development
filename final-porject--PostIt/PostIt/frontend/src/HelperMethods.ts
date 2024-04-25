import toast from "react-hot-toast";
import {AxiosResponse} from "axios";

export function handleApiErrors(ex) {
    const data = ex.response.data;
    if (typeof data == 'string') {
        toast(ex.response.data, {icon: '⚠️'});
    } else if (data?.errors) {
        let keys = Object.keys(data.errors);
        for (let k of keys) {
            toast(data.errors[k], {icon: '⚠️'});
        }
    }
    console.log(data?.errors)
}

export function saveJwtInLoginResponse(loginResponse: AxiosResponse<{ token: string }>) {
    localStorage.setItem('jwt', loginResponse.data.token);
}
