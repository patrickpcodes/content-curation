   using System.Collections.Generic;
   using System.Linq;
   using System.Threading.Tasks;
   using Microsoft.Azure.Cosmos;
   using ContentCurationApi.Models;

   namespace ContentCurationApi.Services
   {
       public class CosmosDbService : ICosmosDbService
       {
           private Container _container;

           public CosmosDbService(
               CosmosClient dbClient,
               string databaseName,
               string containerName)
           {
               this._container = dbClient.GetContainer(databaseName, containerName);
           }

           public async Task AddItemAsync(Item item)
           {
               await this._container.CreateItemAsync<Item>(item, new PartitionKey(item.Id));
           }

           public async Task DeleteItemAsync(string id)
           {
               await this._container.DeleteItemAsync<Item>(id, new PartitionKey(id));
           }

           public async Task<Item> GetItemAsync(string id)
           {
               try
               {
                   ItemResponse<Item> response = await this._container.ReadItemAsync<Item>(id, new PartitionKey(id));
                   return response.Resource;
               }
               catch(CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
               {
                   return null;
               }
           }

           public async Task<IEnumerable<Item>> GetItemsAsync(string queryString)
           {
               var query = this._container.GetItemQueryIterator<Item>(new QueryDefinition(queryString));
               List<Item> results = new List<Item>();
               while (query.HasMoreResults)
               {
                   var response = await query.ReadNextAsync();
                   
                   results.AddRange(response.ToList());
               }
               return results;
           }

           public async Task UpdateItemAsync(string id, Item item)
           {
               await this._container.UpsertItemAsync<Item>(item, new PartitionKey(id));
           }
       }

       public interface ICosmosDbService
       {
           Task<IEnumerable<Item>> GetItemsAsync(string query);
           Task<Item> GetItemAsync(string id);
           Task AddItemAsync(Item item);
           Task UpdateItemAsync(string id, Item item);
           Task DeleteItemAsync(string id);
       }
   }