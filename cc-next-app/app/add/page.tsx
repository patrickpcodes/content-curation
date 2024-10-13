'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'

export default function AddItem() {
  const router = useRouter()

  const handleSubmit = (item: {
    url: string;
    title: string;
    category: string;
    recommender: string;
  }) => {
    // Here we would typically make an API call to add the item
    console.log('Adding item:', item)
    // For now, we'll just redirect back to the home page
    router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Add New Item</h1>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}