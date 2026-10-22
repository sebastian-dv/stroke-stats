"use client"

import RadioGroup from "@/components/RadioGroup"
import Button from "@/components/Button"
import { useState } from "react"
import type { CourseEntry, HoleEntry as HoleEntryData } from "../types"

interface HoleEntryProps {
  course: CourseEntry
  holeNumber: number
  // previously saved data for this hole, when coming back to it
  initial?: HoleEntryData
  // both receive the current hole if it has a score, so it isn't lost
  onGoToHole: (hole: HoleEntryData | null, index: number) => void
  onViewScorecard: (hole: HoleEntryData | null) => void
}

function toYesNo(val: boolean | null | undefined) {
    if (val == null) return null
    return val ? "yes" : "no"
}

function fromYesNo(val: string | null) {
    if (val === null) return null
    return val === "yes"
}

// [start, end] inclusive, as radio options
function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => ({
        label: String(start + i),
        value: start + i,
    }))
}

const yesNo = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="mb-5">
            <label className="text-lg text-text-muted">{label}</label>
            {children}
        </div>
    )
}

export default function HoleEntry({ course, holeNumber, initial, onGoToHole, onViewScorecard }: HoleEntryProps) {
    const [par, setPar] = useState(initial?.par ?? 4)
    const [score, setScore] = useState<number | null>(initial?.score ?? null)
    const [putts, setPutts] = useState<number | null>(initial?.putts ?? null)
    const [chips, setChips] = useState<number | null>(initial?.chips ?? null)
    const [penalties, setPenalties] = useState<number | null>(initial?.penalties ?? null)
    const [fairwayHit, setFairwayHit] = useState<string | null>(toYesNo(initial?.fairwayHit))
    const [greenInReg, setGreenInReg] = useState<string | null>(toYesNo(initial?.greenInReg))

    function buildHole(): HoleEntryData | null {
        if (score === null) return null
        return {
            holeNumber,
            par,
            score,
            putts,
            chips,
            penalties,
            fairwayHit: par === 3 ? null : fromYesNo(fairwayHit),
            greenInReg: fromYesNo(greenInReg),
        }
    }

    // index into holes is holeNumber - 1
    const prevArrow = (
        <Button
            variant="secondary"
            disabled={holeNumber === 1}
            onClick={() => onGoToHole(buildHole(), holeNumber - 2)}
            className="w-12! px-0! shrink-0"
        >
            &lt;
        </Button>
    )

    const nextArrow = (
        <Button
            variant="secondary"
            disabled={holeNumber === course.numHoles}
            onClick={() => onGoToHole(buildHole(), holeNumber)}
            className="w-12! px-0! shrink-0"
        >
            &gt;
        </Button>
    )

    return (
        <>
            <div className="flex items-center justify-between gap-3 mb-3">
                {prevArrow}
                <h1 className="text-2xl font-bold text-text-dark text-center">
                    Hole {holeNumber} of {course.numHoles}
                </h1>
                {nextArrow}
            </div>

            <Field label="Par">
                <RadioGroup
                    options={range(3, 5)}
                    value={par}
                    onChange={(val) => {
                        setPar(val)
                        setScore(val)
                    }}
                />
            </Field>

            <Field label="Score">
                <RadioGroup options={range(Math.max(1, par - 3), par + 5)} value={score} onChange={setScore} />
            </Field>

            <Field label="Putts">
                <RadioGroup options={range(0, 4)} value={putts} onChange={setPutts} onClear={() => setPutts(null)} />
            </Field>

            <Field label="Chips">
                <RadioGroup options={range(0, 3)} value={chips} onChange={setChips} onClear={() => setChips(null)} />
            </Field>

            <Field label="Penalties">
                <RadioGroup options={range(0, 3)} value={penalties} onChange={setPenalties} onClear={() => setPenalties(null)} />
            </Field>

            {par !== 3 && (
                <Field label="Fairway Hit">
                    <RadioGroup options={yesNo} value={fairwayHit} onChange={setFairwayHit} onClear={() => setFairwayHit(null)} />
                </Field>
            )}

            <Field label="Green in Regulation">
                <RadioGroup options={yesNo} value={greenInReg} onChange={setGreenInReg} onClear={() => setGreenInReg(null)} />
            </Field>

            <div className="flex gap-3 items-center">
                {prevArrow}
                <Button onClick={() => onViewScorecard(buildHole())}>
                    View Scorecard
                </Button>
                {nextArrow}
            </div>
        </>
    )
}
