import * as qs from "query-string";
import * as format from "string-template";

type ToApiProps = {
    method: string,
    path: string
};

export type ApiCallProps<B> = {
    queryParams?: {[key: string]: string},
    pathParams?: {[key: string]: string},
    body?: B
};

export type ApiResponse<T> = {
    error: string | null,
    data: T
}

export type ApiCallType<T, B = undefined> = (props?: ApiCallProps<B>) => Promise<T | undefined>;

const baseUrl = "http://localhost:8081/api";

export function toApi<R, B = undefined>(props: ToApiProps): ApiCallType<R, B> {
    return async (callProps?: ApiCallProps<B>): Promise<R | undefined> => {
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

        const response: Response = await fetch(new Request(
            `${baseUrl}/${pathResult}${queryString ? `?${queryString}` : ""}`,
            {
                method,
                body: body ? JSON.stringify(body) : undefined,
                headers: new Headers({
                    "Authorization": "Bearer " + localStorage.getItem("access_token") as string,
                    "Content-Type": "application/json",
                }),
            }
        ));

        const data: ApiResponse<R> | undefined = await response.json();
        if (data === undefined) {
            return;
        }

        if (data.error) {
            throw data.error;
        }

        return data.data;
    }
}