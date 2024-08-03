namespace GraphQlBackend.Models
{
    public class RefreshToken
    {
        public string Token { get; set; } = string.Empty;
        public DateTimeOffset Created { get; set; } = DateTime.UtcNow;
        public DateTimeOffset Expires { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expires;
    }


    public record TokenPair { public string? AccessToken; public RefreshToken? RefreshToken; }
}