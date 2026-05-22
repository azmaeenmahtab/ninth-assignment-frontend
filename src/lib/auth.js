import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"


const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("Missing MONGODB_URI");
}

const globalForMongo = globalThis;
if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = new MongoClient(mongoUri);
}

const client = globalForMongo._mongoClient;
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),

  emailAndPassword: {
    enabled: true
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24, // 1 day
    }
  },

  plugins: [
    jwt(),
  ]
});