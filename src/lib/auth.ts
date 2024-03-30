import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import DiscordProvider from '@auth/core/providers/discord';
import prisma from '../database/Prisma';

interface Guild {
    id: string;
    name: string;
}

interface GuildMember {
    roles: string[];
}

const nextAuth = NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization:
                'https://discord.com/api/oauth2/authorize?scope=identify+guilds+guilds.members.read',
        }),
    ],
    secret: 'secret',
    basePath: '/auth',
    callbacks: {
        async signIn({ user, account }) {
            const res = await fetch(
                'https://discord.com/api/users/@me/guilds',
                {
                    headers: {
                        Authorization: `Bearer ${account.access_token}`,
                    },
                },
            );
            const guilds: Guild[] = await res.json();
            const inGuild =
                guilds.filter(
                    (guild) => guild.id === process.env.PERMISSION_GUILD,
                ).length > 0;
            if (!inGuild) {
                return false;
            }

            const guildMemRes = await fetch(
                `https://discord.com/api/users/@me/guilds/${process.env.PERMISSION_GUILD}/member`,
                {
                    headers: {
                        Authorization: `Bearer ${account.access_token}`,
                    },
                },
            );
            const guildMember: GuildMember = await guildMemRes.json();
            if (!guildMember.roles.includes(process.env.PERMISSION_ROLE)) {
                return false;
            }
            return true;
        },
        async session({ session, token, user }) {
            const account = await prisma.account.findFirst({
                where: { provider: 'discord', userId: user.id },
            });

            return {
                ...session,
                user: {
                    ...session.user,
                    discordId: account.providerAccountId,
                },
            };
        },
    },
    adapter: PrismaAdapter(prisma),
});

export const { handlers, auth } = nextAuth;
