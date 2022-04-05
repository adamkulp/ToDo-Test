using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Todo.Models;

namespace Todo.Data_Providers
{
    public class ToDoDataContext : DbContext
    {
        public virtual DbSet<ToDoTask> ToDoTasks { get; set; }
        public ToDoDataContext()
        {

        }

        public ToDoDataContext(DbContextOptions<ToDoDataContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=localhost;Database=ToDoList;Integrated Security=True");  
            }
        }

    }
}
