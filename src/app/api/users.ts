import {toApi} from "api/base";

import {TokenContainer, User, UserSettings} from "store/users/types";

export const me = toApi<User>({
    method: "GET",
    path: "v1/me"
});

export const login = toApi<TokenContainer>({
    method: "POST",
    path: "v1/login"
});

export const register = toApi<boolean>({
    method: "POST",
    path: "v1/register"
});

export const changeSettings = toApi<UserSettings>({
    method: "PUT",
    path: "v1/settings"
});