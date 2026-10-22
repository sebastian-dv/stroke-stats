"use client"

import Button from "@/components/Button"
import { createRound } from "@/app/actions/rounds"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import type { CourseEntry, HoleEntry } from "../types"

interface ScorecardProps {
  course: CourseEntry
  // one slot per hole, null if not entered yet
  holes: (HoleEntry | null)[]
  onSelectHole: (index: number) => void
}

function sum(holes: (HoleEntry | null)[], key: "par" | "score") {
    return holes.reduce((total, hole) => total + (hole?.[key] ?? 0), 0)
}

function formatToPar(diff: number) {
    if (diff === 0) return "E"
    return diff > 0 ? `+${diff}` : String(diff)
}

// circle for under par, square for over, like a paper scorecard
function scoreMarker(hole: HoleEntry) {
    const diff = hole.score - hole.par
    if (diff <= -2) return "rounded-full ring-2 ring-fairway ring-offset-2 ring-offset-card border border-fairway"
    if (diff === -1) return "rounded-full border border-fairway"
    if (diff === 1) return "border border-text-dark"
    if (diff >= 2) return "border-3 border-double border-text-dark"
    return ""
}

const cell = "h-8 flex items-center justify-center"

interface NineProps {
  holes: (HoleEntry | null)[]
  // index of the first hole in this nine
  start: number
  totalLabel: string
  onSelectHole: (index: number) => void
}

function Nine({ holes, start, totalLabel, onSelectHole }: NineProps) {
    return (
        <div className="flex text-sm text-text-dark mb-4">
            <div className="flex flex-col font-semibold text-text-muted pr-2">
                <span className={cell}>Hole</span>
                <span className={cell}>Par</span>
                <span className={cell}>Score</span>
            </div>

            {holes.map((hole, i) => (
                <button
                    key={start + i}
                    onClick={() => onSelectHole(start + i)}
                    className="flex-1 flex flex-col rounded-lg hover:bg-text-dark/10 cursor-pointer transition-colors"
                >
                    <span className={`${cell} font-semibold text-text-muted`}>{start + i + 1}</span>
                    <span className={cell}>{hole?.par ?? "–"}</span>
                    <span className={cell}>
                        {hole ? (
                            <span className={`w-7 h-7 flex items-center justify-center ${scoreMarker(hole)}`}>
                                {hole.score}
                            </span>
                        ) : "–"}
                    </span>
                </button>
            ))}

            <div className="flex flex-col font-semibold pl-2 border-l border-rough/20">
                <span className={`${cell} text-text-muted`}>{totalLabel}</span>
                <span className={cell}>{sum(holes, "par")}</span>
                <span className={cell}>{sum(holes, "score")}</span>
            </div>
        </div>
    )
}

export default function Scorecard({ course, holes, onSelectHole }: ScorecardProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const enteredHoles = holes.filter(hole => hole !== null)
    const complete = enteredHoles.length === course.numHoles
    const totalScore = sum(holes, "score")
    const enteredPar = sum(holes, "par")

    function submit() {
        setError(null)
        startTransition(async () => {
            try {
                await createRound({
                    courseName: course.courseName,
                    par: course.par,
                    totalScore,
                    holes: enteredHoles,
                })
                router.push("/dashboard")
            } catch {
                setError("Couldn't save the round. Try again.")
            }
        })
    }

    return (
        <>
            <div className="flex items-baseline justify-between mb-4">
                <h1 className="text-2xl font-bold text-text-dark">{course.courseName || "Scorecard"}</h1>
                {enteredHoles.length > 0 && (
                    <p className="text-lg font-semibold text-text-dark">
                        {totalScore}{" "}
                        <span className="text-text-muted">({formatToPar(totalScore - enteredPar)})</span>
                    </p>
                )}
            </div>

            <Nine
                holes={holes.slice(0, 9)}
                start={0}
                totalLabel={course.numHoles === 9 ? "Tot" : "Out"}
                onSelectHole={onSelectHole}
            />
            {course.numHoles === 18 && (
                <Nine 
                    holes={holes.slice(9)} 
                    start={9} 
                    totalLabel="In" 
                    onSelectHole={onSelectHole} 
                />
            )}

            <Button disabled={!complete || isPending} onClick={submit}>
                {isPending ? "Submitting..." : "Submit Round"}
            </Button>
            {!complete && (
                <p className="text-sm text-text-muted text-center mt-2">
                    Score every hole to submit ({enteredHoles.length}/{course.numHoles})
                </p>
            )}
            {error && <p className="text-sm text-red-700 text-center mt-2">{error}</p>}
        </>
    )
}
