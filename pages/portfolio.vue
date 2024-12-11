<template>
  <div class="container mx-auto p-6 dark:bg-gray-900 min-h-screen">
    <h1 class="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100 transition-colors">
      Transform Your Document into a Portfolio
    </h1>

    <!-- Tab Navigation -->
    <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-4" aria-label="Tabs">
        <button 
          v-for="tab in ['Upload', 'Editor', 'Preview']" 
          :key="tab"
          @click="activeTab = tab"
          :class="[
            activeTab === tab 
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300',
            'py-4 px-6 border-b-2 font-medium text-sm transition-all'
          ]"
        >
          {{ tab }}
        </button>
      </nav>
    </div>

    <!-- Upload Tab -->
    <div v-show="activeTab === 'Upload'" class="transition-all duration-300">
      <div class="transform hover:scale-102 transition-transform">
        <label class="flex flex-col items-center px-4 py-8 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer group">
          <div class="p-4 bg-blue-50 dark:bg-gray-700 rounded-full mb-4 group-hover:bg-blue-100 dark:group-hover:bg-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <span class="text-xl font-semibold mb-2">Drop your file here</span>
          <span class="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</span>
          <span class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
            Select PDF File
          </span>
          <input
            type="file"
            accept=".pdf"
            @change="handleFileUpload"
            class="hidden"
          />
        </label>
      </div>
    </div>

    <!-- Editor Tab -->
    <div v-show="activeTab === 'Editor'" class="transition-all duration-300">
      <div v-if="markdownContent" class="space-y-4">
        <div class="flex justify-end space-x-4">
          <button 
            @click="editMode = !editMode" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {{ editMode ? 'Preview Markdown' : 'Edit Content' }}
          </button>
          <button 
          @click="generateHtml" 
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Generate Portfolio
        </button>
        </div>
        
        <div v-if="editMode" class="transition-all">
            
          <textarea
            v-model="markdownContent"
            class="w-full h-[calc(100vh-300px)] p-6 border rounded-lg font-mono bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors resize-none"
            placeholder="Start editing your content..."
          ></textarea>
        </div>
        
        <div v-else class="prose dark:prose-invert max-w-none p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors">
          <MDPreview :source="markdownContent" />
        </div>
      </div>
    </div>

    <!-- Preview Tab -->
    <div v-show="activeTab === 'Preview'" class="transition-all duration-300">
      <div class="flex justify-end mb-4 space-x-4">
        <button 
          v-if="portfolio"
          @click="downloadHtml" 
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Download HTML
        </button>
        <button 
          v-if="portfolio"
          @click="regeneratePortfolio" 
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Regenerate
        </button>
      </div>
      
      <div v-if="portfolio" class="prose dark:prose-invert max-w-none p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors">
        <div v-html="portfolio" />
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 flex items-center space-x-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p class="text-lg text-gray-600 dark:text-gray-300">Transforming your document...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import mammoth from 'mammoth';
import { marked } from 'marked';

const file = ref(null);
const markdownContent = ref('');
const portfolio = ref('');
const loading = ref(false);
const editMode = ref(false);
const activeTab = ref('Upload');

const convertToMarkdown = (text) => {
  // Basic conversion of text to markdown format
  const lines = text.split('\n');
  let markdown = '';
  let inList = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      markdown += '\n';
      inList = false;
      continue;
    }

    // Detect headings (lines followed by empty lines)
    if (!inList && lines.indexOf(line) < lines.length - 1 && !lines[lines.indexOf(line) + 1].trim()) {
      markdown += `## ${trimmedLine}\n\n`;
      continue;
    }

    // Detect list items
    if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || /^\d+\./.test(trimmedLine)) {
      if (!inList) {
        markdown += '\n';
        inList = true;
      }
      markdown += `- ${trimmedLine.replace(/^[•\-\d+\.\s]+/, '')}\n`;
      continue;
    }

    // Regular paragraph
    if (inList) {
      markdown += '\n';
    }
    markdown += `${trimmedLine}\n`;
    inList = false;
  }

  return markdown;
};

const handleFileUpload = async (e) => {
  const uploadedFile = e.target.files[0];
  file.value = uploadedFile;
  
  try {
    loading.value = true;
    let extractedText = '';
    
    if (uploadedFile.type === 'application/pdf') {
      // Handle PDF with improved structure retention
      const fileReader = new FileReader();
      fileReader.onload = async function() {
        const pdf = await window.pdfjsLib.getDocument(this.result).promise;
        let fullText = '';
        
        // Process all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Group text items by their y-position to maintain line structure
          const lineMap = new Map();
          textContent.items.forEach(item => {
            const yPos = Math.round(item.transform[5]); // y-position
            if (!lineMap.has(yPos)) {
              lineMap.set(yPos, []);
            }
            lineMap.get(yPos).push(item.str);
          });

          // Sort by y-position (top to bottom) and join text items
          const sortedYPos = Array.from(lineMap.keys()).sort((a, b) => b - a);
          sortedYPos.forEach(yPos => {
            const lineText = lineMap.get(yPos).join(' ').trim();
            if (lineText) {
              fullText += lineText + '\n';
            }
          });
          
          // Add page break if not last page
          if (pageNum < pdf.numPages) {
            fullText += '\n---\n\n';
          }
        }
        
        extractedText = fullText;
        markdownContent.value = convertToMarkdown(extractedText);
        activeTab.value = 'Editor'; // Switch to Editor tab after upload
      };
      fileReader.readAsArrayBuffer(uploadedFile);
    } else if (uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Handle DOCX
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      extractedText = result.value;
      markdownContent.value = convertToMarkdown(extractedText);
      activeTab.value = 'Editor'; // Switch to Editor tab after upload
    }
  } catch (error) {
    console.error('Error processing file:', error);
  } finally {
    loading.value = false;
  }
};

const generateHtml = async () => {
  try {
    loading.value = true;
    const response = await fetch('/api/generate-portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markdownContent: markdownContent.value
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate portfolio');
    }

    const data = await response.json();
    portfolio.value = data.html;
    activeTab.value = 'Preview'; // Switch to Preview tab after generation
  } catch (error) {
    console.error('Error generating portfolio:', error);
    // You might want to add error handling UI here
  } finally {
    loading.value = false;
  }
};

const downloadHtml = () => {
  const blob = new Blob([portfolio.value], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio.html';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const regeneratePortfolio = () => {
  portfolio.value = '';
  generateHtml();
};
</script>

<style>
.prose {
  max-width: none;
}

@media (prefers-color-scheme: dark) {
  .prose {
    --tw-prose-body: theme('colors.gray.200');
    --tw-prose-headings: theme('colors.gray.100');
    --tw-prose-links: theme('colors.blue.400');
    --tw-prose-bold: theme('colors.gray.100');
    --tw-prose-counters: theme('colors.gray.400');
    --tw-prose-bullets: theme('colors.gray.400');
    --tw-prose-quotes: theme('colors.gray.200');
    --tw-prose-code: theme('colors.gray.200');
    --tw-prose-hr: theme('colors.gray.700');
    --tw-prose-th-borders: theme('colors.gray.700');
    --tw-prose-td-borders: theme('colors.gray.700');
  }
}
</style>