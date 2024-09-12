import { access } from 'fs';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        // This is where we need to fetch the access token from some API. For now, I'd like to store it in localStorage
        const accessToken = process.env.REACT_APP_GITHUB_TOKEN;
        if (accessToken) {
            setAccessToken(accessToken)
            // I would've preferred to store the accessToken/secret in something like a vault and inject it during the build.
            localStorage.setItem('github_access_token', accessToken);
        }
    }, []);


    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider value={{ accessToken, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};