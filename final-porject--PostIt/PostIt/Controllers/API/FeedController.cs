using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostIt.Models;

namespace PostIt.Controllers.API;

[Route("/api/feed")]
[ApiController]
[Authorize]
public class FeedController(ApplicationDbContext context) : Controller
{
    [HttpGet("paged/{pageNumber}/{pageSize}")]
    public FeedResponse GetFeed(int pageNumber, int pageSize)
    {
        var feed = context.Posts
            .Include(t => t.User)
            .Skip(pageSize * (pageNumber - 1)).Take(pageSize)
            .OrderByDescending(t => t.CreatedDate)
            .Select(t => new FeedDto
            {
                Created = t.CreatedDate,
                Description = t.Description,
                ImageUrl = t.ImageUrl,
                User = new UserDto
                {
                    Username = t.User.Username
                }
            })
            .ToList();

        return new FeedResponse
        {
            Feed = feed,
            PageNumber = pageNumber
        };
    }


    [HttpPost]
    public IActionResult CreateFeed([FromBody] CreateFeedRequest request)
    {
        var userId = User.GetUserId();

        var newPost = new Post
        {
            Id = null,
            UserId = userId,
            User = null,
            Description = request.Description,
            ImageUrl = request.ImageUrl
        };
        context.Posts.Add(newPost);
        context.SaveChanges();

        return Ok();
    }

    [HttpDelete("/{feedId}")]
    public IActionResult DeleteFeedItem(int feedId)
    {
        var feed = context.Posts.FirstOrDefault(t => t.Id == feedId && t.UserId == User.GetUserId());
        context.Posts.Remove(feed);
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