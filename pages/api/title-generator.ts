// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi } from "openai/dist/api";
// import { configuration } from "../../utils/Configuration";
import { configuration } from "@/utils/constant";
import { error } from "console";
// import { Configuration } from 'openai/dist/configuration';
type Data = {
  input: string;
};
const openai = new OpenAIApi(configuration);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `give me 10 clickbait for ${input} \n\n`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const suggestion = response.data?.choices?.[0].text;

  if (suggestion === undefined) throw new Error("Suggestion Not Found");
  res.status(200).json({ result: suggestion });
}
