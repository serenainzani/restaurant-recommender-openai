import OpenAI from "openai/index.mjs";
import dotenv from "dotenv";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";

dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const RestaurantInfo = z.object({
    name: z.string(),
    cuisine: z.string(),
    location: z.string(),
    description: z.string(),
});

const RestaurantEventList = z.object({
    restaurants: z.array(RestaurantInfo),
});

export default async function makeAIRecommendation(req, res) {
    const inputtedText = await req.body.inputtedText;
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content:
                    "Recommend 3 resturants that fit the given critera in the given location.",
            },
            {
                role: "user",
                content: inputtedText,
            },
        ],
        response_format: zodResponseFormat(RestaurantEventList, "restaurants"),
    });
    const response = completion.choices[0].message.content;
    const jsonResponse = JSON.parse(response);
    res.status(200).json(jsonResponse);
}
