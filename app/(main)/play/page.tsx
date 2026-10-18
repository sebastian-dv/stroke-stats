"use client"

import { useState } from "react"
import CourseSetup from "./_components/CourseSetup"
import HoleEntry from "./_components/HoleEntry"
import RoundSummary from "./_components/RoundSummary"
import type { CourseEntry, HoleEntry as HoleEntryData } from "./types"

export default function Page() {
    const [course, setCourse] = useState<CourseEntry | null>(null)
    const [holes, setHoles] = useState<HoleEntryData[]>([])
    // index into holes of the hole being entered
    const [currentHole, setCurrentHole] = useState(0)

    const roundFinished = course !== null && currentHole === course.numHoles

    function saveHole(hole: HoleEntryData) {
        setHoles(prev => {
            const next = [...prev]
            next[currentHole] = hole
            return next
        })
    }

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
                            key={currentHole}
                            course={course}
                            holeNumber={currentHole + 1}
                            initial={holes[currentHole]}
                            onSubmit={hole => {
                                saveHole(hole)
                                setCurrentHole(prev => prev + 1)
                            }}
                            onPrev={hole => {
                                if (hole) saveHole(hole)
                                setCurrentHole(prev => prev - 1)
                            }}
                        />
                    )}
                </section>
            </div>
        </div>
    )
}
