import { Message } from 'ai';
import React, { FC, useState } from 'react';


interface PaintingResponseProps {
  messages: Message[]
}

const PaintingResponse: FC<PaintingResponseProps> = ({ messages }) => {

  const [imageUrl, setImageUrl] = useState("/placeholder.svg");
  const [imageLoading, setImageLoading] = useState(false);

  const handleGenerateImage = async () => {
    setImageLoading(true);
    const res = await fetch("/api/gen/image", {
      method: 'POST',
      body: JSON.stringify({
        prompt: messages.at(-1)?.content
      }),
    });
    const responseJson = await res.json();
    console.log(responseJson);
    setImageUrl(responseJson.image_url);
    setImageLoading(false);
  };

  return (
    <div className="rounded-lg bg-white mt-8 border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <a className="group relative block overflow-hidden rounded-t-lg" href="#">
        <img
          src={imageUrl}
          alt="Card image"
          className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleGenerateImage}
        >
          Generate Image
        </div>

        {/* Loading Indicator */}
        {
          imageLoading && (<div className='w-full'>
            <div className='h-1 w-full bg-pink-100 overflow-hidden'>
              <div className='animate-progress w-full h-full bg-gray-600 origin-left-right'></div>
            </div>
          </div>)
        }

      </a>
      <div className="p-4 max-h-[200px] overflow-y-auto">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-gray-500 text-sm">
            {messages.map((m: Message) => (
              <div key={m.id}>
                {m.role === 'assistant' && m.content}
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
};

export default PaintingResponse;
