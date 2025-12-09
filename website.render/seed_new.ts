import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { postgres } from "postgres";
import { portfolioItems, products, workshops } from "./drizzle/schema";
import crypto from "crypto";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function seed() {
  console.log("🌱 Seeding portfolio items...");
  const portfolioData = [
