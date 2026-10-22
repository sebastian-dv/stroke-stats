"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import type { HoleEntry } from "@/app/(main)/play/types"

interface RoundData {
  courseName: string
  par: number
  totalScore: number
  holes: HoleEntry[]
}

export async function createRound(data: RoundData) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) throw new Error("Not authenticated")

  const round = await prisma.round.create({
    data: {
      courseName: data.courseName,
      par: data.par,
      totalScore: data.totalScore,
      userId: session.user.id,
      holes: {
        create: data.holes
      }
    }
  })

  return round
}