import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "@/db/schema"

const sql = neon(process.env.DB_URL!);
const db = drizzle(sql, {schema})

const main = async () => {
    try {
        console.log("Seeding db");

        await db.delete(schema.courses)
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg"
            },
            {
                id: 2,
                title: "Japanese",
                imageSrc: "/jp.svg"
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/fr.svg"
            },
            {
                id: 4,
                title: "Croatian",
                imageSrc: "/hr.svg"
            },
            {
                id: 5,
                title: "Italian",
                imageSrc: "/it.svg"
            },
        ])

        console.log("Seeding complete");
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the db")
    }
}

main();