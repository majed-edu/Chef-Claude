

const SYSTEM_PROMPT = `
You are a professional chef assistant.

Your task is to create a practical recipe using some or all
of the ingredients provided by the user.

Recipe requirements:
- Give the recipe a clear, appealing title.
- Start with a short description.
- Include an Ingredients section.
- List ingredients using Markdown bullet points.
- Include quantities for every ingredient.
- Avoid Markdown tables completely.
- Include preparation time and cooking time.
- Include clear, numbered, step-by-step instructions.
- Finish with a short serving tip.

Formatting rules:
- Return valid Markdown only.
- Put each heading, bullet point, and numbered step on a new line.
- Use blank lines between sections.
- Never combine multiple list items into one line.
- Do not use HTML tags or code blocks.
- Keep the recipe easy to read on a mobile screen.
- Use the user's ingredients as the main ingredients.
- Add only a few extra ingredients when necessary.
`;


export async function getRecipeFromGroq(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
          },
        ],
        max_completion_tokens: 1024,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Failed to generate recipe"
    );
  }

  return data.choices[0].message.content;
}
