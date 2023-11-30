import { Metadata, Viewport } from "next"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`
  return `https://localhost:${process.env.PORT ?? 3000}${path}`
}

export function constructMetadata({
  title = "Sparkle - Chat with your documents in seconds",
  description = "Sparkle allows you to have conversations with any PDF document. Simply upload your file and start asking questions right away.",
  image = "/thumbnail.png",
  icons = "/favicon.icon",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@nahueesch",
    },
    icons,
    metadataBase: new URL("https://sparkle-six.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export function constructViewport(): Viewport {
  return {
    themeColor: "#FFF",
  }
}
