export interface HoleEntry {
  holeNumber: number
  par: number
  score: number
  putts: number
  chips: number
  penalties: number
  fairwayHit: boolean
  greenInReg: boolean
}

export interface CourseEntry {
  courseName: string
  par: number
  numHoles: 9 | 18
}
