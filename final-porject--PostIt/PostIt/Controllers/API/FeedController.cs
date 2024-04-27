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
        var userId = User.GetUserId();
        
        var feed = context.Posts
            .Include(t => t.User)
            .Include(t=>t.Likes)
            .OrderByDescending(t => t.CreatedDate)
            .Skip(pageSize * (pageNumber - 1)).Take(pageSize)
            .Select(t => new FeedDto
            {
                Id = t.Id,
                Created = t.CreatedDate,
                Description = t.Description,
                ImageUrl = t.ImageUrl,
                User = new UserDto
                {
                    Username = t.User.Username
                },
                HaveUserLiked = t.Likes.Any(t=>t.UserId == userId)
            })
            .ToList();

        return new FeedResponse
        {
            Feed = feed,
            PageNumber = pageNumber
        };
    }

    private static bool haveUserLiked(int? postId, int userId, ApplicationDbContext context)
    {
        return context.Likes.Any(t => t.PostId == postId && t.UserId == userId);
    }
    
    [HttpGet("user/paged/{pageNumber}/{pageSize}")]
    public FeedResponse GetUserUploadedFeedsOnly(int pageNumber, int pageSize)
    {
        var feed = context.Posts
            .Include(t => t.User)
            .OrderByDescending(t => t.CreatedDate)
            .Skip(pageSize * (pageNumber - 1)).Take(pageSize)
            .Where(t=>t.UserId == User.GetUserId())
            .Select(t => new FeedDto
            {
                Id = t.Id,
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

    [HttpPost("like/{feedId}")]
    public IActionResult Like(int feedId)
    {
        var likeInDb = context.Likes.FirstOrDefault(
            t => t.UserId == User.GetUserId() && t.PostId == feedId
        );
        if (likeInDb is not null)
        {
            return Ok("already liked before!");
        }
        
        var like = new Like()
        {
            UserId = User.GetUserId(),
            PostId = feedId,
        };
        context.Likes.Add(like);
        context.SaveChanges();
        
        return Ok();
    }
    
    [HttpPost("unlike/{feedId}")]
    public IActionResult Unlike(int feedId)
    {
        var likeInDb = context.Likes.FirstOrDefault(
            t => t.UserId == User.GetUserId() && t.PostId == feedId
        );
        if (likeInDb == null)
        {
            return Ok("no change");
        }
        context.Likes.Remove(likeInDb);
        context.SaveChanges();
        
        return Ok();
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

    [HttpDelete("delete/{feedId}")]
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
    public int? Id { get; set; }
    public bool HaveUserLiked { get; set; }
}

public class CreateFeedRequest
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public string ImageUrl { get; set; }
}