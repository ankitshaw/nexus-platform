import { Index } from "@upstash/vector";

const URL = process.env.UPSTASH_VECTOR_REST_URL!;
const TOKEN = process.env.UPSTASH_VECTOR_REST_TOKEN!;

export const upstashIndex = new Index({
    url: URL,
    token: TOKEN,
});
