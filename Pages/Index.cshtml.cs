using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Todo.Data_Providers;
using Todo.Models;

namespace ToDo_Test.Pages
{
    [Authorize]
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly ToDoDataContext _context;

        public List<ToDoTask> ToDoTasks { get; set; } = new List<ToDoTask>();


        [BindProperty]
        public ToDoTask MyTask { get; set; }

        public IndexModel(ILogger<IndexModel> logger, ToDoDataContext ctx)
        {
            _logger = logger;
            _context = ctx;
        }

        public void OnGet()
        {
            ToDoTasks = _context.ToDoTasks.ToList();
        }
        public void OnPost(int id, string action)
        {
            if(action=="Delete")
            {
                // delete stuff here

                OnPostDelete(id); 
                return; 
            }
            if (ModelState.IsValid)
            {

                if (MyTask != null)
                {
                    _context.ToDoTasks.Add(MyTask);
                    _context.SaveChanges();
                }
            }
            ToDoTasks = _context.ToDoTasks.ToList(); 
        }
        //public void OnPost(int id)
        //{

        //}
        public void OnPostDelete(int id)
        {
            var task = _context.ToDoTasks.FirstOrDefault(t => t.Id == id);
            if (task != null)
            {
                _context.ToDoTasks.Remove(task);
                _context.SaveChanges();
            }
           

            ToDoTasks = _context.ToDoTasks.ToList();

        }



    }
   
}