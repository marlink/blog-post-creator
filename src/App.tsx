import React, { useState } from 'react';
import { Search, Loader2, PenTool, Eye, Edit2 } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { ArticleList } from './components/ArticleList';
import { Editor } from './components/Editor';
import { useBlogStore } from './store/blog-store';
import { searchArticles, generateBlogPost } from './lib/api';
import { cn } from './lib/utils';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    subject,
    ageRange,
    educationLevel,
    setArticles,
    getSelectedArticles,
    generatedContent,
    isPreviewMode,
    setGeneratedContent,
    setIsPreviewMode,
    updateGeneratedContent
  } = useBlogStore();

  const handleSearch = async () => {
    if (!subject || !ageRange || !educationLevel) {
      alert('Please fill in all fields before searching');
      return;
    }

    setIsSearching(true);
    try {
      const searchQuery = `${subject} for ${ageRange} age range with ${educationLevel} education level`;
      const results = await searchArticles(searchQuery);
      setArticles(results.map(article => ({ ...article, selected: false })));
    } catch (error) {
      console.error('Error searching articles:', error);
      alert('Failed to search articles. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleGenerate = async () => {
    const selectedArticles = getSelectedArticles();
    if (selectedArticles.length !== 2) {
      alert('Please select exactly 2 articles before generating');
      return;
    }

    setIsGenerating(true);
    try {
      const content = await generateBlogPost({
        subject,
        ageRange,
        educationLevel,
        articles: selectedArticles
      });
      setGeneratedContent(content);
      setIsPreviewMode(true);
    } catch (error) {
      console.error('Error generating blog post:', error);
      alert('Failed to generate blog post. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Blog Post Creator</h1>
            <p className="mt-2 text-gray-600">Create engaging blog posts with AI assistance</p>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-8">
            {!isPreviewMode ? (
              <>
                {/* Input Section */}
                <InputSection />

                {/* Search Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md text-white transition-colors",
                      isSearching
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    )}
                  >
                    {isSearching ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                    {isSearching ? 'Searching...' : 'Search Articles'}
                  </button>
                </div>

                {/* Article List */}
                <div className="border-t pt-6">
                  <h2 className="text-xl font-semibold mb-4">Available Articles</h2>
                  <ArticleList />
                </div>

                {/* Generate Button */}
                <div className="flex justify-center pt-4 border-t">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-md text-white transition-colors",
                      isGenerating
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    {isGenerating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <PenTool className="w-5 h-5" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate Blog Post'}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Edit Your Blog Post</h2>
                  <button
                    onClick={() => setIsPreviewMode(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    <Edit2 className="w-4 h-4" />
                    Back to Search
                  </button>
                </div>
                <Editor
                  content={generatedContent}
                  onChange={updateGeneratedContent}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;