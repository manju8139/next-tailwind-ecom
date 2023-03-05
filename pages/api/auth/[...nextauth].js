import User from '@/models/User';
import bcrypt from 'bcryptjs';
import db from '@/utils/db';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({ session, token }) {
            if (token?.id) session._id = token._id;
            if (token?.isAdmin) session.isAdmin = token.isAdmin;
            return session;
        },
    },
    providers: [
        CredentialProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email: credentials.email,
                });
                await db.disconnect();
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin,
                    }
                }
                throw new Error('invalid email or password');
            }
        })
    ]
})