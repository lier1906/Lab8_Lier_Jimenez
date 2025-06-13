import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as {
      id: number
      name: string
      tasks: {
        id: number
        name: string
        completed: boolean
      }[]
    }[],
    selectedId: null as number | null,
    _nextProjectId: 1,
    _nextTaskId: 1,
  }),
  getters: {
    selectedProject(state) {
      return state.projects.find(p => p.id === state.selectedId) || null
    },
    projectProgress(state) {
      const p = state.projects.find(x => x.id === state.selectedId)
      if (!p || p.tasks.length === 0) return 0
      const done = p.tasks.filter(t => t.completed).length
      return Math.round((done / p.tasks.length) * 100)
    }
  },
  actions: {
    addProject(name: string) {
      this.projects.push({
        id: this._nextProjectId++,
        name,
        tasks: []
      })
      this.selectedId = this._nextProjectId - 1
    },
    selectProject(id: number) {
      this.selectedId = id
    },
    addTask(projectId: number, name: string) {
      const p = this.projects.find(x => x.id === projectId)
      if (!p) return
      p.tasks.push({
        id: this._nextTaskId++,
        name,
        completed: false
      })
    },
    toggleTask(projectId: number, taskId: number) {
      const p = this.projects.find(x => x.id === projectId)
      const t = p?.tasks.find(t => t.id === taskId)
      if (t) t.completed = !t.completed
    }
  }
})
