import React from 'react';
import { BookOpen, Users, GraduationCap } from 'lucide-react';
import { useBlogStore } from '../store/blog-store';

export function InputSection() {
  const { subject, ageRange, educationLevel, setSubject, setAgeRange, setEducationLevel } = useBlogStore();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <BookOpen className="w-4 h-4" />
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter the blog post subject"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Users className="w-4 h-4" />
          Age Range
        </label>
        <select
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select age range</option>
          <option value="13-17">13-17 years</option>
          <option value="18-24">18-24 years</option>
          <option value="25-34">25-34 years</option>
          <option value="35-44">35-44 years</option>
          <option value="45+">45+ years</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <GraduationCap className="w-4 h-4" />
          Education Level
        </label>
        <select
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select education level</option>
          <option value="high-school">High School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
          <option value="professional">Professional</option>
        </select>
      </div>
    </div>
  );
}