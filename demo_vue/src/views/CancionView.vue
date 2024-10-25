<script setup lang="ts">
import CancionList from '@/components/cancion/CancionList.vue'
import CancionSave from '@/components/cancion/CancionSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const cancionListRef = ref<typeof CancionList | null>(null)
const cancionEdit = ref<any>(null)

function hableCreate() {
  cancionEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(cancion: any) {
  cancionEdit.value = cancion
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  cancionListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Canciones</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="hableCreate" />
    <CancionList ref="cancionListRef" @edit="handleEdit" />
    <CancionSave
      :mostrar="mostrarDialog"
      :cancion="cancionEdit"
      :modoEdicion="!!cancionEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
