using System.ComponentModel.DataAnnotations;

namespace Todo.Models
{
    public class ToDoTask
    {
        [Key]
        public int Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Description { get; set; }

        public int Priority { get; set; }

    }
}
