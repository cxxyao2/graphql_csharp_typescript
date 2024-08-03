using GraphQlBackend.DTOs;
using GraphQlBackend.Models;
using GraphQlBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GraphQlBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

            private readonly IAuthService _authService;

            public AuthController(IAuthService authService)
            {
                _authService = authService;
            }

            [HttpPost("register")]
            public async Task<IActionResult> Register(UserCreateDTO user)
            {
                await _authService.Register(user);
                return Ok(new { message = $"User {user.UserName} created" });
            }

            [HttpPost("login")]
            public async Task<IActionResult> Login(UserLoginDto user)
            {
                TokenPair tokenPair = await _authService.Login(user.UserName, user.Password);
                if (tokenPair.RefreshToken != null)
                    SetRefreshToken(tokenPair.RefreshToken);

                return Ok(new { accessToken = tokenPair.AccessToken });
            }


            [HttpPost("refresh-token")]
            public async Task<ActionResult<string>> RefreshToken()
            {
                string? refreshToken = Request.Cookies["refreshToken"];
                TokenPair tokenPair = await _authService.RefreshToken(refreshToken);


                SetRefreshToken(tokenPair.RefreshToken);

                return Ok(new { accessToken = tokenPair.AccessToken });
            }


            private void SetRefreshToken(RefreshToken newRefreshToken)
            {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = newRefreshToken.Expires,
                };
                Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            }
        }
    }

