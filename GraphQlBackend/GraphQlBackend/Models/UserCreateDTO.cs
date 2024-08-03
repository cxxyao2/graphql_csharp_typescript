using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using GraphQlBackend.Enums;

namespace GraphQlBackend.DTOs
{
    public class UserCreateDTO
    {

        [JsonPropertyName("name")]
        public string UserName { get; set; } = string.Empty;

        public DateOnly? Birthday;

       
        public Role? Role { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        [MaxLength(30)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}