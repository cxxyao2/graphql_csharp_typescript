using System.Text.Json.Serialization;
using GraphQlBackend.Enums;

namespace GraphQlBackend.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool? EmailVerified { get; set; }

        public bool Contracted { get; set; } = false;

        [JsonIgnore]
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        [JsonIgnore]
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public string Image { get; set; } = string.Empty;
        public Role Role { get; set; } = Role.User;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateOnly? Birthday { get; set; }
        public string? RefreshToken { get; set; } = string.Empty;

        public DateTimeOffset? TokenCreated { get; set; }
        public DateTimeOffset? TokenExpires { get; set; }



    }
}
