import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="technology">Technology</SelectItem>
        <SelectItem value="science">Science</SelectItem>
        <SelectItem value="entertainment">Entertainment</SelectItem>
        {/* Add more categories as needed */}
      </SelectContent>
    </Select>
  );
};

export default CategoryDropdown;

