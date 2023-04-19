import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length < 30) setError(false);
  }, [input]);

  // api request

  const submit = async () => {
    if (input.length > 30) return setError(true);
    setLoading(true);

    try {
      const res = await fetch("/api/title-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      const suggestion: { result: string } = await res.json();
      const { result } = suggestion;
      // console.log(data);
      setSuggestion(result);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <Head>
        <title>AI Title Generator</title>
        <meta
          name="description"
          content="Anyone can generate title for their projects"
        />
      </Head>
      <div className="max-w-8xl min-h-[80vh] py-12  flex justify-center items-center flex-col mt-[10vh]">
        <h1 className="text-4xl font-bold text-center pb-2">
          Unique Title Generator
        </h1>
        <h3 className="text-3xl  text-center mb-8">
          "Unleash Your Creativity with Our Unique Title Generator <br /> Find
          Your Perfect Headline!"
        </h3>

        <div className="flex justify-center gap-4 flex-col w-1/3 mx-auto">
          <div className="relative">
            {error && (
              <p className="pt-1 pb-1 text-red-600 text-sm">
                Characters limit exceeded
              </p>
            )}
            <textarea
              rows={3}
              onChange={(e) => setInput(e.target.value)}
              className="border-4 w-full text-[#fdfdd3] font-bold border-yellow-800 bg-black p-5 rounded-lg text-lg resize-none focus:outline-none"
              placeholder="Enter Your Project Title"
              value={input}
            />
            {/* Character Limit in bottom right of textarea */}
            <div
              className={`absolute bottom-4 right-3 text-xs ${
                error ? "text-red-500" : "text-gray-400"
              } `}
            >
              <span>{input.length}</span>/30
            </div>
          </div>
          <div className="flex justify-around">
            <button
              className="border-2 py-2 px-4 rounded-lg border-black"
              onClick={() => {
                setInput("Cricket");
                submit();
              }}
            >
              Cricket
            </button>
            <button
              className="border-2 py-2 px-4 rounded-lg border-black"
              onClick={() => setInput("Resume")}
            >
              Resume
            </button>
            <button
              className="border-2 py-2 px-4 rounded-lg border-black"
              onClick={() => setInput("Marvel")}
            >
              Marvel
            </button>
            <button
              className="border-2 py-2 px-4 rounded-lg border-black"
              onClick={() => setInput("Football")}
            >
              Football
            </button>
          </div>
          <button
            onClick={submit}
            className="bg-black hover:bg-blue-700
        text-[#fdfdd3] font-bold py-2 px-4 rounded"
          >
            {loading ? "..loading" : "Generate"}
          </button>

          {suggestion && (
            <div className="mt-8">
              <h2 className="text-lg pb-2 ">
                This could be the name of your project:
              </h2>
              {/* output for the request */}
              <div className="relative w-full rounded-md bg-black text-[#fdfdd3] p-2">
                {suggestion.split("\n").map((item) => (
                  <p className="p-1 ml-4">{item}</p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center gap-8">
          <div className="examples flex justify-between p-6 rounded-lg items-center flex-col text-white mt-12">
            <div>
              <div>
                <p className="text-center">Meet</p>
              </div>
              <div>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
              </div>
            </div>
          </div>

          <div className="examples flex justify-between p-6 rounded-lg items-center flex-col text-white mt-12">
            <div>
              <div>
                <p className="text-center">Meet</p>
              </div>
              <div>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
                <p>1. Get the Job You Want with These 10 Resume Writing Tips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
