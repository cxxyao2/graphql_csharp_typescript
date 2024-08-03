using GraphQlBackend.DTOs;
using GraphQlBackend.Entities;

namespace GraphQlBackend.Services
{
    public interface IUserService
    {
        string GetMyName();
        Task<IEnumerable<User>> GetAll();
        Task<User?> GetById(int id);
        Task<User?> GetByEmail(string email);

        Task Update(UserUpdateDto user);
        Task Delete(int id);
    }
}