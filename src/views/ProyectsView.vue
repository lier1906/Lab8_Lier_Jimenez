<template>
  <div class="p-6 flex-1 bg-base-200">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-semibold">
        {{ project?.name || 'Seleccione un proyecto' }}
      </h2>
      <div v-if="project" class="text-lg">
        Progreso: {{ progress }}%
      </div>
    </div>

    <table v-if="project" class="table w-full">
      <thead>
        <tr>
          <th>Hecho</th>
          <th>Tarea</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in project.tasks" :key="t.id">
          <td>
            <input
              type="checkbox"
              :checked="t.completed"
              @change="toggleTask(project.id, t.id)"
            />
          </td>
          <td :class="{ 'line-through text-gray-500': t.completed }">
            {{ t.name }}
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="text-gray-500">
      No hay proyecto seleccionado.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const project = computed(() => store.selectedProject)
const progress = computed(() => store.projectProgress)

function toggleTask(pid: number, tid: number) {
  store.toggleTask(pid, tid)
}
</script>
