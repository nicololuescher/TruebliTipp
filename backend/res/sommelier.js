// static data for the sommelier API. might be replaced with a real API in the future
const sommelierAPI = {
    start: {
        question: "What type of wine are you in the mood for?",
        options: [
            {
                answer: "Red",
                next: "/getSommelier?step=redWineSelection"
            },
            {
                answer: "White",
                next: "/getSommelier?step=whiteWineSelection"
            },
            {
                answer: "Rosé",
                next: "/getSommelier?step=roseWineSelection"
            },
            {
                answer: "Sparkling",
                next: "/getSommelier?step=sparklingWineSelection"
            }
        ]
    },
    redWineSelection: {
        question: "Which flavor profile do you prefer in red wine?",
        options: [
            {
                answer: "Fruity",
                next: "/getSommelier?step=fruityRed"
            },
            {
                answer: "Earthy",
                next: "/getSommelier?step=earthyRed"
            },
            {
                answer: "Spicy",
                next: "/getSommelier?step=spicyRed"
            }
        ]
    },
    whiteWineSelection: {
        question: "Which flavor profile do you prefer in white wine?",
        options: [
            {
                answer: "Crisp",
                next: "/getSommelier?step=crispWhite"
            },
            {
                answer: "Buttery",
                next: "/getSommelier?step=butteryWhite"
            },
            {
                answer: "Sweet",
                next: "/getSommelier?step=sweetWhite"
            }
        ]
    },
    roseWineSelection: {
        question: "How dry do you prefer your Rosé?",
        options: [
            {
                answer: "Dry",
                next: "/getSommelier?step=dryRose"
            },
            {
                answer: "Semi-Dry",
                next: "/getSommelier?step=semiDryRose"
            },
            {
                answer: "Sweet",
                next: "/getSommelier?step=sweetRose"
            }
        ]
    },
    sparklingWineSelection: {
        question: "What kind of sparkling wine are you looking for?",
        options: [
            {
                answer: "Champagne",
                next: "/getSommelier?step=champagne"
            },
            {
                answer: "Prosecco",
                next: "/getSommelier?step=prosecco"
            },
            {
                answer: "Cava",
                next: "/getSommelier?step=cava"
            }
        ]
    },
    fruityRed: {
        recommendation: "Try a Pinot Noir from Oregon. It's light-bodied with bright red fruit flavors."
    },
    earthyRed: {
        recommendation: "Consider a Bordeaux from France. It's full-bodied with earthy and tannic characteristics."
    },
    spicyRed: {
        recommendation: "How about a Syrah from California? It's bold and spicy with dark fruit notes."
    },
    crispWhite: {
        recommendation: "A Sauvignon Blanc from New Zealand would be perfect. It's zesty with citrus and herbaceous notes."
    },
    butteryWhite: {
        recommendation: "A Chardonnay from Napa Valley might suit you. It's rich, buttery, and full-bodied."
    },
    sweetWhite: {
        recommendation: "A Riesling from Germany could be ideal. It's sweet with flavors of honey and ripe peaches."
    },
    dryRose: {
        recommendation: "A Provencal Rosé is a great choice. It's dry with notes of strawberry and citrus."
    },
    semiDryRose: {
        recommendation: "A Rosé from California could work well. It's semi-dry with a balance of fruit and acidity."
    },
    sweetRose: {
        recommendation: "Try a White Zinfandel. It's sweet and fruity with hints of berries."
    },
    champagne: {
        recommendation: "You can't go wrong with a Brut Champagne from France. It's dry with fine bubbles."
    },
    prosecco: {
        recommendation: "A Prosecco from Italy is light and refreshing with a touch of sweetness."
    },
    cava: {
        recommendation: "A Cava from Spain offers great value. It's crisp with a hint of apple and citrus."
    }
};

module.exports = sommelierAPI;