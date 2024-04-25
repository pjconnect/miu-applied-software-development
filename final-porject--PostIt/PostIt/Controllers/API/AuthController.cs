using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
        var pw = HashPassword(registerRequest.Password);
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
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var pw = HashPassword(loginRequest.Password);
        var user = context.Users.FirstOrDefault(t => t.Email == loginRequest.Email);
        if (user == null || user.Password != pw) return Unauthorized("User not found");
        var token = GenerateAuthToken(user.Id);
        var response = new { token };
        return Ok(response);
    }

    public string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            var bytes = Encoding.UTF8.GetBytes(password);
            var hashBytes = sha256.ComputeHash(bytes);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }

    private string GenerateAuthToken(int userId)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            new[] { new Claim(ClaimTypes.NameIdentifier, userId.ToString()) },
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(configuration["Jwt:ExpirationMinutes"])),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
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