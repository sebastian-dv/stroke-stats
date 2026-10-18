export interface HoleEntry {
  holeNumber: number
  par: number
  score: number
  putts: number | null
  chips: number | null
  penalties: number | null
  fairwayHit: boolean | null
  greenInReg: boolean | null
}

export interface CourseEntry {
  courseName: string
  par: number
  numHoles: 9 | 18
}
