using Microsoft.Azure.Cosmos;
using ContentCurationApi.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CosmosDB
builder.Services.AddSingleton<ICosmosDbService>(InitializeCosmosClientInstanceAsync(builder.Configuration.GetSection("CosmosDb")).GetAwaiter().GetResult());

var app = builder.Build();
//Seed dummy data
await SeedDummyData(app.Services.GetRequiredService<ICosmosDbService>());


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

static async Task<CosmosDbService> InitializeCosmosClientInstanceAsync(IConfigurationSection configurationSection)
{
    string databaseName = configurationSection.GetSection("DatabaseName").Value;
    string containerName = configurationSection.GetSection("ContainerName").Value;
    string account = configurationSection.GetSection("Account").Value;
    string key = configurationSection.GetSection("Key").Value;
    CosmosClient client = new CosmosClient(account, key);
    CosmosDbService cosmosDbService = new CosmosDbService(client, databaseName, containerName);
    DatabaseResponse database = await client.CreateDatabaseIfNotExistsAsync(databaseName);
    await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");

    return cosmosDbService;
}

static async Task SeedDummyData(ICosmosDbService cosmosDbService)
{
    var dummyItems = new List<Item>
    {
        new Item
        {
            Id = Guid.NewGuid().ToString(),
            Url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            Title = "Never Gonna Give You Up",
            Thumbnail = "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
            Category = "Music",
            Recommender = "Internet Culture",
            Watched = false,
            CreatedAt = DateTime.UtcNow
        },
        new Item
        {
            Id = Guid.NewGuid().ToString(),
            Url = "https://www.youtube.com/watch?v=_GuOjXYl5ew",
            Title = "Next.js 13 Crash Course | App Directory, React Server Components & More",
            Thumbnail = "https://img.youtube.com/vi/_GuOjXYl5ew/0.jpg",
            Category = "Technology",
            Recommender = "Traversy Media",
            Watched = false,
            CreatedAt = DateTime.UtcNow
        },
        new Item
        {
            Id = Guid.NewGuid().ToString(),
            Url = "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
            Title = "What the heck is the event loop anyway? | Philip Roberts | JSConf EU",
            Thumbnail = "https://img.youtube.com/vi/8aGhZQkoFbQ/0.jpg",
            Category = "Technology",
            Recommender = "JSConf",
            Watched = false,
            CreatedAt = DateTime.UtcNow
        }
    };

    foreach (var item in dummyItems)
    {
        await cosmosDbService.AddItemAsync(item);
    }
}
