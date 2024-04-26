import axios, {AxiosInstance, AxiosResponse} from 'axios';

export default class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = this.createAxiosBase();
    }

    public async getFeedData(pageNumber: number, pageSize: number) {
        return this.request<{ feed }>('GET', `/api/feed/paged/${pageNumber}/${pageSize}`);
    }

    public async addFeed(param: { imageUrl: string; description: string }) {
        await this.request<void>('POST', '/api/feed/', param);
    }

    public async registerUser(param: {
        password: string;
        email: string;
        username: string
    }): Promise<AxiosResponse<void>> {
        return this.request<void>('POST', '/api/auth/register/', param);
    }

    public async login(param: { password: string; email: string }) {
        return this.request<{ token: string, username: string }>('POST', '/api/auth/login/', param);
    }

    async uploadFeedImage(formData: FormData) {
        const ax = this.createAxiosBase("multipart/form-data");
        return ax.post<{ imageUrl }>('/api/image-upload/feed/image', formData)
    }

    async getMyInfo() {
        return this.request<{ username: string }>('GET', '/api/auth/my-info/');
    }

    private createAxiosBase(contentType = 'application/json') {
        return axios.create({
            baseURL: "https://localhost:34318",
            headers: {
                'Content-Type': contentType,
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        });
    }

    private async request<T>(method: string, url: string, data?: any) {
        return await this.axiosInstance.request<T>({
            method,
            url,
            data
        });
    }

    
}
