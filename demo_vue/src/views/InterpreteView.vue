<script setup lang="ts">
import InterpreteList from '@/components/interprete/InterpreteList.vue'
import InterpreteSave from '@/components/interprete/InterpreteSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const interpreteListRef = ref<typeof InterpreteList | null>(null)
const interpreteEdit = ref<any>(null)

function hableCreate() {
  interpreteEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(interprete: any) {
  interpreteEdit.value = interprete
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  interpreteListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Intépretes</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="hableCreate" />
    <InterpreteList ref="interpreteListRef" @edit="handleEdit" />
    <InterpreteSave
      :mostrar="mostrarDialog"
      :interprete="interpreteEdit"
      :modoEdicion="!!interpreteEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
