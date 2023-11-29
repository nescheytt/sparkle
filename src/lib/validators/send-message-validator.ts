import { z } from "zod"

export const SendMessaageValidator = z.object({
  fileId: z.string(),
  message: z.string(),
})
