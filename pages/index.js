import Head from "next/head";
import { useState } from "react";

export default function Home() {
    const [recommendations, setRecommentations] = useState();
    const [inputtedText, setInputtedText] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        const aiResponse = await fetch("/api/recommendations", {
            method: "POST", // Use POST for sending a body
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify({ inputtedText }), // Send the sentence as JSON
        });
        const aiResponseJson = await aiResponse.json();
        setRecommentations(aiResponseJson.restaurants);
    };

    return (
        <>
            <Head>
                <title>Restaurant Recommender with OpenAI</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Restaurant Recommender with OpenAI</h1>
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
                {recommendations &&
                    recommendations.map((resturant) => (
                        <>
                            <h2>{resturant.name}</h2>
                            <p>
                                {resturant.cuisine} ~ {resturant.location}
                            </p>
                            <p>{resturant.description}</p>
                        </>
                    ))}
            </main>
        </>
    );
}
