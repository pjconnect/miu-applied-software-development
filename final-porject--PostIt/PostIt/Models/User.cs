using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace PostIt.Models;

public class User
{
    public int Id { get; set; }
    [Required] 
    public string Email { get; set; }
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}