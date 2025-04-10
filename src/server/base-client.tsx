import { axiosBaseRequest } from "./interceptors";

type ResourceData = {
    [key: string]: any;
}

type BaseClientOptions = {
    resourcePath: string;
}

export const baseClient = <T, >({resourcePath}: BaseClientOptions) => {
    const getAllResource = async (data: ResourceData) => await axiosBaseRequest<T[]>({
        resourcePath,
        method: 'GET',
        data
    });

    const addResource = async (data: ResourceData) => await axiosBaseRequest<T>({
        resourcePath,
        method: 'POST',
        data
    });

    const editResource = async (resourceId: number, data: ResourceData) => await axiosBaseRequest<T>({
        resourcePath,
        resourceId,
        method: 'PATCH',
        data
    });

    const deleteResource = async (resourceId: number) => await axiosBaseRequest<null>({
        resourcePath,
        resourceId,
        method: 'DELETE',
    });

    return {
        getAllResource,
        addResource,
        editResource,
        deleteResource
    }
}