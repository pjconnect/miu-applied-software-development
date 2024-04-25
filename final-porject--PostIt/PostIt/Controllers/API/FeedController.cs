using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostIt.Models;

namespace PostIt.Controllers.API;

[Route("/api/feed")]
public class FeedController(ApplicationDbContext context) : Controller
{
    public List<FeedResponse> GetFeed()
    {
        var feed = context.Posts.Include(t=>t.User)
            .Skip(0).Take(50)
            .Select(t => new FeedResponse()
            {
                Created = t.CreatedDate,
                Description = t.Description,
                ImageUrl = t.ImageUrl,
                User = new UserResponse()
                {
                    Username = t.User.Username,
                }
            })
            .ToList();
        
        return feed;
    }


    [HttpPost]
    public IActionResult CreateFeed([FromBody] CreateFeedRequest request)
    {
        var newPost = new Post()
        {
            Id = null,
            UserId = request.UserId,
            User = null,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
        };
        context.Posts.Add(newPost);
        
        return Ok();
    }
}

public class UserResponse
{
    public string Username { get; set; }
}

public class FeedResponse
{
    public DateTime Created { get; set; }
    public string? Description { get; set; }
    public string ImageUrl { get; set; }
    public UserResponse User { get; set; }
}

public class CreateFeedRequest
{
    public int Id { get; set; }
    
    public string? Description { get; set; }
    
    [Required]
    [RegularExpression(@"\S", ErrorMessage = "Not a valid Image URL")]
    public string ImageUrl { get; set; }
    
    [Required]
    public int UserId { get; set; }
}