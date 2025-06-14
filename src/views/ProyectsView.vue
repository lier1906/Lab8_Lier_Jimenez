<template>
  <div class="p-6 flex-1 bg-base-100 text-white">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-semibold">{{ project?.name || 'Seleccione un proyecto' }}</h2>
      <div v-if="project" class="text-lg">Progreso: {{ progress }}%</div>
    </div>

    <div v-if="project">
      <table class="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th class="text-center">Completado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in project.tasks" :key="t.id">
            <td>{{ i + 1 }}</td>
            <td :class="{ 'line-through text-gray-500': t.completed }">{{ t.name }}</td>
            <td class="text-center">
              <input type="checkbox" :checked="t.completed" @change="toggleTask(project.id, t.id)" />
            </td>
          </tr>
          <tr>
            <td>{{ project.tasks.length + 1 }}</td>
            <td colspan="2">
              <input
                v-model="newTaskName"
                type="text"
                placeholder="Escriba nueva tarea y presione Enter"
                class="input input-bordered input-sm w-full text-black"
                @keydown.enter.prevent="addTask"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-gray-400">Ningún proyecto seleccionado.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const project = computed(() => store.selectedProject)
const progress = computed(() => store.projectProgress)
const newTaskName = ref('')

function addTask() {
  const name = newTaskName.value.trim()
  if (!name || !project.value) return
  store.addTask(project.value.id, name)
  newTaskName.value = ''
}

function toggleTask(pid: number, tid: number) {
  store.toggleTask(pid, tid)
}
</script>
