using System.ComponentModel.DataAnnotations;
using GraphQlBackend.Enums;

namespace GraphQlBackend.DTOs
{
    public class UserUpdateDto
    {
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public DateOnly? BirthDay { get; set; }

        [EnumDataType(typeof(Role))]
        public string? Role { get; set; }


        [EmailAddress]
        public string? Email { get; set; }


        [MinLength(6)]
        [MaxLength(30)]
        public string? Password { get; set; }


        [Compare("Password")]
        public string? ConfirmPassword { get; set; }
    }
}