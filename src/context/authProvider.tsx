import { ReactNode, createContext, useContext, useState } from "react";

type AuthState = {
    user: {
        rol: string;
    } | null;
    accessToken: string | null
};

type AuthProviderProps = {
    children: ReactNode;
};

// Define the shape of your context
type AuthContextType = {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}