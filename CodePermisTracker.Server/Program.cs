using CodePermisTracker.Infrastructure;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Chargement de la config
var configuration = builder.Configuration;

// Services internes (DbContext, Repositories)
builder.Services.AddInfrastructureServices(configuration);

// Services API (contrôleurs, swagger)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "PermisTracker API", Version = "v1" });
});

// Services de sécurité (uniquement autorisation ici)
builder.Services.AddAuthorization();
// (authentification désactivée pour l'instant)

//// CORS si Angular est hébergé ailleurs
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", policy =>
//    {
//        policy.AllowAnyOrigin()
//              .AllowAnyMethod()
//              .AllowAnyHeader();
//    });
//});

var app = builder.Build();

// Middlewares statiques (Angular)
app.UseDefaultFiles();
app.UseStaticFiles();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS + CORS + sécurité
app.UseHttpsRedirection();
app.UseCors("AllowAll");
// app.UseAuthentication(); // activable plus tard
app.UseAuthorization();

// Routes
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
