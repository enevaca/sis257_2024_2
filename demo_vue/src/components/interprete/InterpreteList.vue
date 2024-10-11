<script setup lang="ts">
import type { Interprete } from '@/models/interprete'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'interpretes'
let interpretes = ref<Interprete[]>([])
const emit = defineEmits(['edit'])
const interpreteDelete = ref<Interprete | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  interpretes.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(interprete: Interprete) {
  emit('edit', interprete)
}

function mostrarEliminarConfirm(interprete: Interprete) {
  interpreteDelete.value = interprete
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${interpreteDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Nacionalidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(interprete, index) in interpretes" :key="interprete.id">
          <td>{{ index + 1 }}</td>
          <td>{{ interprete.nombre }}</td>
          <td>{{ interprete.nacionalidad }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(interprete)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(interprete)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
