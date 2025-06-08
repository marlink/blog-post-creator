import React from 'react';
import { Check, X } from 'lucide-react';
import { useBlogStore, type Article } from '../store/blog-store';
import { cn } from '../lib/utils';

export function ArticleList() {
  const { articles, toggleArticleSelection } = useBlogStore();

  if (articles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No articles found. Start by entering your search parameters.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article: Article) => (
        <div
          key={article.id}
          className={cn(
            "p-4 border rounded-lg transition-colors",
            article.selected
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">{article.title}</h3>
              <p className="text-sm text-gray-500">{article.summary}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Read original →
              </a>
            </div>
            <button
              onClick={() => toggleArticleSelection(article.id)}
              className={cn(
                "p-2 rounded-full transition-colors",
                article.selected
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {article.selected ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}