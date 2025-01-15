import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await axios.post('http://localhost:8000/api/login', {
                    email: credentials.email,
                    password: credentials.password,
                });

                if (res.data.token) {
                    return { token: res.data.token, user: res.data.user };
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    id: user.id,
                    role: user.role,
                    token: user.token,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.token = token.token;
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
});

export { handler as GET, handler as POST };
