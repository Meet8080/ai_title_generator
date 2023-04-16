import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState('')
  return (
    <div className="">
      <Head>
        <title>AI Title Generator</title>
        <meta
          name="description"
          content="Anyone can generate title for their projects"
        />
      </Head>
      <div className="max-w-7xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-center pb-2">
          Unique Title Generator
        </h2>
        <div className="flex justify-center gap-4 flex-col w-1/3 mx-auto">
          <div className="relative">
          <textarea
            rows={3}
            onChange={(e)=>setInput(e.target.value)}
            className="border-2 w-full border-gray-300 font-bold bg-white p-4 rounded-lg text-sm resize-none focus:outline-none"
            placeholder="Enter Your Project Title"
            value={input}
          />
          {/* Character Limit in bottom right of textarea */}
          <div className="absolute bottom-4 right-3 text-xs text-gray-400">
          <span>{input.length}</span>/30
          </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700
        text-white font-bold py-2 px-4 rounded"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
