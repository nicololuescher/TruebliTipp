const vision = require('@google-cloud/vision');

const visionClient = new vision.ImageAnnotatorClient({ apiKey: process.env.GEMINI_API_KEY });

async function extractTextFromImage(base64Image) {
    // remove prefix from base64 image
    const [result] = await visionClient.textDetection({ image: { content: base64Image.replace(/^data:image\/jpeg;base64,/, "")} });
    return result.fullTextAnnotation.text
}

module.exports = {
    extractTextFromImage
}