<script setup lang="ts">
import type { Cancion } from '@/models/cancion'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'canciones'
let canciones = ref<Cancion[]>([])
const emit = defineEmits(['edit'])
const cancionDelete = ref<Cancion | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  canciones.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(cancion: Cancion) {
  emit('edit', cancion)
}

function mostrarEliminarConfirm(cancion: Cancion) {
  cancionDelete.value = cancion
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${cancionDelete.value?.id}`)
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
          <th>Género</th>
          <th>Intérprete</th>
          <th>Album</th>
          <th>Nombre</th>
          <th>Duración</th>
          <th>Tags</th>
          <th>URL</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cancion, index) in canciones" :key="cancion.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cancion.genero.descripcion }}</td>
          <td>{{ cancion.album.interprete.nombre }}</td>
          <td>{{ cancion.album.nombre }}</td>
          <td>{{ cancion.nombre }}</td>
          <td>{{ cancion.duracion }}</td>
          <td>{{ cancion.tags }}</td>
          <td>
            <a :href="cancion.url" target="_blank">{{ cancion.url }}</a>
          </td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(cancion)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(cancion)"
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
