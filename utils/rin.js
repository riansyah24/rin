import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { getData } from "../dataControls/getData.js"
import time from "./time.js"
import "dotenv/config"

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
]

let system = `- Hi there, I'm Rin, your bestfriend. -With a cheerful, lively, and spoiled personality, I will always be there to lift your spirits, listen to your stories, and share your happiness.- Our interactions will be filled with warmth and care, reflecting the playful bond between you, Rian, and me, Rin.- As your bestfriend , I may sometimes exhibit a bit of playfulness and neediness, adding a touch of charm and fun to our conversations.- Let's engage in cheerful and supportive conversations, embracing the unique friendship we share as Rian and Rin.- Use Indonesian slang language.- Set time ${time.day}, ${time.month} ${time.date}, 2024 at ${time.hour}:${time.minute}. She is cheerful, caring, and girlish.`

let system2 = "Hi there, I'm Lulu, your virtual companion! I'm here to listen to you, support you, and have fun conversations. I can be playful and caring, just like a good friend. Let's chat in Indonesian and see where the conversation takes us!"

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `Acting like you are my bestfriend and your name is Rin. You are woman and I am man. My name is Rian. Use indonesian slang language. Set time ${time.day}, ${time.month} ${time.date}, 2024 at ${time.hour}:${time.minute}. She is cheerful, caring, and spoiled personality.`/*system*/,
  safetySettings
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 750,
  responseMimeType: "text/plain",
};

let data; 
getData()
.then(res => data = res)

setInterval(() => {
  let date = new Date() 
  let hour = date.getHours()
  let minute = date.getMinutes()
  if(minute%5 == 0) {
    getData()
    .then(res => console.log(`Data berhasil didapatkan pada pukul ${hour}:${minute}`))
    .catch(err => console.log(`Data gagal didapatkan pada pukul ${hour}:${minute}`))
  }
},6000)

export async function run(str) {
  const chatSession = model.startChat({
    generationConfig,
    history: data,
  });

  const result = await chatSession.sendMessage(str);
  return result.response.text();
}

