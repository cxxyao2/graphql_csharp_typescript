using FirebaseAdmin;
using FirebaseAdminAuthentication.DependencyInjection.Extensions;
using FirebaseAdminAuthentication.DependencyInjection.Models;
using Google.Apis.Auth.OAuth2;
using GraphQlBackend.Data;
using GraphQlBackend.Schema;
using GraphQlBackend.Services;
using Microsoft.EntityFrameworkCore;

var AllowSpecificOrigins = "_allowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContextFactory<OMAContext>(options =>
{
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IOrderService, OrderService>();


// cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});



// graphql
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddFiltering()
    .AddSorting()
    .AddProjections()
    .AddAuthorization();



builder.Services.AddSingleton(FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile(builder.Configuration["FIREBASE_CONFIG_PATH"])
}));
builder.Services.AddFirebaseAuthentication();
builder.Services.AddAuthorization(
    o => o.AddPolicy("IsAdmin",
      p => p.RequireClaim(FirebaseUserClaimType.EMAIL, "cxxyao2@gmail.com")
    ));

var app = builder.Build();



app.UseRouting();

app.UseAuthentication();

app.MapGraphQL();


try
{
    var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<OMAContext>();
    context.Database.Migrate();
}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();