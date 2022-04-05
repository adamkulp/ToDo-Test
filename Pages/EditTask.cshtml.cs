using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Todo.Models;
using Todo.Data_Providers;

namespace ToDo_Test.Pages
{
    public class EditTaskModel : PageModel
    {
        private readonly ToDoDataContext _context;
        public EditTaskModel(ToDoDataContext context)
        {
            _context = context; 
        }

        [BindProperty]
        public ToDoTask EditTask { get; set; }

        public void OnGet(int id)
        {
            EditTask = _context.ToDoTasks.FirstOrDefault(t => t.Id == id);
        }

        public IActionResult OnPost()
        {
            var data = EditTask;

            if (ModelState.IsValid)
            {
                var count = _context.Update(data);
                _context.SaveChanges();

                return RedirectToPage("Index");
            }

            return Page();
        }


    }
}
