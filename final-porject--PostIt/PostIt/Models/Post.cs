using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace PostIt.Models;

public class Post
{
    [Key]
    [NotNull]
    public int? Id { get; set; }
    public string? Description { get; set; }
    public string ImageUrl { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public PostStatus Status { get; set; } = PostStatus.Public;
    
    public int UserId { get; set; }
    public User? User { get; set; }
}

public enum PostStatus
{
    Public,
}