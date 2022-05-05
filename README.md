# healthD-atendimentos

## Resposta da questão 1

- Primeiro instalaria o node na máquina para poder realizar comandos do tipo: **`npm run serve`** para rodar o projeto na máquina
- Logo em seguida faria a configuração de variaveis de ambientes necessárias para poder usar o node
- Por ultimo, instalaria o vue com o comando:

  `npm install -g @vue/cli` 

- Com o vue instalado, agora eu criaria o projeto, e para criar o projeto basta seguir dois passos simples:

1-  Abrir o terminal do VScode

2- Digitar “vue create + nome do projeto” e dar um enter

  ```
  //neste caso, o comando exato para a criação do projeto
  //"Cantando na chuva" seria:
  vue create cantando_na_chuva
  ````
## Resposta da questão 2

- Link para acessar a página [aqui](https://q2-blue.vercel.app/)
- Link para o repositório [aqui](https://github.com/italoknd/Q2)

## Resposta da questão 3

Para consumir dados do backend e mostrar no front primeiro podemos utilizar um fetch api ou até mesmo o axios, que é um cliente http que nos permite também fazer requisições de dados que é bastante usado hoje em dia.

Para mostrar os dados com o axios por exemplo, podemos criar um arquivo de serviços para os dados que queremos mostrar no front, no qual teremos um objeto, dentro desse objeto teremos um atributo que será chamado no componente em que vamos renderizar os dados do backend. Esse atributo vai receber um método que vai retornar um get (verbo utilizado para pegar dados de um endpoint) nos dados desejados (Exemplo ilustrado abaixo):

```javascript
import { http } from './api-config'

export default {
  listarUsuarios: () =>{
    return http.get("usuarios")
		//"usuarios" = nome do endpoint
  },
}
```

Agora, no componente onde desejamos renderizar os do backend vamos criar um método para a renderização dos dados, no Vue, podemos importar o nosso arquivo onde o serviço de listagem foi criado, apos isso, cria-se uma promise para o pegar os dados que vieram do nosso backend (Exemplo ilustrado abaixo):

```javascript
<script>
import UserServices from '../services/UserServices'

export default{
	data(){
		return{
			usuarios: [],
		}
	},
	mounted() {
    this.getUsuarios()
  },
	methods:{
		getUsuarios() {
	      UserServices.listarUsuarios()
	
	        .then(res => {
	          this.usuarios = res.data
	        })
	        .catch(err => {
	          console.log(err)
	        })
	    },
	}
}
</script>
```

## Resposta da questão 4

Na função em questão, eu retornaria uma promise e passaria dois callbacks nela, uma seria caso a operação dentro dessa função fosse concluída com sucesso e a outra caso houvesse falha na operação. Caso o processamento dê certo, vai ser chamado o método then, que é acionado quando o meu processamento é concluído com sucesso, com o then podemos realizar ainda mais processamentos caso necessário. Caso o processamento dê errado, chamamos o método catch que é acionado quando obtemos um reject da promise, com ele também é possível realizar processamentos condizentes com o contexto de erro, como informar que tipo de erro aconteceu por exemplo. Assim, podemos dispensar o uso das callbacks convencionais.

Para exemplificar na prática a conversão de uma callback em promise, abaixo tem um código de verificação de nome bem simples:

```javascript
//método de verificação usando callback
function verificarNome(nome) {
  if (nome === 'Italo') {
    console.log('Usuário encontrado Nome do usuário: ' + nome)
  } else {
    console.log('Usuário com nome "Italo" não encontrado. Nome do usuário encontrado: ' + nome)
  }
}

function nome(cb) {
  let nome = 'Arnold'
  cb(nome)
}

nome(verificarNome)

/*
saída esperada:

Usuário com nome "Italo" não encontrado. Nome do usuário encontrado: Arnold
*/
```

- Agora convertendo essa callback em promise teremos:

```javascript
function verificarNome2() {

  let nome2 = "Italo"

  const promessa = new Promise((resolve, reject) => {
    if (nome2 === 'Italo') {
      resolve('Usuário encontrado Nome do usuário: ' + nome2)
    } else {
      reject('Usuário não encontrado. Nome do usuário: ' + nome2+'.')
    }
  })
  
  promessa
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err+' Tente novamente mais tarde.')
    })
}

verificarNome2()

/*
saída esperada:

Usuário encontrado Nome do usuário: Italo
*/
```

## Resposta da questão 5

```javascript
const lista = []

for (let i = 0; i <= 30; i++) {
  lista.push(i)
}

console.log(lista)

/*  Q5 - (A): Mostre todos os números ímpares */
/*  Q5 - (B): Mostre todos os números pares */
lista.filter(numero => {
  if (numero % 2 != 0) {
    console.log(`${numero} são números ímpares`)
  } else {
    console.log(`${numero} são números pares`)
  }
})


/*  Q5 - (C): Mostrar todos os elementos multiplicados por 3 */
lista.forEach(valor => {
  return console.log(valor * 3)
})


/*  Q5 - (D): Mostrar todos os elementos menores que 6 */
lista.filter(numero=>{
  if(numero < 6){
    console.log(numero);
  }
})

/*  Q5 - (E): Mostrar todos os elementos ordenados de forma decrescente */
console.log(lista.reverse())

```

## Resposta da questão 6
