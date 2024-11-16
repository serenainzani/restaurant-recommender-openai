import Head from "next/head";
import { useState } from "react";
import RestaurantInfo from "../components/RestaurantInfo";

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
            </Head>

            <main>
                <h1 class="text-yellow-500">
                    Restaurant Recommender with OpenAI
                </h1>
                <form method="post" onSubmit={handleSearch}>
                    <input
                        type="search"
                        id="site-search"
                        name="q"
                        aria-labelledby="ask-ai-button"
                        onChange={(e) => setInputtedText(e.target.value)}
                        value={inputtedText}
                    />
                    <button id="ask-ai-button" type="submit">
                        Ask AI
                    </button>
                </form>
                <div className="flex gap-4 m-7">
                    {recommendations &&
                        !noQuestionsAsked &&
                        recommendations.map((restaurant) => (
                            <RestaurantInfo
                                restaurant={restaurant}
                                isLoading={loading}
                            />
                        ))}
                </div>
            </main>
        </>
    );
}
