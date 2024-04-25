import axios, {AxiosInstance, AxiosResponse} from 'axios';

export default class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://localhost:34318",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        });
    }

    private async request<T>(method: string, url: string, data?: any): Promise<AxiosResponse<T>> {
        return await this.axiosInstance.request<T>({
                method,
                url,
                data
            });
    }

    public async getFeedData(pageNumber: number): Promise<any> {
        return this.request<any>('GET', `/api/feed/paged/${pageNumber}`);
    }

    public async addFeed(param: { imageUrl: string; description: string }): Promise<void> {
        await this.request<void>('POST', '/api/feed/', param);
    }

    public async registerUser(param: { password: string; email: string; username: string }): Promise<AxiosResponse<void>> {
        return this.request<void>('POST', '/api/auth/register/', param);
    }

    public async login(param: { password: string; username: string }): Promise<AxiosResponse<{ token: string }>> {
        return this.request<{ token: string }>('POST', '/api/auth/login/', param);
    }
}
