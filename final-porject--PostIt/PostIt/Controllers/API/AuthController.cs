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
public class AuthController : Controller
{
    private readonly IConfiguration configuration;
    private readonly ApplicationDbContext context;

    public AuthController(IConfiguration configuration, ApplicationDbContext context)
    {
        this.configuration = configuration;
        this.context = context;
    }
    
    private string GenerateJwtToken(string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: new[] { new Claim(ClaimTypes.Name, username) },
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(configuration["Jwt:ExpirationMinutes"])),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest registerRequest)
    {
        
        var pw = HashPassword(registerRequest.Password);
        var user = context.Users.Where(t => t.Username == registerRequest.Username).FirstOrDefault();
        if (user != null)
        {
            return BadRequest("User already exist");
        }
        var newUser = new User()
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
        var user = context.Users.FirstOrDefault(t => t.Username == loginRequest.Username);
        if (user == null || user.Password != pw)
        {
            return Unauthorized("User not found");
        }

        // Perform authentication here (e.g., verify credentials against a database)
        // For simplicity, let's assume authentication is successful
        var username = loginRequest.Username; // Assuming Username is a property in LoginRequest class

        // Generate JWT token
        var token = GenerateJwtToken(username);

        // Return the JWT token in the response
        var response = new { token = token };
        return Ok(response);
    }
    
    public string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            // Convert the password string to a byte array
            byte[] bytes = Encoding.UTF8.GetBytes(password);
        
            // Compute the hash
            byte[] hashBytes = sha256.ComputeHash(bytes);
        
            // Convert the byte array to a hexadecimal string
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }
    
    public class LoginRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}

public class RegisterRequest
{
    [Required]
    public string Email { get; set; }

    [Required]
    [RegularExpression(@"\S+", ErrorMessage = "Username required")]
    public string Username { get; set; }

    public string Password { get; set; }
}