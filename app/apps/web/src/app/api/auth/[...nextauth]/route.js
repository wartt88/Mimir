import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
      },

      async authorize(credentials) {
        const user = { id: 1};
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  }
};

const handler = NextAuth(authOptions);

export { hander as GET, handler as POST };