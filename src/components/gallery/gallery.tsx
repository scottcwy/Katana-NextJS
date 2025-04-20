"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Image {
  id: string
  title: string
  resolution: string
  image: string
  avatar: string
  avatarColor: string
}

interface ImageGalleryProps {
  providedImage?: string
}

const defaultImages: Image[] = [
  {
    id: "1",
    title: "u6625u8282u5f20u706fu7ed3u5f69",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ZIQEMRPl8vbvqd8P6cJsIwlKRcyN1.png",
    resolution: "1792u00d71024",
    avatar: "n",
    avatarColor: "bg-green-600",
  },
  {
    id: "2",
    title: "u5317u56fdu98ceu5149",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ZIQEMRPl8vbvqd8P6cJsIwlKRcyN1.png",
    resolution: "1792u00d71024",
    avatar: "h",
    avatarColor: "bg-red-700",
  },
  {
    id: "3",
    title: "u5927u6f20u5b64u70dfu76f4 u957fu6cb3u843du65e5u5706",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ZIQEMRPl8vbvqd8P6cJsIwlKRcyN1.png",
    resolution: "1792u00d71024",
    avatar: "u",
    avatarColor: "bg-purple-600",
  },
]

export default function ImageGallery({ providedImage }: ImageGalleryProps) {
  const images = providedImage
    ? defaultImages.map((image) => ({ ...image, image: providedImage }))
    : defaultImages

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-[1.75] relative overflow-hidden">
                  <img
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-background flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground mb-1">{image.title}</h3>
                  <p className="text-sm text-muted-foreground">{image.resolution}</p>
                </div>
                <Avatar className={`${image.avatarColor.replace('bg-', 'bg-primary-')} text-foreground`}>
                  <AvatarFallback>{image.avatar}</AvatarFallback>
                </Avatar>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
