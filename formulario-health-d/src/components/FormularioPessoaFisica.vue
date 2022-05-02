<template>
  <div>
    <h2>Formulário Pessoa Física:</h2>
    <Aviso
      :mensagem="mensagem"
      :background="backgroundColor"
      v-show="dataInvalida || dadosEnviados || warning"
    />
    <div class="form">
      <form @submit.prevent="submit()">
        <div class="mb-3">
          <label class="form-label borda" id="nome">Nome:</label>
          <input
            required
            v-model="pessoaFisica.nome"
            type="text"
            class="form-control"
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
          />
        </div>
        <div class="b-3 mb-4 mt-4">
          <label class="form-label borda">Sexo:</label>
          <select
            v-model="pessoaFisica.sexo"
            class="form-select"
            aria-label="Default select example"
          >
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
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label class="form-label borda">Nome da mãe:</label>
          <input
            v-model="pessoaFisica.nomeDaMae"
            type="text"
            class="form-control"
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

//serviços
import UserServices from '../services/UserServices'
import FormServices from '../services/FormServices'

//componentes
import Aviso from './Aviso.vue'

export default {
  name: 'FormularioPessoaFisica',

  data() {
    return {
      pessoaFisica: {
        nome: '',
        dataNasc: '',
        sexo: '',
        nomeDoPai: '',
        nomeDaMae: '',
        profissao: ''
      },
      generos: [],
      profissoes: [],
      pessoasFisicas: [],
      mensagem: '',
      backgroundColor: '',
      dataInvalida: false,
      dadosEnviados: false,
      warning: false
    }
  },
  mounted() {
    this.getGeneros()
    this.getProfissoes()
  },
  methods: {
    getGeneros() {
      FormServices.listarGeneros()

        .then(res => {
          this.generos = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    getProfissoes() {
      FormServices.listarProfissoes()

        .then(res => {
          this.profissoes = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

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
        this.backgroundColor = '#ff1c28'
        this.mensagem = 'Ano, mês ou dia informado(s) inválido(s)!'

        setTimeout(() => {
          this.mensagem = ''
          this.dataInvalida = false
        }, 4000)
      } else {
        if (idadePessoaFisica >= 18) {
          if (this.pessoaFisica.profissao.length == 0) {
            this.warning = true
            this.mensagem = 'Campo de profissão obrigatório!'
            this.backgroundColor = 'orange'

            setTimeout(() => {
              this.warning = false
              this.mensagem = ''
            }, 4000)
          } else {
            console.log('csidcsnd')
            UserServices.save(this.pessoaFisica)

              .then(res => {
                this.pessoaFisica = {}
                console.log(res.data)
                this.dadosEnviados = true
                this.backgroundColor = '#26A96C'

                this.mensagem = 'Dados enviados com sucesso!'

                setTimeout(() => {
                  this.mensagem = ''
                  this.dadosEnviados = false
                }, 4000)
              })
              .catch(err => {
                console.log(err)
              })
          }
        } else {
          console.log('alou')
          if (
            this.pessoaFisica.nomeDaMae.length == 0 ||
            this.pessoaFisica.nomeDoPai.length == 0
          ) {
            this.warning = true
            this.mensagem =
              'Campos obrigatórios não preenchidos: Nome do pai, nome da mãe'
            this.backgroundColor = 'orange'

            setTimeout(() => {
              this.mensagem = ''
              this.warning = false
            }, 4000)
          } else {
            UserServices.save(this.pessoaFisica)

              .then(res => {
                this.pessoaFisica = {}
                console.log(res.data)
                this.dadosEnviados = true
                this.backgroundColor = '#26A96C'

                this.mensagem = 'Dados enviados com sucesso!'

                setTimeout(() => {
                  this.mensagem = ''
                  this.dadosEnviados = false
                }, 4000)
              })
              .catch(err => {
                console.log(err)
              })
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
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.315);
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
