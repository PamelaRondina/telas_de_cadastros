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
