'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import useDarkMode from '@/hooks/useDarkMode'
import Card from '@/components/Card'
import Link from 'next/link'
import { Tweet } from 'react-tweet'

// Dummy data for now
const dummyItems = [
  { id: '1', title: 'Test Video 1', url: 'https://www.youtube.com/watch?v=g2vcIRavtqY', thumbnail: 'https://img.youtube.com/vi/g2vcIRavtqY/0.jpg', category: 'Technology', recommender: 'Tester One', watched: false },
  { id: '2', title: 'Test Video 2', url: 'https://www.youtube.com/watch?v=_Q9OLNiQZxE', thumbnail: 'https://img.youtube.com/vi/_Q9OLNiQZxE/0.jpg', category: 'Science', recommender: 'Tester Two', watched: false },
  { id: '3', title: 'Test Video 3', url: 'https://www.youtube.com/watch?v=zHTeCSVAFNY', thumbnail: 'https://img.youtube.com/vi/zHTeCSVAFNY/0.jpg', category: 'Entertainment', recommender: 'Tester Three', watched: false },
  { id: '4', title: 'Test Video 4', url: 'https://www.youtube.com/watch?v=4zyZ3sw_ulc', thumbnail: 'https://img.youtube.com/vi/4zyZ3sw_ulc/0.jpg', category: 'Education', recommender: 'Tester Four', watched: false },
  { id: '5', title: 'Test Video 5', url: 'https://www.youtube.com/watch?v=S-xzYgTLVJE', thumbnail: 'https://img.youtube.com/vi/S-xzYgTLVJE/0.jpg', category: 'Music', recommender: 'Tester Five', watched: false },
  { id: '6', title: 'Test Video 6', url: 'https://www.youtube.com/watch?v=SxuwQJ0JHMU', thumbnail: 'https://img.youtube.com/vi/SxuwQJ0JHMU/0.jpg', category: 'Technology', recommender: 'Tester Six', watched: false },
  { id: '7', title: 'Test Video 7', url: 'https://www.youtube.com/watch?v=iXIwm4mCpuc', thumbnail: 'https://img.youtube.com/vi/iXIwm4mCpuc/0.jpg', category: 'Science', recommender: 'Tester Seven', watched: false },
  { id: '8', title: 'Test Video 8', url: 'https://www.youtube.com/watch?v=oYzZxi3SSnM', thumbnail: 'https://img.youtube.com/vi/oYzZxi3SSnM/0.jpg', category: 'Entertainment', recommender: 'Tester Eight', watched: false },
  { id: '9', title: 'Test Video 9', url: 'https://www.youtube.com/watch?v=iLo8svHzD_g', thumbnail: 'https://img.youtube.com/vi/iLo8svHzD_g/0.jpg', category: 'Education', recommender: 'Tester Nine', watched: false },
  { id: '10', title: 'Test Video 10', url: 'https://www.youtube.com/watch?v=IHIJFVUQyFY', thumbnail: 'https://img.youtube.com/vi/IHIJFVUQyFY/0.jpg', category: 'Music', recommender: 'Tester Ten', watched: false },
  { id: '11', title: 'Test Video 11', url: 'https://www.youtube.com/watch?v=BbUmLRaxZG8', thumbnail: 'https://img.youtube.com/vi/BbUmLRaxZG8/0.jpg', category: 'Technology', recommender: 'Tester Eleven', watched: false },
  { id: '12', title: 'Test Video 12', url: 'https://www.youtube.com/watch?v=XE1w52pNYr8', thumbnail: 'https://img.youtube.com/vi/XE1w52pNYr8/0.jpg', category: 'Science', recommender: 'Tester Twelve', watched: false },
  { id: '13', title: 'Test Video 13', url: 'https://www.youtube.com/watch?v=ZHMHQmCLakA', thumbnail: 'https://img.youtube.com/vi/ZHMHQmCLakA/0.jpg', category: 'Entertainment', recommender: 'Tester Thirteen', watched: false },
  { id: '14', title: 'Test Video 14', url: 'https://www.youtube.com/watch?v=WuKbZATHzVE', thumbnail: 'https://img.youtube.com/vi/WuKbZATHzVE/0.jpg', category: 'Education', recommender: 'Tester Fourteen', watched: false },
  { id: '15', title: 'Test Video 15', url: 'https://www.youtube.com/watch?v=43DQm2ObWSU', thumbnail: 'https://img.youtube.com/vi/43DQm2ObWSU/0.jpg', category: 'Music', recommender: 'Tester Fifteen', watched: false },
  { id: '16', title: 'Test Video 16', url: 'https://www.youtube.com/watch?v=eRtBIAx7sJc', thumbnail: 'https://img.youtube.com/vi/eRtBIAx7sJc/0.jpg', category: 'Technology', recommender: 'Tester Sixteen', watched: false },
  { id: '17', title: 'Test Video 17', url: 'https://www.youtube.com/watch?v=U7PvdYlvA-8', thumbnail: 'https://img.youtube.com/vi/U7PvdYlvA-8/0.jpg', category: 'Science', recommender: 'Tester Seventeen', watched: false },
  { id: '18', title: 'Test Video 18', url: 'https://www.youtube.com/watch?v=XVQwgeUWXVY', thumbnail: 'https://img.youtube.com/vi/XVQwgeUWXVY/0.jpg', category: 'Entertainment', recommender: 'Tester Eighteen', watched: false },
  { id: '19', title: 'Test Video 19', url: 'https://www.youtube.com/watch?v=ukam37umkQc', thumbnail: 'https://img.youtube.com/vi/ukam37umkQc/0.jpg', category: 'Education', recommender: 'Tester Nineteen', watched: false },
  { id: '20', title: 'Test Video 20', url: 'https://www.youtube.com/watch?v=3sdTztvaxhg', thumbnail: 'https://img.youtube.com/vi/3sdTztvaxhg/0.jpg', category: 'Music', recommender: 'Tester Twenty', watched: false },
  { id: '21', title: 'Test Video 21', url: 'https://www.youtube.com/watch?v=U96230YlSJA', thumbnail: 'https://img.youtube.com/vi/U96230YlSJA/0.jpg', category: 'Technology', recommender: 'Tester Twenty-One', watched: false },
  { id: '22', title: 'Test Video 22', url: 'https://www.youtube.com/watch?v=-46yTm4DoEI', thumbnail: 'https://img.youtube.com/vi/-46yTm4DoEI/0.jpg', category: 'Science', recommender: 'Tester Twenty-Two', watched: false },
  { id: '23', title: 'Test Video 23', url: 'https://www.youtube.com/watch?v=wIuP2RKy4z4', thumbnail: 'https://img.youtube.com/vi/wIuP2RKy4z4/0.jpg', category: 'Entertainment', recommender: 'Tester Twenty-Three', watched: false },
  { id: '24', title: 'Test Video 24', url: 'https://www.youtube.com/watch?v=bBMSL4vInYU', thumbnail: 'https://img.youtube.com/vi/bBMSL4vInYU/0.jpg', category: 'Education', recommender: 'Tester Twenty-Four', watched: false },
  { id: '25', title: 'Test Video 25', url: 'https://www.youtube.com/watch?v=jv7Z1Dd2B8M', thumbnail: 'https://img.youtube.com/vi/jv7Z1Dd2B8M/0.jpg', category: 'Music', recommender: 'Tester Twenty-Five', watched: false },
  { id: '26', title: 'Test Video 26', url: 'https://www.youtube.com/watch?v=mOaV5LwfzUE', thumbnail: 'https://img.youtube.com/vi/mOaV5LwfzUE/0.jpg', category: 'Technology', recommender: 'Tester Twenty-Six', watched: false },
  { id: '27', title: 'Test Video 27', url: 'https://www.youtube.com/watch?v=13Urq-AqH8M', thumbnail: 'https://img.youtube.com/vi/13Urq-AqH8M/0.jpg', category: 'Science', recommender: 'Tester Twenty-Seven', watched: false },
  { id: '28', title: 'Test Video 28', url: 'https://www.youtube.com/watch?v=5kI2wZWp4NU', thumbnail: 'https://img.youtube.com/vi/5kI2wZWp4NU/0.jpg', category: 'Entertainment', recommender: 'Tester Twenty-Eight', watched: false },
  { id: '29', title: 'Test Video 29', url: 'https://www.youtube.com/watch?v=4YzuN4MAFiQ', thumbnail: 'https://img.youtube.com/vi/4YzuN4MAFiQ/0.jpg', category: 'Education', recommender: 'Tester Twenty-Nine', watched: false },
  { id: '30', title: 'Test Video 30', url: 'https://www.youtube.com/watch?v=RYOG7W0fOK4', thumbnail: 'https://img.youtube.com/vi/RYOG7W0fOK4/0.jpg', category: 'Music', recommender: 'Tester Thirty', watched: false },
  { id: '31', title: 'Test Video 31', url: 'https://www.youtube.com/watch?v=pqqyDGmaVP8', thumbnail: 'https://img.youtube.com/vi/pqqyDGmaVP8/0.jpg', category: 'Technology', recommender: 'Tester Thirty-One', watched: false },
  { id: '32', title: 'Test Video 32', url: 'https://www.youtube.com/watch?v=0V4aeT7oONo', thumbnail: 'https://img.youtube.com/vi/0V4aeT7oONo/0.jpg', category: 'Science', recommender: 'Tester Thirty-Two', watched: false },
  { id: '33', title: 'Test Video 33', url: 'https://www.youtube.com/watch?v=vIR1Mqa8Lo8', thumbnail: 'https://img.youtube.com/vi/vIR1Mqa8Lo8/0.jpg', category: 'Entertainment', recommender: 'Tester Thirty-Three', watched: false },
  { id: '34', title: 'Test Video 34', url: 'https://www.youtube.com/watch?v=pBo2YLuPvCk', thumbnail: 'https://img.youtube.com/vi/pBo2YLuPvCk/0.jpg', category: 'Education', recommender: 'Tester Thirty-Four', watched: false },
]

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [items, setItems] = useState(dummyItems);

  const handleMarkWatched = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, watched: !item.watched } : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">
        Content Curation App
      </h1>
      <div data-theme="dark">
        <Tweet id="1845030992282571176" />
      </div>
      <div className="flex justify-between w-full mb-8">
        <Button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
        <Link href="/add">
          <Button>Add New Item</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <Card 
            key={item.id}
            {...item}
            onMarkWatched={handleMarkWatched}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  )
}
