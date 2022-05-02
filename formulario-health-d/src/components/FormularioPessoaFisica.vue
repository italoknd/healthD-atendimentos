<template>
  <div>
    <h2>Formulário Pessoa Física:</h2>
    <Aviso :mensagem="mensagem" v-show="dataInvalida" />
    <div class="form">
      <form @submit.prevent="submit()">
        <div class="mb-3">
          <label class="form-label borda">Nome:</label>
          <input
            required
            v-model="pessoaFisica.nome"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label class="form-label borda">Data de nascimento:</label>
          <input
            required
            v-model="pessoaFisica.dataNasc"
            type="date"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="b-3 mb-4 mt-4">
          <label class="form-label borda">Sexo:</label>
          <select
            v-model="pessoaFisica.generos"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Informe o sexo:</option>
            <option v-for="genero in generos" :key="genero.id">
              {{ genero.nome }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label borda">Nome do pai:</label>
          <input
            v-model="pessoaFisica.nomeDoPai"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label class="form-label borda">Nome da mãe:</label>
          <input
            v-model="pessoaFisica.nomeDaMae"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="b-3 mb-4 mt-4">
          <label class="form-label borda">Profissão:</label>
          <select
            v-model="pessoaFisica.profissao"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Informe a sua profissão:</option>
            <option v-for="profissao in profissoes" :key="profissao.id">
              {{ profissao.nome }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Salvar</button>
      </form>
    </div>
  </div>
</template>

<script>
//libs
import moment from 'moment'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

//componentes
import UserServices from '../services/UserServices'
import Aviso from './Aviso.vue'

export default {
  name: 'FormularioPessoaFisica',

  data() {
    return {
      v$: useVuelidate(),

      pessoaFisica: {
        nome: '',
        dataNasc: '',
        sexo: '',
        nomeDoPai: '',
        nomeDaMae: '',
        profissao: ''
      },
      pessoasFisicas: [],
      profissoes: [
        { nome: 'Tec. em Informática', id: 1 },
        { nome: 'Contador', id: 2 },
        { nome: 'Administrador', id: 3 },
        { nome: 'Eng. Eletricista', id: 4 },
        { nome: 'Administrador', id: 5 },
        { nome: 'Nenhuma das Alternativas', id: 6 }
      ],
      generos: [
        { nome: 'Masculino', id: 1 },
        { nome: 'Feminino', id: 2 },
        { nome: 'Prefiro não informar', id: 3 }
      ],
      mensagem: '',
      dataInvalida: false
    }
  },
  validations() {
    return {
      pessoaFisica: {
        nomeDaMae: { required },
        profissao: { required }
      }
    }
  },
  methods: {
    submit() {
      let dataNasc = new Date(this.pessoaFisica.dataNasc)
        .toISOString()
        .split('T')[0]
        
      let dataNasc2 = new Date(this.pessoaFisica.dataNasc)
      let data1 = moment(dataNasc)
      let dataAtual = new Date().toISOString().split('T')[0]
      let dataAtual2 = new Date()
      let data2 = moment(dataAtual)
      let idadePessoaFisica = data2.diff(data1, 'years')
      console.log(idadePessoaFisica)

      let diferencaEmDias = dataAtual2 - dataNasc2

      if (diferencaEmDias <= 0) {
        this.dataInvalida = true
        this.mensagem = 'Ano, mês ou dia informado(s) inválido(s)!'

        setTimeout(() => {
          this.mensagem = ''
          this.dataInvalida = false
        }, 4000)
      } else {
        if (idadePessoaFisica >= 18) {
          if (this.pessoaFisica.profissao.length == 0) {
            console.log(this.pessoaFisica)
            alert('campo profissão obrigatório!')
            return
          }
          UserServices.save(this.pessoaFisica)

            .then(res => {
              this.pessoaFisica = {}
              console.log(res.data)
              this.mensagem = 'Dados enviados com sucesso!'

              setTimeout(() => {
                this.mensagem = ''
              }, 4000)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          if (
            this.pessoaFisica.nomeDaMae.length == 0 ||
            this.pessoaFisica.nomeDoPai.length == 0
          ) {
            alert('Campos obrigatórios: Nome do Pai, Nome da Mãe')
          }
        }
      }
    }
  },
  components: {
    Aviso
  }
}
</script>

<style scoped>
h2 {
  padding: 1em;
  text-align: center;
  background: #5dcbfa;
  color: white;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
}

label {
  font-weight: 600;
}

.borda {
  border-left: 4px solid #5dcbfa;
  padding-left: 5px;
}
</style>
