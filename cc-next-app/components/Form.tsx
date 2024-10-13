import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CategoryDropdown from './CategoryDropdown';
import RecommenderDropdown from './RecommenderDropdown';

interface FormProps {
  onSubmit: (item: {
    url: string;
    title: string;
    category: string;
    recommender: string;
  }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [recommender, setRecommender] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ url, title, category, recommender });
    // Reset form
    setUrl('');
    setTitle('');
    setCategory('');
    setRecommender('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <CategoryDropdown value={category} onChange={setCategory} />
      <RecommenderDropdown value={recommender} onChange={setRecommender} />
      <Button type="submit">Add Item</Button>
    </form>
  );
};

export default Form;

