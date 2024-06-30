import { AssistantResponse } from 'ai';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    ...(process.env.OPENAI_KEY && { apiKey: process.env.OPENAI_KEY }),
});

export const runtime = 'edge';

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt.substring(0, 1000),
        n: 1,
        size: "1024x1024",
    });
    const image_url = response.data[0].url;
    return NextResponse.json({ image_url }, { status: 200 });
}