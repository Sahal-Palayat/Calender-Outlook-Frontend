import LoadingProvider from "./ProgressProvider";
import DarkModeProvider from "./ThemeContext";

export default function Provider({ children }: { children: JSX.Element }) {
    return (
        <DarkModeProvider>
            <LoadingProvider>
                {children}
            </LoadingProvider>
        </DarkModeProvider>
    )
}


