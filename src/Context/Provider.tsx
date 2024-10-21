import LoadingProvider from "./ProgressProvider";
import DarkModeProvider from "./ThemeContext";
import UserProvider from "./UserContext";

export default function Provider({ children }: { children: JSX.Element }) {
    return (
        <DarkModeProvider>
            <UserProvider>
                <LoadingProvider>
                    {children}
                </LoadingProvider>
            </UserProvider>
        </DarkModeProvider>
    )
}


