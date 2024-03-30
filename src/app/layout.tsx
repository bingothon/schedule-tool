import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MenuBar from '../components/MenuBar';
import { Box } from '@mui/material';
import { Metadata } from 'next';
import { auth } from '../lib/auth';
import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Bingothon Organizer',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session || !session.user) {
        redirect('/auth/signin');
    }
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <SessionProvider session={session} basePath="/auth">
                    <AppRouterCacheProvider>
                        <MenuBar />
                        <Box sx={{ padding: 2 }}>{children}</Box>
                    </AppRouterCacheProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
