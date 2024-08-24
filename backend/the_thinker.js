const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const vision = require('@google-cloud/vision');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const visionClient = new vision.ImageAnnotatorClient({ apiKey: apiKey });

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function getPairingsForWine(description) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "I will give you descriptions of wine. I expect you to provide food pairing recommendations for a wine with the described characteristics. Format your response as JSON with the following json structure: {\"pairings\": [{\"category(fish, beef, pasta etc.)\":[\"example dish\", \"another example dish\"]},{\"another category\":[\"more example dishes\"]}]" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Okay, I'm ready! Please give me the wine descriptions. I'll do my best to provide accurate food pairings in the JSON format you've requested.  🍷🍴 \n" },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage(description);

    return result.response.text();
}

async function getPairingsForFood(foodDescription, wines) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "I will give you two inputs in the form of \"dish description: <dish description> wine list: <list of wines with description with the format identifier|name|grape|country|region|description|tag1,tag2,tag3>\". i want you to give me an ordered list of the wines by their identifier (i.e [3,2,5,1,4]) in the order of how good their pairing is for the given dish. If there is data missing, infer it from the data given." },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Please provide the two inputs in the format \"dish description: <dish description> wine list: <list of wines with description with the format name|grape|country|region|description|tag1,tag2,tag3>\" and I will do my best to give you an ordered list of the wines by their identifier in the order of how good their pairing is for the given dish. I will try my best to infer missing data where necessary." },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage("dish description: " + foodDescription + " wine list: " + wines);

    return result.response.text();
}

async function getTextFromImage(image) {
    const chatSession = model.startChat(
        generationConfig,
        history=[]
      )

    const [result] = await visionClient.textDetection(image);
    detectedText = result.fullTextAnnotation.text

    const instructions = {
        "instruction": "Extract standardized information from a wine label text.",
        "expected_output_format": {
          "name": "<name>", 
          "year": "<year>", 
          "grapes": "<grapes>", 
          "country": "<country>", 
          "region": "<region>", 
          "description": "<description>", 
          "tags": ["tag1", "tag2", "tag3", "..."] 
        },
        "output_type": "json",
        "allow_inference": true, 
        "inference_instructions": "If some information is not present on the label but you are confident in knowing it, include it in the output."
      }

    const response = await chatSession.sendMessage(JSON.stringify(instructions) + "\n" + detectedText);

    return response.response.text();
}

module.exports = {
    getPairingsForWine,
    getPairingsForFood,
    getTextFromImage,
};