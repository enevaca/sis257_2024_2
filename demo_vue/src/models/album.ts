import type { Interprete } from './interprete'

export interface Album {
  id: number
  idInterprete: number
  nombre: string
  fechaLanzamiento: Date
  interprete: Interprete
}
