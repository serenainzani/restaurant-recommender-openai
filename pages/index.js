import Head from "next/head";
import { useState } from "react";
import RestaurantInfo from "../components/RestaurantInfo";
import Input from "../components/Input";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

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
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputtedText }),
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
                        <div class="relative flex h-20 w-full max-w-sm items-end border-0 border-b-2 focus-within:border-pink-600 transition-colors duration-300">
                            <input
                                type="text"
                                placeholder="Reccomend me a restaurant..."
                                id="ask-ai-question"
                                name="ask-ai-question"
                                aria-labelledby="ask-ai-button"
                                onChange={(e) =>
                                    setInputtedText(e.target.value)
                                }
                                value={inputtedText}
                                class="peer w-full border-0 bg-transparent px-2 py-4 placeholder-transparent focus:outline-none focus:ring-0 text-slate-200"
                            />
                            <label class="top-4 text-sm text-gray-400 pointer-events-none absolute left-2 transition-all peer-placeholder-shown:top-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-sm peer-focus:text-gray-400">
                                Reccomend me a resturant...
                            </label>
                        </div>
                        <button
                            id="ask-ai-button"
                            type="submit"
                            className="bg-pink-600 text-white font-medium h-10 w-28 self-end rounded-l-sm rounded-r-lg"
                        >
                            Ask AI <span className="text-xl">🤖</span>
                        </button>
                    </div>
                </form>
                <div className="pt-6">
                    <Popover placement="right">
                        <PopoverTrigger>
                            <button
                                id="ask-ai-button"
                                type="submit"
                                className="bg-pink-500 text-white font-medium h-10 p-2 self-end rounded-l-md rounded-r-md"
                            >
                                Not sure what to ask?
                            </button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small font-semibold">
                                    Here are some ideas:
                                </div>
                                <div className="text-small">
                                    <ul>
                                        <li>💡 Best sushi in London</li>
                                        <li>💡 Weirdest food in Paris</li>
                                        <li>
                                            💡 An affordable date at an indian
                                            resturant in Edinburgh
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
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
