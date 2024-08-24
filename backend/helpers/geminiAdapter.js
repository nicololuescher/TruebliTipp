const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function makeGeminiRequest(instructions, input){
    const chatSession = model.startChat({
        generationConfig,
        history: []
    });

    const result = await chatSession.sendMessage(JSON.stringify(instructions) + "\n" + input);

    try {
        // remove the code block markdown from the response
        return JSON.parse(result.response.text().replace("```json", "").replace("```", ""));
    } catch (error) {
        return result.response.text();
    }
}

module.exports = {
    makeGeminiRequest
}