import { z } from "zod";
import { createStore } from "zustand";
import { jwtDecode } from "jwt-decode";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";
import { useStoreWithEqualityFn } from "zustand/traditional";


const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const roles = z.enum(['user', 'admin']);

const TokenDataSchema = z.object({
    userId: z.number(),
    roles,
})

type TokenData = z.infer<typeof TokenDataSchema>;


type AuthStore = {
    accessToken: string | undefined;
    accessTokenData: TokenData | undefined;
    refreshToken: string | undefined;

    actions: {
        setAccessToken: (accessToken: string | undefined) => void;
        setRefreshToken: (refreshToken: string | undefined) => void;
        //set tokens on the app start
        init: () => void;
        clearTokens: () => void;
    }
}

export const decodeAccessToken = (accessToken: string) => TokenDataSchema.parse(jwtDecode<TokenData>(accessToken));

const authStore = createStore<AuthStore>()(
    devtools(
        (set, get) => ({
            accessToken: undefined,
            accessTokenData: undefined,
            refreshToken: undefined,

            actions: {
                setAccessToken: (accessToken: string | undefined) => {
                    const accessTokenData = (() => {
                        try {
                            return accessToken ? decodeAccessToken(accessToken) : undefined;
                        } catch (error) {
                            console.error(error)
                            return undefined;
                        }
                    })();
                    set({
                        accessToken,
                        accessTokenData,
                    });
                },
                setRefreshToken: (refreshToken: string | undefined) =>
                    set({
                        refreshToken,
                    }),
                init: () => {
                    const { setAccessToken, setRefreshToken } = get().actions;
                    setAccessToken(Cookies.get(ACCESS_TOKEN_KEY));
                    setRefreshToken(Cookies.get(REFRESH_TOKEN_KEY));
                },
                clearTokens: () =>
                    set({
                        accessToken: undefined,
                        accessTokenData: undefined,
                        refreshToken: undefined,
                    }),
            }
        }),
        {
            name: 'auth-store',
            enabled: !import.meta.env.PROD,
        }
    )
);

export type ExtractState<S> = S extends {
    getState: () => infer T;
}
    ? T
    : never;

type Params<U> = Parameters<typeof useStoreWithEqualityFn<typeof authStore, U>>;

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
const accessTokenDataSelector = (state: ExtractState<typeof authStore>) => state.accessTokenData;
const refreshTokenSelector = (state: ExtractState<typeof authStore>) => state.refreshToken;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getAccessTokenData = () => accessTokenDataSelector(authStore.getState());
export const getRefreshToken = () => refreshTokenSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
    return useStoreWithEqualityFn(authStore, selector, equalityFn);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
export const useRefreshToken = () => useAuthStore(refreshTokenSelector);
export const useActions = () => useAuthStore(actionsSelector);