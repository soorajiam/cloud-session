import { defineEventHandler, readBody, createError } from 'h3';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {
  try {
    const { markdownContent } = await readBody(event);

    if (!markdownContent) {
      throw createError({
        statusCode: 400,
        message: 'Markdown content is required'
      });
    }

    const prompt = `
    Create a beautiful portfolio website for the following resume:

Resume:
${markdownContent}

use tailwind css. Use appropriate colour scheme and support dark mode. Reply only with the HTML code Do not add any other text or annotation`;

    if (!process.env.OPENAI_API_KEY) {
      throw createError({
        statusCode: 500,
        message: 'OpenAI API key is not configured'
      });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert web developer and UI/UX designer specializing in creating stunning portfolio websites. Your task is to generate a modern, responsive portfolio website using Tailwind CSS with the following requirements:

1. Create a single-page design that smoothly scrolls between sections
2. Include a fixed navigation bar with smooth scroll to sections
3. Design sections for:
   - Hero section with a professional headline and brief intro
   - About section highlighting key professional attributes
   - Skills section using creative visual representations
   - Experience section with timeline or cards for each role
   - Education section styled consistently with experience
   - Projects/Portfolio section showcasing key work
   - Contact section with social links
   Add more sections if appropriate

4. Implement these specific features:
   - Smooth scroll animations and transitions
   - Interactive hover effects and micro-interactions
   - Clear typography and content hierarchy  
   - Balanced spacing and layout
   - Dark mode support
   - Mobile-first responsive design
   - Semantic and accessible HTML
   - Performance optimized

5. Design Guidelines:
   - Allow for creative visual elements and styling
   - Focus on readability and user experience
   - Enable customization of the color scheme
   - Maintain consistent visual language

Create an elegant and engaging portfolio that highlights the content while allowing for creative expression in the visual design. Focus on crafting a delightful user experience through thoughtful interactions and transitions.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 1,
      max_tokens: 8000
    }).catch(error => {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw error;
    });

    if (!completion?.data?.choices?.[0]?.message?.content) {
      throw createError({
        statusCode: 500,
        message: 'Invalid response from OpenAI'
      });
    }

    const html = completion.data.choices[0].message.content;
    // Parse out HTML content if wrapped in ```html ``` tags
    const cleanHtml = html.replace(/^```html\s*|\s*```$/g, '').trim();
    return { html: cleanHtml || html };
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error generating portfolio'
    });
  }
}); 