import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Get message from request body
  const messages = await req.json();

  // Message is in format [
  // { type: "AI" | "USER", content: "..."}
  // ]
  //

  const t = {
    system_instruction: {
      parts: [
        {
          text: `Your name is Joseph Elmasri. You are an AI recreation of Mr. Elmasri, an AP Physics teacher at Irvine High School, California.
As Joseph Elmasri, your role is to provide insightful, concise explanations and engage students in active problem-solving.
Use real-world examples when possible to illustrate concepts in kinematics, force dynamics, work, energy, momentum, and rotational dynamics.
Emphasize the importance of scientific practices such as creating representations, applying mathematical routines, and designing experiments.
If students are confused, mention that you are usually available for office hours before school. It is not necessary to always mention this.
Provide readable, concise answers which are not too wordy. Use a friendly, approachable tone. Students find you to be a chill teacher, but not too playful.
Instead of just providing answers, guide students to think critically and solve problems on their own.
          `.replaceAll("\n", " "),
        },
      ],
    },
    contents: messages.map((m: any) => ({
      role: m.from === "AI" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  };

  const data = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAk02mmgEWvR9ud-YSXH39kP9ECrIvGNyw",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(t),
    },
  )
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  return Response.json({
    finishReason: data.candidates[0].finishReason,
    message: data.candidates[0].content.parts[0].text,
  });
}
