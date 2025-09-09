/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Planner {
  _id: string
  title: string
  description: string
  priority: string
  status: string
  completedAt: any
  userId: string
  totalTasks: number
  completedTasks: number
  progressPercentage: number
  milestones: Milestone[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Milestone {
  title: string
  description: string
  deadline: string
  isCompleted: boolean
  completedAt: any
  order: number
  _id: string
  createdAt: string
  updatedAt: string
  tasks: Task[]
}

export interface Task {
  title: string
  date: string
  isCompleted: boolean
  completedAt: any
  notes: string
  _id: string
}
