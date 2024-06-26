const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')
dotenv.config()
const readline = require('readline');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInterface.prompt()

userInterface.on('line', async input => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});
  
    const result = await model.generateContentStream([input]);
    for await(const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
    }
})




