using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostIt.Models;

namespace PostIt.Controllers.API;

[Route("/api/feed")]
[ApiController]
public class FeedController(ApplicationDbContext context) : Controller
{
    [HttpGet("paged/{pageNumber}")]
    public FeedResponse GetFeed(int pageNumber)
    {
        var feed = context.Posts
            .Include(t=>t.User)
            .Skip(50 * (pageNumber - 1 )).Take(50)
            .OrderByDescending(t=>t.CreatedDate)
            .Select(t => new FeedDto()
            {
                Created = t.CreatedDate,
                Description = t.Description,
                ImageUrl = t.ImageUrl,
                User = new UserDto()
                {
                    Username = t.User.Username,
                }
            })
            .ToList();
        
        return new FeedResponse()
        {
            Feed = feed,
            PageNumber = pageNumber
        };
    }


    [HttpPost]
    [Authorize]
    public IActionResult CreateFeed([FromBody] CreateFeedRequest request)
    {
        var userId = User.GetUserId();
        
        var newPost = new Post()
        {
            Id = null,
            UserId = userId,
            User = null,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
        };
        context.Posts.Add(newPost);
        context.SaveChanges();
        
        return Ok();
    }
}

public class UserDto
{
    public string Username { get; set; }
}

public class FeedResponse
{
    public List<FeedDto>? Feed { get; set; }
    public int PageNumber { get; set; }
}

public class FeedDto
{
    public DateTime Created { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public UserDto? User { get; set; }
}

public class CreateFeedRequest
{
    public int Id { get; set; }
    
    public string? Description { get; set; }
    
    public string ImageUrl { get; set; }
}