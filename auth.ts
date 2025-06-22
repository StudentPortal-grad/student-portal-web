import NextAuth, { DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

declare module "next-auth" {
  interface User {
    _id?: string;
    name?: string | null;
    email?: string | null;
    profilePicture?: string;
    role?: string;
    token?: string;
    profile?: {
      interests: string[];
    };
    mfa_settings?: {
      enabled: boolean;
      methods: string[];
    };
    chatPreferences?: {
      notifications: string;
      soundEnabled: boolean;
      desktopNotifications: boolean;
      showTypingIndicators: boolean;
      markReadOnView: boolean;
      theme: string;
    };
    signupStep?: string;
    universityEmailVerified?: boolean;
    emailVerified?: boolean;
    status?: string;
    isSuspended?: boolean;
    isGraduated?: boolean;
    pinnedConversations?: string[];
    fcmToken?: string | null;
    isChatbot?: boolean;
    botSettings?: any;
    hasChatbotConversation?: boolean;
    chatbotConversationId?: string | null;
    addresses?: any[];
    roles?: string[];
    lastSeen?: string;
    friends?: string[];
    friendRequests?: string[];
    recentConversations?: string[];
    mutedConversations?: string[];
    bookmarkedMessages?: string[];
    createdAt?: string;
    updatedAt?: string;
  }

  interface Session {
    token: string;
    expires: Date;
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          let response = await fetch(`${process.env.BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const result = await response.json();

          if (!result.success) {
            return null;
          }

          const { user, token } = result.data;

          return {
            ...user,
            token,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.profilePicture,
          role: user.role,
        };
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.token = token.token as string;
      const decodedToken = jwtDecode(token.token as string);
      if (decodedToken && "exp" in decodedToken) {
        session.expires = new Date((decodedToken.exp as number) * 1000);
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
