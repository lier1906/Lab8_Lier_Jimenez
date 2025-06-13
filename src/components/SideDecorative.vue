<template>
  <aside class="w-64 min-h-screen p-4 bg-base-300">
    <h2 class="text-lg font-bold mb-2">Proyectos</h2>
    <p v-if="!projects.length" class="text-sm text-gray-400 mb-4">
      No hay proyectos
    </p>

    <ul class="menu rounded-box w-full">
      <li v-for="p in projects" :key="p.id" class="mb-2">
        <details :open="isOpen(p.id)" @click="selectAndToggle(p.id)">
          <summary class="flex justify-between items-center cursor-pointer">
            <span class="flex-1">
              {{ p.name }} ({{ projectProgress(p) }}%)
            </span>
            <span>
              <svg
                v-if="isOpen(p.id)"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 15l7-7 7 7" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>

          <ul class="pl-4 mt-2">
            <li
              v-for="t in p.tasks"
              :key="t.id"
              class="flex items-center py-1"
            >
              <input
                type="checkbox"
                class="mr-2"
                :checked="t.completed"
                @change.stop="toggleTask(p.id, t.id)"
              />
              <span :class="{ 'line-through text-gray-500': t.completed }">
                {{ t.name }}
              </span>
            </li>
            <li class="mt-1">
              <button
                class="btn btn-xs btn-outline"
                @click.stop="newTask(p.id)"
              >
                + Tarea
              </button>
            </li>
          </ul>
        </details>
      </li>

      <li class="mt-4">
        <button
          class="btn btn-sm btn-primary w-full"
          @click="newProject"
        >
          + Proyecto
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const projects = store.projects
const openList = ref<number[]>([])

function isOpen(id: number) {
  return openList.value.includes(id)
}

function selectAndToggle(id: number) {
  store.selectProject(id)
  if (isOpen(id)) openList.value = openList.value.filter(x => x !== id)
  else openList.value.push(id)
}

function newProject() {
  const name = prompt('Nombre del nuevo proyecto:')
  if (name) store.addProject(name)
}

function newTask(pid: number) {
  const name = prompt('Nombre de la tarea:')
  if (name) store.addTask(pid, name)
}

function toggleTask(pid: number, tid: number) {
  store.toggleTask(pid, tid)
}

// Calcula % completado para un proyecto dado
function projectProgress(p: {
  id: number
  name: string
  tasks: { completed: boolean }[]
}) {
  if (!p.tasks.length) return 0
  const done = p.tasks.filter(t => t.completed).length
  return Math.round((done / p.tasks.length) * 100)
}
</script>
