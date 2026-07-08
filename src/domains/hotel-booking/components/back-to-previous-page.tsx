"use client"
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function BackToPreviousPage() {
  const router = useRouter();

  return (
    <div className="mb-8">
      <Button onClick={() => router.back()}
        variant="link"
        className="inline-flex items-center gap-1 text-zinc-800 hover:underline text-sm font-medium leading-0"
      >
        <ChevronLeft className="size-4" />
          Request to book
      </Button>
    </div>
  )
}
