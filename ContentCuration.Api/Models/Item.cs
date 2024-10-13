   using System;
   using Newtonsoft.Json;

   namespace ContentCurationApi.Models
   {
       public class Item
       {
           [JsonProperty(PropertyName = "id")]
           public string Id { get; set; }

           [JsonProperty(PropertyName = "url")]
           public string Url { get; set; }

           [JsonProperty(PropertyName = "title")]
           public string Title { get; set; }

           [JsonProperty(PropertyName = "thumbnail")]
           public string Thumbnail { get; set; }

           [JsonProperty(PropertyName = "category")]
           public string Category { get; set; }

           [JsonProperty(PropertyName = "recommender")]
           public string Recommender { get; set; }

           [JsonProperty(PropertyName = "watched")]
           public bool Watched { get; set; }

           [JsonProperty(PropertyName = "createdAt")]
           public DateTime CreatedAt { get; set; }
       }
   }