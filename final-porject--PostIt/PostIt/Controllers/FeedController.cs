using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostIt.Domain;
using PostIt.Models;
using PostIt.utils;

namespace PostIt.Controllers.API;

[Route("/api/feed")]
[ApiController]
[Authorize]
public class FeedController(FeedService service) : Controller
{
    [HttpGet("paged/{pageNumber}/{pageSize}")]
    public IActionResult GetFeed(int pageNumber, int pageSize)
    {
        var userId = User.GetUserId();
        var res = service.GetFeed(pageNumber, pageSize, userId);
        return this.Send(res);
    }
    
    [HttpGet("user/paged/{pageNumber}/{pageSize}")]
    public IActionResult GetUserUploadedFeedsOnly(int pageNumber, int pageSize)
    {
        var userId = User.GetUserId();
        var res = service.GetUserUploadedFeedsOnly(pageNumber, pageSize, userId);
        return this.Send(res);
    }

    [HttpPost("like/{feedId}")]
    public IActionResult Like(int feedId)
    {
        var userId = User.GetUserId();
        var res = service.Like(feedId, User.GetUserId());
        return this.Send(res);
    }
    
    [HttpPost("unlike/{feedId}")]
    public IActionResult Unlike(int feedId)
    {
        var userId = User.GetUserId();
        var res = service.Unlike(feedId, User.GetUserId());
        return this.Send(res);
    }

    [HttpPost]
    public IActionResult CreateFeed([FromBody] CreateFeedRequest request)
    {
        var userId = User.GetUserId();
        var res = service.CreateFeed(request, User.GetUserId());
        return this.Send(res);
    }

    [HttpDelete("delete/{feedId}")]
    public IActionResult DeleteFeedItem(int feedId)
    {
        var userId = User.GetUserId();
        var res = service.DeleteFeedItem(feedId, User.GetUserId());
        return this.Send(res);
    }
}