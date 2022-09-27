
Neste projeto vamos conhecer um pouco mais:

* CRUD *MVC APS.NET6 C#
* Banco de Dados: SQL Server Microsoft
* Criação de String de Conexão

<hr>

## Instalações

**Visual Studio**

[Como Instalar o Visual Studio 2022](https://www.youtube.com/watch?v=_HgVooVuGOE)
[Visual Studio 2022](https://visualstudio.microsoft.com/)






https://www.youtube.com/watch?v=zr3QiQDZ0-k

Pacotes instalados:
Install-Package Microsoft.EntityFrameworkCore
Install-Package Microsoft.EntityFrameworkCore.SqlServer

Install-Package Microsoft.EntityFrameworkCore.Design
Install-Package Microsoft.EntityFrameworkCore.Tools

Comandos do Migration executados para criação do banco:
Add-Migration Criacao-Inicial -Context Contexto
Update-database -Context Contexto

Instalar o SQL




**String de SQL**

[String de SQL](https://www.youtube.com/watch?v=R0Eb_IocaIs)

Dado incluso na aba Program.cs

![image](https://user-images.githubusercontent.com/108991648/192612074-283358fa-6b14-48df-b211-0eecad8b5f83.png)

- `Data Source`, é o nome do banco de servidor do SQL, ao copiar esta informação inclua uma ( \ ) a mais na colagem
- `Initial Catalog`, nome da database
- Pode ou não ser executado com usuário e senha

![image](https://user-images.githubusercontent.com/108991648/192606138-8f4334f0-47b7-419c-8599-aa5a3cb9df22.png)



Como obter os link:

- No VS clicar em exibir, Server Explorar e na "tomada" (conectar-se a um banco de dados)

![image](https://user-images.githubusercontent.com/108991648/192606330-2c5369cd-14c7-4e9b-a6df-4ec013930cd7.png)

- Microsoft SQL Server
- Repetir o nome do servidor 
- Autenticação define se existirá usuário e senha ou não
- Selecionar ou digitar um nome de banco de dados: a princício incluir como `master`. 

Gerada a Strinf de Conexão: :)

![image](https://user-images.githubusercontent.com/108991648/192609519-4840f04e-28bb-470e-ba71-7d8ca61c0b7f.png)

- Clicar como botão direito e ir em propriedades
- Na Cadeia de Conexão é o local onde teremos a chave de nossa string






_______________

- No visual Studio, novo projeto e escolher onde será salvo

MVC - Controllers, Models and Views

![image](https://user-images.githubusercontent.com/108991648/192586073-375b88e3-657c-4300-b0a3-a0c91fc700e9.png)

_________

**Arquivo Models**

- Botão direito, adicionar, classe.
- Duas propriedades: Id e Nome

```cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web_crud_mvc_sql.Models
{
    [Table("Produto")]
    public class Produto
    {
        [Column("Id")]
        [Display(Name ="Código")]
        public int Id { get; set; }

        [Column("Nome")]
        [Display(Name = "Nome")]
        public string Nome { get; set; }
    }
}
```

Criar contexto que fará conexão com o banco de dados

```cs
namespace Web_crud_mvc_sql.Models
{
    public class Contexto : DbContext
    {
    }
}
```

Em DbContext, no teclado apertar (CTRL + .):

![image](https://user-images.githubusercontent.com/108991648/192592690-eda4b9f6-b83b-47ae-8ff1-d4ea57e6f156.png)

Install-Package Microsoft.EntityFrameworkCore
Install-Package Microsoft.EntityFrameworkCore.SqlServer

Novamente em DbContext, no teclado apertar (CTRL + .):

![image](https://user-images.githubusercontent.com/108991648/192593938-46be6a3b-607a-41f0-8e01-98da0db0d5ff.png)

Em seguida: 
- criar o construtor do contexto `DbContextOptions`
- Definir o `DbSet`, "falar' para o EntityFramework quais são modelos que ele gerencie pra mim, caso não exista no banco ele cria

```css
using Microsoft.EntityFrameworkCore;

namespace Web_crud_mvc_sql.Models
{
    public class Contexto : DbContext
    {
        public Contexto( DbContextOptions<Contexto> options): base(options)
        { 
        
        }

        public DbSet<Produto> Produto { get; set; }
    }
}
```
___________

**Arquivo Program.cs**

No arquivo Program, entre os dados abaixo incluir:

- Em `.UseSqlServer` incluir (CTRL + .) e adicionar `using Microsoft.EntityFrameworkCore`
```cs
// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<Contexto> 
    (options => options .UseSqlServer
    ("Data Source=TESTE\\SQLEXPRESS;Initial Catalog=CRUD_MVC_SQL;Integrated Security=True") );
    
var app = builder.Build();
```
> Para gerar uma nova string de conexão, verificar início deste arquivo
__________

**Arquivo Controller.cs**

Métodos e Views que vão listar, criar, editar e excluir (CRUD)

- Clicar com o botão direito, adicionar e controlador
- Clicar em Controlador MVC com exibições, usando o Entity Framework
- Classe do modelo: Produto (criado anteriormente)
- Classe de contexto: Contexto (criado anteriormente)
- Ajustar nome do controlador: ProdutosController

> Serão gerados todos os métodos CRUD :)

![image](https://user-images.githubusercontent.com/108991648/192620509-379772b3-c8d2-40cf-bc91-eb4018dfff88.png)

<hr>

**Criar a base de dados no Microsoft SQL a partor do Visual Studio**

- Ferramentas, 
- Gerenciador de Pacotes do NuGet
- Console do Gerenciador de Pacotes

No console, rodas os comandos:
- `PM> Add-Migration Inicial-criacao -Context Contexto`
- `PM> Update-database -Context Contexto`

No SQL dar um Refresh e voalá! :)

![image](https://user-images.githubusercontent.com/108991648/192623018-fb12dc60-75a2-4a44-a279-f4179d14c97e.png)

<hr>

**Link para direcionar para a página**

- Em Views, Shared, arquivo `Layout.cshtml`
- Alterar os dados abaixo: Produtos, Index e Produtos (1. Arquivo da Controller criado, 3. Nome que aparece na tela )

![image](https://user-images.githubusercontent.com/108991648/192624250-7dad7996-32fc-4871-9f11-e352fda35e50.png)

<hr>

**Incluir dados diretamente do link**

Após rodar o programa no Visual Studio abrirá uma link

![image](https://user-images.githubusercontent.com/108991648/192625560-c6c1473b-d985-469b-bcb5-ed51795f73e0.png)

Clicar em Produtos (lembrando que alteramos este item)

![image](https://user-images.githubusercontent.com/108991648/192625859-dedff1df-59c1-4881-b71e-71ce56d2f2c4.png)

Clicar em Crete Now e adicione um novo Produto

![image](https://user-images.githubusercontent.com/108991648/192626057-be41f78b-26b9-4f5a-bbb2-4ae356bf834e.png)

![image](https://user-images.githubusercontent.com/108991648/192626281-08680924-a109-46c1-bb49-270093bd271b.png)

Visualiando no SQL os mesmos itens são criados: F5 para atualzizar

![image](https://user-images.githubusercontent.com/108991648/192627080-eb4562d7-27d3-412f-8deb-453b4b72eafb.png)











