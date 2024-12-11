import { defineEventHandler, readBody } from 'h3';
import { marked } from 'marked';

export default defineEventHandler(async (event) => {
  const { markdown } = await readBody(event);

  try {
    const html = marked(markdown);
    return { html };
  } catch (error) {
    console.error('Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Error converting markdown to HTML'
    });
  }
}); 