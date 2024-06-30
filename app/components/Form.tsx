import React, { FC, useEffect, useRef, useState } from 'react';
import { DEFAULT_THEME } from '@/app/lib/constants';
import useEnterSubmit from '@/app/lib/hooks/user-enter-submit';
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import LoadingCircle from './LoadingCircle';
import Popover from './Popover';
import ThemePicker from './ThemePicker';
import { cn } from '../lib/utils';


interface FormProps {
  submitMessage: any;
  status: string;
  input: string;
  setInput: any;
  handleInputChange: any;
  theme: any;
  setTheme: any;
  promptValue?: string;
}

const Form: FC<FormProps> = ({ submitMessage, status, input, handleInputChange, setInput, theme, setTheme, promptValue }) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const [placeholderPrompt, setPlaceholderPrompt] = useState("A woman with pearly earings");
  const [openPopover, setOpenPopover] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (promptValue && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [promptValue]);

  const SubmitButton = () => {
    return (
      <button
        className={cn(
          "group rounded-lg p-2.5",
          status === "in_progress"
            ? "cursor-disabled bg-gray-100"
            : "transition-all hover:bg-gray-100 active:bg-gray-200",
        )}
        disabled={status === "in_progress"}
      >
        {status === "in_progress" ? (
          <LoadingCircle />
        ) : (
          <SendHorizonal className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        )}
      </button>
    );
  };

  return (<form
    ref={formRef}
    className="mx-auto mt-6 flex w-full max-w-xl animate-fade-up items-center space-x-2 rounded-lg border border-gray-200 bg-white px-1 py-2 opacity-0 shadow-md sm:px-2 sm:py-4"
    style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
    onSubmit={submitMessage}
  >
    <input className="hidden" name="themeUrl" value={theme.url} readOnly />
    <Popover
      content={
        <ThemePicker
          setTheme={setTheme}
          setOpenPopover={setOpenPopover}
        />
      }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button
        type="button"
        onClick={() => setOpenPopover((prev) => !prev)}
        className="cursor-pointer rounded-md p-1 transition-colors hover:bg-gray-100 active:bg-gray-200 sm:p-2"
      >
        <Image
          src={theme.url}
          alt="Theme"
          width={50}
          height={50}
          className="h-4 w-4 sm:h-5 sm:w-5"
          unoptimized
        />
      </button>
    </Popover>
    <textarea
      id="prompt"
      name="prompt"
      ref={textareaRef}
      value={input}
      autoFocus
      autoComplete="off"
      placeholder={placeholderPrompt}
      onChange={handleInputChange}
      onKeyDown={(e) => {
        if (e.key === "Tab" && e.currentTarget.value === "") {
          setInput(placeholderPrompt);
          e.preventDefault();
        }
        onKeyDown(e);
      }}
      className="flex-1 resize-none outline-none "
    />
    <SubmitButton />
  </form>
  )
};

export default Form;
