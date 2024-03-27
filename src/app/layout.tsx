import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MenuBar from '../components/MenuBar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <AppRouterCacheProvider>
                    <MenuBar />
                    {children}
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
