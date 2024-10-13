<script setup lang="ts">
import type { Interprete } from '@/models/interprete'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'interpretes'
const props = defineProps({
  mostrar: Boolean,
  interprete: {
    type: Object as () => Interprete,
    default: () => ({}) as Interprete
  },
  modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

const interprete = ref<Interprete>({ ...props.interprete })
watch(
  () => props.interprete,
  (newVal) => {
    interprete.value = { ...newVal }
  }
)

async function handleSave() {
  try {
    const body = {
      nombre: interprete.value.nombre,
      nacionalidad: interprete.value.nacionalidad
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${interprete.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    interprete.value = {} as Interprete
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText
          id="nombre"
          v-model="interprete.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nacionalidad" class="font-semibold w-4">Nacionalidad</label>
        <InputText
          id="nacionalidad"
          v-model="interprete.nacionalidad"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
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
