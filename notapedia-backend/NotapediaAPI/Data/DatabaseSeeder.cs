using System.Text.Json;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Models;

namespace NotapediaAPI.Data
{
    public static class DatabaseSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (!context.Notamons.Any())
            {
                string notamonJson = File.ReadAllText("SeedData/notamon.json");

                var notamonDtos = JsonSerializer.Deserialize<List<NotamonDto>>(notamonJson, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                var mappedNotamons = notamonDtos.Select(n => new Notamon
                {
                    NotamonId = n.NexomonId,
                    Name = n.Name,
                    Number = n.Number,
                    Type = n.NexomonType,
                    TypeId = n.NexomonTypeId
                }).ToList();

                context.Notamons.AddRange(mappedNotamons);
                await context.SaveChangesAsync();
                
            }

            if (!context.Items.Any())
            {
                var itemsJson = await File.ReadAllTextAsync("SeedData/items.json");
                var itemList = JsonSerializer.Deserialize<List<Item>>(itemsJson, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                if (itemList != null)
                {
                    await context.Items.AddRangeAsync(itemList);
                    await context.SaveChangesAsync();
                }
            }

            if (!context.Keys.Any())
            {
                var keysJson = await File.ReadAllTextAsync("SeedData/key.json");
                var keyList = JsonSerializer.Deserialize<List<Key>>(keysJson, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                if (keyList != null)
                {
                    await context.Keys.AddRangeAsync(keyList);
                    await context.SaveChangesAsync();
                }
            }

            if (!context.Statuses.Any())
            {
                var statusJson = await File.ReadAllTextAsync("SeedData/statusEffect.json");
                var statusList = JsonSerializer.Deserialize<List<Status>>(statusJson, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                if (statusList != null)
                {
                    await context.Statuses.AddRangeAsync(statusList);
                    await context.SaveChangesAsync();
                }
            }

            if (!context.TypeEffectivenesses.Any())
{
    Console.WriteLine("Starting seed TypeEffectiveness method.");
    var typeEffectivenessJson = await File.ReadAllTextAsync("SeedData/typeEffectiveness.json");

    using (JsonDocument doc = JsonDocument.Parse(typeEffectivenessJson))
    {
        var typeEffectivenessList = doc.RootElement.EnumerateArray().Select(te => new TypeEffectiveness
        {
            TypeEffectivenessId = te.GetProperty("typeEffectivenessId").GetInt32(),
            Type = te.GetProperty("type").GetString(),
            Normal = te.GetProperty("normal").GetDouble().ToString("0.##"),  // Convert float to string
            Fire = te.GetProperty("fire").GetDouble().ToString("0.##"),
            Water = te.GetProperty("water").GetDouble().ToString("0.##"),
            Plant = te.GetProperty("plant").GetDouble().ToString("0.##"),
            Wind = te.GetProperty("wind").GetDouble().ToString("0.##"),
            Electric = te.GetProperty("electric").GetDouble().ToString("0.##"),
            Mineral = te.GetProperty("mineral").GetDouble().ToString("0.##"),
            Ghost = te.GetProperty("ghost").GetDouble().ToString("0.##"),
            Psychic = te.GetProperty("psychic").GetDouble().ToString("0.##")
        }).ToList();

        if (typeEffectivenessList.Any())
        {
            Console.WriteLine("Seeding TypeEffectiveness data...");
            await context.TypeEffectivenesses.AddRangeAsync(typeEffectivenessList);
            await context.SaveChangesAsync();
        }
    }
}


            if (!context.Vaults.Any())
            {
                var vaultsJson = await File.ReadAllTextAsync("SeedData/vault.json");
                var vaultsList = JsonSerializer.Deserialize<List<Vault>>(vaultsJson, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                if (vaultsList != null)
                {
                    await context.Vaults.AddRangeAsync(vaultsList);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}