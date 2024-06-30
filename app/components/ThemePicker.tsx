import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const patterns = [
    {
        url: "nature_landscape.webp",
        label: "Nature and Landscape",
        prompt: "Adapt the user's input to describe a serene landscape painting with natural elements such as mountains, trees, and a flowing river. Emphasize the harmony of the natural environment."
    },
    {
        url: "portraits.webp",
        label: "Portraits and Human Figures",
        prompt: "Adapt the user's input to describe a painting of a human figure in a thoughtful pose. Highlight the expression, emotion, and details that convey the person's character."
    },
    {
        url: "mythology.webp",
        label: "Historical and Mythological",
        prompt: "Adapt the user's input to describe a painting depicting a dramatic historical or mythological scene. Focus on the legendary characters and the intense moment captured."
    },
    {
        url: "abstract.webp",
        label: "Abstract and Surrealism",
        prompt: "Adapt the user's input to describe an abstract painting filled with geometric shapes and patterns. Emphasize the imaginative composition and the interplay of forms."
    },
    {
        url: "still_life.webp",
        label: "Still Life",
        prompt: "Adapt the user's input to describe a still life painting featuring a balanced arrangement of flowers, fruits, and household items. Highlight the textures and composition of the objects."
    },
];

export default function PatternPicker({
    setTheme,
    setOpenPopover,
}: {
    setTheme: Dispatch<SetStateAction<{ url: string, label: string, prompt: string}>>;
    setOpenPopover: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div className="w-full overflow-auto md:max-w-xl">
            <div className="p-4">
                <p className="py-2 font-display text-xl text-gray-700">
                    Choose a painting theme
                </p>
                <div className="grid grid-cols-4 gap-3">
                    {patterns.map((p) => (
                        <button
                            key={p.url}
                            type="button"
                            onClick={() => {
                                setTheme(p);
                                setOpenPopover(false);
                            }}
                            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-500"
                        >
                            <div className="relative">
                                <Image
                                    src={p.url}
                                    alt={p.label}
                                    width={400}
                                    height={400}
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
                                    <span className="text-white text-xs">{p.label}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="border-t border-gray-300" />
        </div>
    );
}