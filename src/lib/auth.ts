import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

function getRequiredEnv(name: string) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

function createAuth() {
    const client = new MongoClient(getRequiredEnv("BETTER_AUTH_MONGO_URL"));
    const db = client.db("bangla-news-24");

    return betterAuth({
        secret: getRequiredEnv("BETTER_AUTH_SECRET"),
        baseURL: getRequiredEnv("BETTER_AUTH_URL"),
        emailAndPassword: {
            enabled: true,
        },
        socialProviders: {
            google: {
                clientId: getRequiredEnv("GOOGLE_CLIENT_ID"),
                clientSecret: getRequiredEnv("GOOGLE_CLIENT_SECRET"),
            },
            github: {
                clientId: getRequiredEnv("GITHUB_CLIENT_ID"),
                clientSecret: getRequiredEnv("GITHUB_CLIENT_SECRET"),
            },
        },
        account: {
            accountLinking: {
                enabled: true,
                trustedProviders: ["google", "github"],
            },
        },
        database: mongodbAdapter(db, {
            client,
        }),
    });
}

type AuthInstance = ReturnType<typeof createAuth>;
let authInstance: AuthInstance | undefined;

export function getAuth() {
    authInstance ??= createAuth();
    return authInstance;
}