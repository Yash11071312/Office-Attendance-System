import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {

    const employee = localStorage.getItem("employee");

    return employee ? JSON.parse(employee) : null;

});

    const login = (employee, token) => {

        localStorage.setItem("token", token);
        localStorage.setItem("employee", JSON.stringify(employee));

        setUser(employee);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("employee");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};