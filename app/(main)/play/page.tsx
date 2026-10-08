"use client"

import { useState } from "react"
import CourseSetup from "./_components/CourseSetup"
import HoleEntry from "./_components/HoleEntry"
import RoundSummary from "./_components/RoundSummary"
import type { CourseEntry, HoleEntry as HoleEntryData } from "./types"

export default function Page() {
    const [course, setCourse] = useState<CourseEntry | null>(null)
    const [holes, setHoles] = useState<HoleEntryData[]>([])

    const roundFinished = course !== null && holes.length === course.numHoles

    return (
        <div>
            <div className="max-w-2xl mx-auto px-4 py-6">
                <section className="bg-card rounded-2xl shadow-2xl p-6 mb-8">
                    {course === null ? (
                        <CourseSetup onStart={setCourse} />
                    ) : roundFinished ? (
                        <RoundSummary course={course} holes={holes} />
                    ) : (
                        <HoleEntry
                            key={holes.length}
                            course={course}
                            holeNumber={holes.length + 1}
                            onSubmit={hole => setHoles(prev => [...prev, hole])}
                        />
                    )}
                </section>
            </div>
        </div>
    )
}
