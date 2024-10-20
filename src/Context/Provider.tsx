import DarkModeProvider from "./ThemeContext";

export default function Provider({ children }: { children: JSX.Element }) {
    return (
        <DarkModeProvider>
                {children}
        </DarkModeProvider>
    )
}


