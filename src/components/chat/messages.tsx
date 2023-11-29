import { useContext, useEffect, useRef } from "react"
import { Loader2, MessageSquare } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import { useIntersection } from "@mantine/hooks"

import { trpc } from "@/app/_trpc/client"
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"

import Message from "@/components/chat/message"
import { ChatContext } from "@/components/chat/chat-context"

interface MessagesProps {
  fileId: string
}

const Messages = ({ fileId }: MessagesProps) => {
  const { isLoading: isAiThinking } = useContext(ChatContext)

  const { data, isLoading, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      }
    )

  const messages = data?.pages.flatMap((page) => page.messages)

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: "loading-message",
    isUserMessage: false,
    text: (
      <span className="flex h-full item-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    ),
  }

  const combineMessages = [
    ...(isAiThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ]

  const lastMessageRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {combineMessages && combineMessages.length > 0 ? (
        combineMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combineMessages[i - 1]?.isUserMessage ===
            combineMessages[i]?.isUserMessage

          if (i === combineMessages.length - 1) {
            return (
              <Message
                ref={ref}
                key={message.id}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
              />
            )
          } else {
            return (
              <Message
                key={message.id}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
              />
            )
          }
        })
      ) : isLoading ? (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <h3 className="font-semibold text-xl">You&apos;re all set!</h3>
          <p className="text-zinc-500 text-sm">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  )
}

export default Messages
