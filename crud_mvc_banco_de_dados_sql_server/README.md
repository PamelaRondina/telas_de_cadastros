
CRUD *MVC APS.NET6 C#
Banco de Dados: SQL Server Microsoft

Instalação de Pacotes:

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


Instalar o Visual Studio:
[Como Instalar o Visual Studio 2022](https://www.youtube.com/watch?v=_HgVooVuGOE)
[Visual Studio 2022](https://visualstudio.microsoft.com/)

_______________

- No visual Studio, novo projeto e escolher onde será salvo

MVC - Controllers, Models and Views

![image](https://user-images.githubusercontent.com/108991648/192586073-375b88e3-657c-4300-b0a3-a0c91fc700e9.png)

Dentro de Models, criar uma classe:
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

No arquivo Program, entre os dados abaixo incluir

```cs
builder.Services.AddControllersWithViews();

var app = builder.Build();
```






