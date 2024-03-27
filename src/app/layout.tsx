import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MenuBar from '../components/MenuBar';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bingothon Organizer',
};

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
                    <Box sx={{ padding: 2 }}>{children}</Box>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
