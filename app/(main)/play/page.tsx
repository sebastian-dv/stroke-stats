"use client"

import { useState } from "react"
import CourseSetup from "./_components/CourseSetup"
import HoleEntry from "./_components/HoleEntry"
import Scorecard from "./_components/Scorecard"
import type { CourseEntry, HoleEntry as HoleEntryData } from "./types"

export default function Page() {
    const [course, setCourse] = useState<CourseEntry | null>(null)
    // one slot per hole, null until that hole has been entered
    const [holes, setHoles] = useState<(HoleEntryData | null)[]>([])
    // index into holes of the hole being entered
    const [currentHole, setCurrentHole] = useState(0)
    const [showScorecard, setShowScorecard] = useState(false)

    function saveHole(hole: HoleEntryData | null) {
        if (!hole) return
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
                        <CourseSetup
                            onStart={course => {
                                setCourse(course)
                                setHoles(Array(course.numHoles).fill(null))
                            }}
                        />
                    ) : showScorecard ? (
                        <Scorecard
                            course={course}
                            holes={holes}
                            onSelectHole={index => {
                                setCurrentHole(index)
                                setShowScorecard(false)
                            }}
                        />
                    ) : (
                        <HoleEntry
                            key={currentHole}
                            course={course}
                            holeNumber={currentHole + 1}
                            initial={holes[currentHole] ?? undefined}
                            onGoToHole={(hole, index) => {
                                saveHole(hole)
                                setCurrentHole(index)
                            }}
                            onViewScorecard={hole => {
                                saveHole(hole)
                                setShowScorecard(true)
                            }}
                        />
                    )}
                </section>
            </div>
        </div>
    )
}
