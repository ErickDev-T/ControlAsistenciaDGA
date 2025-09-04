using Microsoft.EntityFrameworkCore;
using ProjectAPIStore.Data;  
using ProjectAPIStore.Models; 

var builder = WebApplication.CreateBuilder(args);

// DB
builder.Services.AddDbContext<TestDgadbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("connectionDB"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173") // URL de Vite
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// redirigir raiz a Swagger
app.MapGet("/", ctx =>
{
    ctx.Response.Redirect("/swagger/index.html", permanent: false);
    return Task.CompletedTask;
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseStaticFiles();
app.UseAuthorization();

app.MapControllers();

app.Run();
