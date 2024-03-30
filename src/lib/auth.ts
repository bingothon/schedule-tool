import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const nextAuth = NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    secret: 'secret',
    basePath: '/auth',
    callbacks: {},
});

export const { handlers, auth } = nextAuth;
