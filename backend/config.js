var config = {
    pool: {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5432
    },
    gemini: {
        getInfoFromLabel: {
            instruction: "Extract standardized information from a wine label text.",
            expected_output_format: {
                name: "<name>",
                year: "<year>",
                grapes: "<grapes>",
                country: "<country>",
                region: "<region>",
                description: "<description>",
                tags: ["tag1", "tag2", "tag3", "..."],
                type: "<red|white|rose>"
            },
            output_type: "json",
            allow_inference: true,
            inference_instructions: "If some information is not present on the label but you are confident in knowing it, include it in the output."
        },
        getPairingsForFood: {
            instruction: "Rank a list of wine on how good they pair with a given food item.",
            input_format: {
                wines: [
                    {
                        id: "<id>",
                        name: "<name>",
                        year: "<year>",
                        grapes: "<grapes>",
                        country: "<country>",
                        region: "<region>",
                        description: "<description>",
                        tags: ["tag1", "tag2", "tag3", "..."],
                        type: "<red|white|rose>"
                    },
                    {
                        id: "<id>",
                        name: "<name>",
                        year: "<year>",
                        grapes: "<grapes>",
                        country: "<country>",
                        region: "<region>",
                        description: "<description>",
                        tags: ["tag1", "tag2", "tag3", "..."],
                        type: "<red|white|rose>"
                    }
                ],
                food: "<food item or dish>"
            },
            expected_output_format: {
                ranking: ["<id of best fit>", "<id of second best>", "etc.."]
            },
            output_type: "json",
            allow_inference: false,
            inference_instructions: "use only the wines provided to you"
        },
        getPairingsForWine: {
            instruction: "Provide food suggestions from the description of a given wine",
            input_format: {
                name: "<name>",
                year: "<year>",
                grapes: "<grapes>",
                country: "<country>",
                region: "<region>",
                description: "<description>",
                tags: ["tag1", "tag2", "tag3", "..."],
                type: "<red|white|rose>"
            },
            expected_output_format: {
                pairings: {
                    "<category>": [
                        "<dish in category>",
                        "<another dish in category>",
                        "..."
                    ],
                    "<category 2>": [
                        "<dish in category>",
                        "<another dish in category>",
                        "..."
                    ],
                    "<category 3>": [
                        "<dish in category>",
                        "<another dish in category>",
                        "..."
                    ]
                }
            },
            output_type: "json",
            allow_inference: true,
            inference_instructions: "Assume missing fields if you have a high confidence"
        }
    }
}

module.exports = config;