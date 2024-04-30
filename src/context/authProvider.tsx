import { ReactNode, createContext, useState } from "react";

type AuthState = {
    user: {
        id: number;
        username: string;
        rol: number;
    } | null;
    accessToken: string | null
} | undefined;

type AuthProviderProps = {
    children: ReactNode;
};

// Define the shape of your context
type AuthContextType = {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<AuthState>({
        user: null,
        accessToken: null
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

