import { create } from 'zustand';

export interface Article {
  id: string;
  title: string;
  url: string;
  summary: string;
  selected: boolean;
}

interface BlogState {
  subject: string;
  ageRange: string;
  educationLevel: string;
  articles: Article[];
  generatedContent: string;
  isPreviewMode: boolean;
  setSubject: (subject: string) => void;
  setAgeRange: (ageRange: string) => void;
  setEducationLevel: (educationLevel: string) => void;
  setArticles: (articles: Article[]) => void;
  toggleArticleSelection: (id: string) => void;
  getSelectedArticles: () => Article[];
  setGeneratedContent: (content: string) => void;
  setIsPreviewMode: (isPreview: boolean) => void;
  updateGeneratedContent: (content: string) => void;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  subject: '',
  ageRange: '',
  educationLevel: '',
  articles: [],
  generatedContent: '',
  isPreviewMode: false,
  setSubject: (subject) => set({ subject }),
  setAgeRange: (ageRange) => set({ ageRange }),
  setEducationLevel: (educationLevel) => set({ educationLevel }),
  setArticles: (articles) => set({ articles }),
  toggleArticleSelection: (id) => {
    const selectedCount = get().articles.filter(a => a.selected).length;
    set((state) => ({
      articles: state.articles.map(article => {
        if (article.id === id) {
          if (!article.selected && selectedCount >= 2) return article;
          return { ...article, selected: !article.selected };
        }
        return article;
      })
    }));
  },
  getSelectedArticles: () => get().articles.filter(a => a.selected),
  setGeneratedContent: (content) => set({ generatedContent: content }),
  setIsPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),
  updateGeneratedContent: (content) => set({ generatedContent: content })
}));