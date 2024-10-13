<script setup lang="ts">
import type { Album } from '@/models/album'
import type { Cancion } from '@/models/cancion'
import type { Genero } from '@/models/genero'
import type { Interprete } from '@/models/interprete'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'canciones'
const props = defineProps({
  mostrar: Boolean,
  cancion: {
    type: Object as () => Cancion,
    default: () => ({}) as Cancion
  },
  modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const generos = ref<Genero[]>([])
const interpretes = ref<Interprete[]>([])
const albumes = ref<Album[]>([])

const interprete = ref<Interprete>({} as Interprete)
const cancion = ref<Cancion>({ ...props.cancion })

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

// Watch para cargar datos al editar
watch(
  () => props.cancion,
  async (newVal) => {
    cancion.value = { ...newVal }
    interprete.value = cancion.value?.album?.interprete ?? ({} as Interprete)
    if (interprete.value?.id) {
      await obtenerAlbumes()
      cancion.value.album =
        albumes.value.find((album) => album.id === cancion.value.album.id) || ({} as Album)
    }
  }
)

async function obtenerGeneros() {
  generos.value = await http.get('generos').then((response) => response.data)
}

async function obtenerInterpretes() {
  interpretes.value = await http.get('interpretes').then((response) => response.data)
}

async function obtenerAlbumes() {
  albumes.value = await http
    .get(`albumes/interprete/${interprete.value?.id}`)
    .then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {
      idAlbum: cancion.value.album.id,
      idGenero: cancion.value.genero.id,
      nombre: cancion.value.nombre,
      duracion: cancion.value.duracion,
      tags: cancion.value.tags,
      url: cancion.value.url
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${cancion.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    cancion.value = {} as Cancion
    interprete.value = {} as Interprete
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerGeneros()
      obtenerInterpretes()
    }
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Canción'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="genero" class="font-semibold w-4">Géneros</label>
        <Select
          id="genero"
          v-model="cancion.genero"
          :options="generos"
          optionLabel="descripcion"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="interprete" class="font-semibold w-4">Interpretes</label>
        <Select
          id="interprete"
          v-model="interprete"
          :options="interpretes"
          optionLabel="nombre"
          class="flex-auto"
          @change="obtenerAlbumes"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="album" class="font-semibold w-4">Albumes</label>
        <Select
          id="album"
          v-model="cancion.album"
          :options="albumes"
          optionLabel="nombre"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText id="nombre" v-model="cancion.nombre" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracion" class="font-semibold w-4">Duración</label>
        <InputMask
          id="duracion"
          v-model="cancion.duracion"
          mask="99:99"
          placeholder="03:00"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="tags" class="font-semibold w-4">Tags</label>
        <InputText id="tags" v-model="cancion.tags" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="url" class="font-semibold w-4">URL</label>
        <InputText id="url" v-model="cancion.url" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
