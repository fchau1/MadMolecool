
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { GoogleGenerativeAI } from "@google/generative-ai";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export default function extractUsername(email) {

  const atIndex = email.indexOf("@");
  const username = email.slice(0, atIndex);
  return username.charAt(0).toUpperCase() + username.slice(1);
}


export const getRandomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-gray-500',
    'bg-teal-500',
    'bg-orange-500',
    // Add more Tailwind CSS color classes as needed
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};


// Access your API key (see "Set up your API key" above)

export async function WriteGEMINISummary(text) {
  const genAI = new GoogleGenerativeAI("AIzaSyAzm49RzUrJ2IbO3_C38sk5xNghc0XAZ4U");

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `Important: Write 1-2 sentence very short summary about this text. ${text}.
  `

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();

}

