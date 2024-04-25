using System.Security.Claims;

namespace PostIt.Controllers.API;

public static class ClaimsPrincipalExtension
{
    public static int GetUserId(this ClaimsPrincipal principal)
    {
        var val = principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        Int32.TryParse(val, out int result);
        return result;
    }
}