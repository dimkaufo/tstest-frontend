import * as qs from "query-string";
import * as format from "string-template";

type ToApiProps = {
    method: string,
    path: string
};

export type ApiCallProps = {
    queryParams?: any,
    pathParams?: any,
    body?: any
};

export type ApiResponse<T> = {
    error: string | null,
    data: T
}

export type ApiCallType<T> = (props?: ApiCallProps) => Promise<T | undefined>;

const baseUrl = "http://localhost:8081/api";

export function toApi<T>(props: ToApiProps): ApiCallType<T> {
    return (callProps?: ApiCallProps): Promise<T | undefined> => {
        const {
            method,
            path
        } = props;

        const {
            queryParams,
            pathParams,
            body
        } = callProps || {};

        const pathResult: string = pathParams ? format(path, pathParams) : path;
        const queryString: string = queryParams ? qs.stringify(queryParams) : "";

        return fetch(new Request(
            `${baseUrl}/${pathResult}${queryString ? `?${queryString}` : ""}`,
            {
                method,
                body: body ? JSON.stringify(body) : undefined,
                headers: new Headers({
                    "Authorization": "Bearer " + localStorage.getItem("access_token") as string,
                    "Content-Type": "application/json",
                }),
            }
        )).then((response: Response): Promise<ApiResponse<T>> | undefined => {
            if (response.status === 204) {
                return;
            }
            return response.json();
        }).then((data: ApiResponse<T> | undefined): T | undefined => {
            if (data === undefined) {
                return;
            }

            if (data.error) {
                throw data.error;
            }

            return data.data;
        });
    }
}