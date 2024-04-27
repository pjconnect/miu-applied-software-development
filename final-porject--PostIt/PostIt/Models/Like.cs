using System.ComponentModel.DataAnnotations;

namespace PostIt.Models;

public class Like
{
    [Key] public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }

    public Post? Post { get; set; }
    public int PostId { get; set; }
}