using GraphQlBackend.DTOs;
using GraphQlBackend.Models;

namespace GraphQlBackend.Services
{
    public interface IAuthService
    {
        Task Register(UserCreateDTO user);
        Task<TokenPair> Login(string username, string password);
        Task<TokenPair> RefreshToken(string oldRefreshToken);
    }
}