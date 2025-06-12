<!-- src/components/ProjectModal.vue -->
<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box">
      <slot name="title">
        <h3 class="text-lg font-bold">Modal</h3>
      </slot>

      <div class="py-4">
        <slot>
          <!-- Contenido por defecto si no se envía -->
          <p class="text-sm text-gray-400">Contenido del modal</p>
        </slot>
      </div>

      <div class="modal-action">
        <slot name="footer">
          <form method="dialog">
            <button class="btn">Cerrar</button>
          </form>
        </slot>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogRef = ref<HTMLDialogElement | null>(null)

function open() {
  dialogRef.value?.showModal()
}

defineExpose({ open })
</script>
