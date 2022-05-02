import { http } from './api-config'

export default {
  save: (pessoaFisica) =>{
    return http.post("usuarios", pessoaFisica)
  }
}