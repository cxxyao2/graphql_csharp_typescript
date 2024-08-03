using System.Security.Claims;
using GraphQlBackend.Data;
using GraphQlBackend.DTOs;
using GraphQlBackend.Entities;
using GraphQlBackend.Helpers;
using Microsoft.EntityFrameworkCore;

namespace GraphQlBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;

        public UserService(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {

                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);

            }
            return result;
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User?> GetById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(UserUpdateDto model)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(x => x.Id == model.UserId);
            if (user == null)
                throw new KeyNotFoundException($"User {model.UserId} not found");

            // validate
            bool emailChanged = !string.IsNullOrEmpty(model.Email) && user.Email != model.Email;
            bool emailExists = await _context.Users.AnyAsync(x => x.Email == model.Email);
            if (emailChanged && emailExists)
                throw new Exception("User with the email '" + model.Email + "' already exists");


            if (!string.IsNullOrEmpty(model.Password))
            {
                PasswordHashingHelper.CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            User? user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
                throw new KeyNotFoundException($"User {id} not found");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

        }
    }
}


