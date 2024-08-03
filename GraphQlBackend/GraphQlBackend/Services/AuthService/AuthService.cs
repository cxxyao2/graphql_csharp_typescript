using GraphQlBackend.Data;
using GraphQlBackend.DTOs;
using GraphQlBackend.Entities;
using GraphQlBackend.Enums;
using GraphQlBackend.Helpers;
using GraphQlBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphQlBackend.Services
{

    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public AuthService(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<TokenPair> RefreshToken(string oldRefreshToken)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(x => x.RefreshToken == oldRefreshToken);
            if (user == null)
            {
                throw new Exception("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                throw new Exception("Token expired.");
            }

            TokenPair tokenPair = await GenerateTokens(user);
            return tokenPair;
        }

        public async Task<TokenPair> Login(string username, string password)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == username.ToLower());
            if (user == null || !PasswordHashingHelper.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                throw new Exception("Username or password is incorrect");
            }
            TokenPair TokenPair = await GenerateTokens(user);
            return TokenPair;
        }


        public async Task Register(UserCreateDTO model)
        {
            bool emailExists = await _context.Users.AnyAsync(x => x.Email == model.Email);
            if (emailExists)
            {
                throw new Exception("User with the email '" + model.Email + "' already exists");

            }

            User? user = new User();
            PasswordHashingHelper.CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.UserName = model.UserName;
            user.Birthday = model.Birthday;
            user.Role = model.Role?? Role.User;

            user.Email = model.Email;
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

        }

        private async Task<TokenPair> GenerateTokens(User user)
        {
            string? tokenSecret = _config.GetSection("Secrets:Token").Value;
            if (string.IsNullOrEmpty(tokenSecret))
            {
                throw new Exception("Token secret is not set");
            }
            string token = TokenCreatingHelper.CreateToken(user, tokenSecret);
            RefreshToken newRefreshToken = TokenCreatingHelper.GenerateRefreshToken();
            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            TokenPair tokenPair = new()
            { AccessToken = token, RefreshToken = newRefreshToken };

            return tokenPair;

        }


    }

}