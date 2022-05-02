import { http } from './api-config'

export default {
  listarGeneros: () =>{
    return http.get("generos")
  },

  listarProfissoes: () =>{
    return http.get("profissoes")
  }
}