import Head from "next/head";
import { useState } from "react";
import RestaurantInfo from "../components/RestaurantInfo";
import Input from "../components/Input";

export default function Home() {
    const [recommendations, setRecommentations] = useState([
        {
            name: "My Chez",
            cuisine: "French",
            location: "Paris",
            description:
                "a stylish french resutant in the suburbs serving wine in baby milk",
        },
        {
            name: "My Love",
            cuisine: "Italian",
            location: "Paris",
            description:
                "Modern pizza rooted in tradtionial techniques and ingredients",
        },
        {
            name: "The One",
            cuisine: "Fusion",
            location: "Paris",
            description: "A unique experience where diners can only sit alone.",
        },
    ]);
    const [inputtedText, setInputtedText] = useState("");
    const [loading, isLoading] = useState(true);
    const [noQuestionsAsked, isNoQuestionsAsked] = useState(true);

    const handleSearch = async (e) => {
        e.preventDefault();
        isLoading(true);
        isNoQuestionsAsked(false);
        const aiResponse = await fetch("/api/recommendations", {
            method: "POST", // Use POST for sending a body
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify({ inputtedText }), // Send the sentence as JSON
        });
        const aiResponseJson = await aiResponse.json();
        console.log(aiResponseJson);
        setRecommentations(aiResponseJson.restaurants);
        isLoading(false);
    };

    return (
        <>
            <Head>
                <title>Restaurant Recommender with OpenAI</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>

            <main className="h-screen cursor-default bg-gradient-to-b from-slate-950 to-slate-900 p-7">
                <h1 className="pb-5 text-6xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 inline-block text-transparent bg-clip-text">
                    Next Eats Reccs
                </h1>

                <form method="post" onSubmit={handleSearch}>
                    <div class="flex space-x-1">
                        <Input
                            type="search"
                            label="I want a resturant..."
                            id="ask-ai-question"
                            name="ask-ai-question"
                            aria-labelledby="ask-ai-button"
                            onChange={(e) => setInputtedText(e.target.value)}
                            value={inputtedText}
                            variant="underlined"
                            className="h-24"
                        />
                        <button
                            id="ask-ai-button"
                            type="submit"
                            className="bg-pink-600 text-white font-medium h-10 w-28 self-end rounded-l-sm rounded-r-lg"
                        >
                            Ask AI <span className="text-xl">🤖</span>
                        </button>
                    </div>
                </form>
                <div className="flex gap-4 py-7 flex-wrap">
                    {recommendations &&
                        !noQuestionsAsked &&
                        recommendations.map((restaurant, index) => (
                            <RestaurantInfo
                                restaurant={restaurant}
                                isLoading={loading}
                                key={index}
                            />
                        ))}
                </div>
            </main>
        </>
    );
}
