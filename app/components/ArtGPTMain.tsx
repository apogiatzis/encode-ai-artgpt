import React, { FC, useState } from 'react';
import Form from './Form';
import { useAssistant } from 'ai/react';
import PaintingResponse from './PaintingResponse';
import { DEFAULT_THEME } from '../lib/constants';

interface ArtGPTMainProps { }

const ArtGPTMain: FC<ArtGPTMainProps> = () => {
  const { status, messages, setMessages, setInput, input, submitMessage, handleInputChange } =
    useAssistant({ api: '/api/gen/description' });
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const handleSubmitMessage = (event?: React.FormEvent<HTMLFormElement>, requestOptions?: {
    data?: Record<string, string>;
  }) => {
    setMessages([])
    setInput(input + " " + theme.prompt)
    return submitMessage(event, requestOptions);
  }

  return (<div className="z-10 w-full max-w-xl px-2.5 xl:px-0">
    <h1
      className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      ArtGPT
    </h1>
    <p
      className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
      style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
    >
      Generate detailed painting descriptions and images from a simple prompt!
    </p>
    <Form
      status={status}
      setInput={setInput}
      input={input}
      submitMessage={handleSubmitMessage}
      handleInputChange={handleInputChange}
      theme={theme}
      setTheme={setTheme}
    />

    {messages.length > 0 && <PaintingResponse messages={messages} />}

  </div>)
};

export default ArtGPTMain;
