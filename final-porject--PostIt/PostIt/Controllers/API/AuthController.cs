using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PostIt.Controllers.utils;
using PostIt.Models;

namespace PostIt.Controllers.API;

[Route("/api/auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly IConfiguration configuration;
    private readonly ApplicationDbContext context;

    public AuthController(IConfiguration configuration, ApplicationDbContext context)
    {
        this.configuration = configuration;
        this.context = context;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest registerRequest)
    {
        var pw = Crypt.HashPassword(registerRequest.Password);
        var user = context.Users
            .FirstOrDefault(t => t.Username == registerRequest.Username || t.Email == registerRequest.Email);
        if (user != null) return BadRequest("User already exist");

        var newUser = new User
        {
            Email = registerRequest.Email,
            Username = registerRequest.Username,
            Password = pw
        };
        context.Users.Add(newUser);
        context.SaveChanges();
        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        var pw = Crypt.HashPassword(loginRequest.Password);
        var user = context.Users.FirstOrDefault(t => t.Email == loginRequest.Email);
        if (user == null || user.Password != pw) return Unauthorized("User not found");
        var token = Crypt.GenerateAuthToken(user.Id, configuration);
        var response = new { token,  Username = user.Username };
        return Ok(response);
    }
    
    [HttpGet("my-info")]
    public IActionResult GetMyInfo()
    {
        var user = context.Users.Find(User.GetUserId());
        var userRes = new UserDto()
        {
            Username = user?.Username,
        };
        
        return Ok(userRes);
    }

    public class LoginRequest
    {
        [Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}

public class RegisterRequest
{
    [Required] public string Email { get; set; }

    [Required]
    [RegularExpression(@"\S+", ErrorMessage = "Username required")]
    public string Username { get; set; }

    public string Password { get; set; }
}