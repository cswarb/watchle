import React from "react";
import { Helmet } from "react-helmet";

const SEO = () => {
    const schema = {
        "@context": "https://schema.org",
            "@type": "Game",
                "name": "Guess the Watch - Daily Watch Identification Game",
                    "url": "https://guessthewatch.co.uk/",
                        "description": "Test your horological knowledge with our daily watch guessing game. Recognise luxury watches, vintage timepieces, and iconic brands in this addictive Wordle-style game for watch enthusiasts.",
                            "genre": ["Puzzle Game", "Educational Game", "Quiz Game"],
                                "gamePlatform": "Web Browser",
                                    "applicationCategory": "Game",
                                        "operatingSystem": "Any",
                                            "offers": {
            "@type": "Offer",
                "price": "0",
                    "priceCurrency": "GBP",
                        "availability": "https://schema.org/InStock"
        },
        "author": {
            "@type": "Organisation",
                "name": "Guess the Watch"
        },
        "publisher": {
            "@type": "Organisation",
                "name": "Guess the Watch",
                    "url": "https://guessthewatch.co.uk/"
        },
        "inLanguage": "en-GB",
            "isAccessibleForFree": true,
                "keywords": "watch game, watch quiz, luxury watches, timepiece identification, daily puzzle, horological game, watch brands, Rolex quiz, watch guessing",
                    "audience": {
            "@type": "Audience",
                "audienceType": "Watch enthusiasts, collectors, luxury watch lovers, puzzle gamers"
        },
        "playMode": "SinglePlayer",
            "numberOfPlayers": "1"
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default SEO;