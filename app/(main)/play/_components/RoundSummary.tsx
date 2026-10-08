"use client"

import type { CourseEntry, HoleEntry } from "../types"

interface RoundSummaryProps {
  course: CourseEntry
  holes: HoleEntry[]
}

export default function RoundSummary({ course, holes }: RoundSummaryProps) {
    const totalScore = holes.reduce((sum, hole) => sum + hole.score, 0)

    return (
        <h1 className="text-2xl font-bold text-text-dark mb-3">
            {course.courseName}: {totalScore}
        </h1>
    )
}
