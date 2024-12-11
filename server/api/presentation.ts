import { defineEventHandler } from 'h3'
import presentationData from '../../content/presentation.json'

export default defineEventHandler(() => {
  console.log('API endpoint called')
  console.log('Presentation data:', JSON.stringify(presentationData, null, 2))
  
  // Return the data with proper headers
  return {
    slides: presentationData.slides
  }
}) 