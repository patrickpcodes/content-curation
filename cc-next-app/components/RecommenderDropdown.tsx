import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RecommenderDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const RecommenderDropdown: React.FC<RecommenderDropdownProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a recommender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="john">John Doe</SelectItem>
        <SelectItem value="jane">Jane Smith</SelectItem>
        <SelectItem value="bob">Bob Johnson</SelectItem>
        {/* Add more recommenders as needed */}
      </SelectContent>
    </Select>
  );
};

export default RecommenderDropdown;