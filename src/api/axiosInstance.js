import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:3001/api",
    timeout: 10000,
    headers: {
        common: {
            Authorization: `bearer ${token}`,
        },
    },
});

axiosInstance.interceptors.response.use(
    // Thành công
    (response) => {
        return response;
    },
    // Thất bại
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 400) {
                // Xử lý lỗi 400 (Bad Request) chung
                console.error("Lỗi 400 (Bad Request):", error.response.data);
            } else if (status === 404) {
                // Xử lý lỗi 404 (Not Found) chung
                console.error("Lỗi 404 (Not Found):", error.response.data);
            } else if (status >= 500) {
                // Xử lý lỗi 500 (Internal Server Error) và các mã lỗi máy chủ khác
                console.error(
                    "Lỗi máy chủ (HTTP " + status + "):",
                    error.response.data
                );
            }
        } else if (error.request) {
            // Handle request errors (e.g., no response received)
            console.error("Request Error:", error.request);
        } else {
            // Handle other errors
            console.error("Error:", error.message);
        }

        // Propagate the error to the caller
        return Promise.reject(error);
    }
);

export default axiosInstance;
