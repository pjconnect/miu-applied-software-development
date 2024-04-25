using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostIt.Models;

namespace PostIt.Controllers;

[Route("/api/[controller]")]
public class HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
    : Controller
{

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}