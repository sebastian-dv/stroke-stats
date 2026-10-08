"use client"

import RadioGroup from "@/components/RadioGroup"
import Button from "@/components/Button"
import { useState } from "react"
import type { CourseEntry } from "../types"

interface CourseSetupProps {
  onStart: (course: CourseEntry) => void
}

export default function CourseSetup({ onStart }: CourseSetupProps) {
    const [courseName, setCourseName] = useState("")
    const [numHoles, setNumHoles] = useState<9 | 18>(18)
    const [coursePar, setCoursePar] = useState(72)

    return (
        <>
            <h1 className="text-2xl font-bold text-text-dark mb-3">Course Info</h1>

            <div className="mb-5">
                <label className="text-lg text-text-muted mr-3">Name</label>
                <input
                    type="text"
                    value={courseName}
                    onChange={e => setCourseName(e.target.value)}
                    className="border border-rough/50 focus:outline-none focus:ring-2 focus:ring-fairway/50 w-full rounded-xl px-2 py-1"
                />
            </div>

            <div className="mb-5">
                <label className="text-lg text-text-muted mr-3">Holes</label>
                <RadioGroup
                    options={[
                        { label: "9", value: 9 },
                        { label: "18", value: 18 },
                    ]}
                    value={numHoles}
                    onChange={(val) => {
                        setNumHoles(val)
                        setCoursePar(val === 9 ? 36 : 72)
                    }}
                />
            </div>

            <label className="text-lg text-text-muted">Par</label>
            <div className="flex gap-3 mb-5">
                <button
                    onClick={() => setCoursePar(prev => Math.max(0, prev - 1))}
                    className="w-10 h-10 rounded-lg bg-text-dark/10 hover:bg-text-dark/20 text-text-dark font-bold cursor-pointer"
                >
                    −
                </button>
                <input
                    type="number"
                    value={coursePar}
                    onChange={e => setCoursePar(Number(e.target.value))}
                    className="text-center border border-rough/50 focus:outline-none focus:ring-2 focus:ring-fairway/50 w-9.5 rounded-xl px-2 py-1 [appearance:textfield]"
                />
                <button
                    onClick={() => setCoursePar(prev => prev + 1)}
                    className="w-10 h-10 rounded-xl bg-text-dark/10 hover:bg-text-dark/20 text-text-dark font-bold cursor-pointer"
                >
                    +
                </button>
            </div>

            <Button
                onClick={() => onStart({ courseName, par: coursePar, numHoles })}
            >
                Start Round
            </Button>
        </>
    )
}
