import axiosInstance from "./axiosInstance"; // Import Axios instance

// Function to make a GET request
export async function apiGet(endpoint) {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a GET request (include parameters)
export async function apiGetParam(endpoint, params) {
    try {
        let response;
        if (params.code) {
            response = await axiosInstance.get(endpoint, {
                params: params,
            });
        } else {
            //Nếu có searchKey
            if (!params.searchKey) {
                response = await axiosInstance.get(endpoint, {
                    params: {
                        pageSize: params.pageSize,
                        pageNum: params.pageNum,
                        leaveStatus: params.leaveStatus,
                        departmentId: params.departmentId,
                    },
                });
            } else {
                response = await axiosInstance.get(endpoint, {
                    params: params,
                });
            }
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a POST request
export async function apiPost(endpoint, data, responseType) {
    try {
        const response = await axiosInstance.post(endpoint, data, responseType);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a POST request (include parameters)
export async function apiPostParam(endpoint, data) {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a PUT request
export async function apiPut(endpoint, data) {
    try {
        const response = await axiosInstance.put(endpoint, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a DELETE request
export async function apiDelete(endpoint) {
    try {
        const response = await axiosInstance.delete(endpoint);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Function to make a DELETE request (Delete many resources)
export async function apiDeleteMany(endpoint, data) {
    try {
        const response = await axiosInstance.delete(endpoint, { data });
        return response.data;
    } catch (error) {
        throw error;
    }
}
