import { AssistantResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
    ...(process.env.OPENAI_KEY && { apiKey: process.env.OPENAI_KEY }),
});

export const runtime = 'edge';

export async function POST(req: Request) {
    const { message } = await req.json();
    const thread = await openai.beta.threads.create();
    const createdMessage = await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: message
        }
    );

    return AssistantResponse(
        { threadId: thread.id, messageId: createdMessage.id },
        async ({ forwardStream, sendDataMessage }) => {
            const runStream = openai.beta.threads.runs.stream(thread.id, {
                assistant_id:
                    process.env.ASSISTANT_ID ??
                    (() => {
                        throw new Error('ASSISTANT_ID is not set');
                    })(),
            });

            let runResult = await forwardStream(runStream);

            while (
                runResult?.status === 'requires_action' &&
                runResult.required_action?.type === 'submit_tool_outputs'
            ) {
                const tool_outputs =
                    runResult.required_action.submit_tool_outputs.tool_calls.map(
                        (toolCall: any) => {
                            const parameters = JSON.parse(toolCall.function.arguments);

                            switch (toolCall.function.name) {
                                default:
                                    throw new Error(
                                        `Unknown tool call function: ${toolCall.function.name}`,
                                    );
                            }
                        },
                    );

                runResult = await forwardStream(
                    openai.beta.threads.runs.submitToolOutputsStream(
                        thread.id,
                        runResult.id,
                        { tool_outputs },
                    ),
                );
            }
        },
    );
}