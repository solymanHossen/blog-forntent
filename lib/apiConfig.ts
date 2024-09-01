import axios from "axios";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
interface ApiEndpoints {
    REGISTER: string;
    LOGIN: string;
}
export const API_ENDPOINTS: ApiEndpoints = {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
};
