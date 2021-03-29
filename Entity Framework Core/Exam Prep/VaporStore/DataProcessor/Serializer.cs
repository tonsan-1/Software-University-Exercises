namespace VaporStore.DataProcessor
{
	using System;
	using Data;
	using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using Newtonsoft.Json;
    using VaporStore.DataProcessor.Dto.Export;
    using System.Globalization;

    public static class Serializer
	{
		public static string ExportGamesByGenres(VaporStoreDbContext context, string[] genreNames)
		{
            var genresGames = context.Genres
                .ToArray()
                .Where(x => genreNames.Contains(x.Name))
                .Select(x => new
                {
                    Id = x.Id,
                    Genre = x.Name,
                    Games = x.Games
                    .Where(x => x.Purchases.Count > 0)
                    .Select(y => new
                    {
                        Id = y.Id,
                        Title = y.Name,
                        Developer = y.Developer.Name,
                        Tags = String.Join(", ", y.GameTags.Select(x => x.Tag.Name).ToArray()),
                        Players = y.Purchases.Count
                    })
                    .OrderByDescending(x => x.Players)
                    .ThenBy(x => x.Id)
                    .ToList(),

                    TotalPlayers = x.Games.Sum(x => x.Purchases.Count)
                })
                .OrderByDescending(x => x.TotalPlayers)
                .ThenBy(x => x.Id)
                .ToList();

            var json = JsonConvert.SerializeObject(genresGames, Formatting.Indented);

            return json;
		}

		public static string ExportUserPurchasesByType(VaporStoreDbContext context, string storeType)
		{
            var userPurchases = context.Users
                .ToArray()
                .Where(x => x.Cards.Any(y => y.Purchases.Any()))
                .Select(x => new UserPurchasesExportModel
                {
                    Username = x.Username,
                    Purchases = context.Purchases
                    .ToArray()
                    .Where(p => p.Card.User.Username == x.Username && p.Type.ToString() == storeType)
                    .OrderBy(p => p.Date)
                    .Select(p => new PurchaseExportModel
                    {
                        CardNumber = p.Card.Number,
                        Cvc = p.Card.Cvc,
                        Date = p.Date.ToString("yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture),
                        Game = new GameExportModel()
                        {
                            GameName = p.Game.Name,
                            Genre = p.Game.Genre.Name,
                            Price = p.Game.Price
                        }

                    })
                    .ToArray(),

                    TotalSpent = context.Purchases.ToArray().Where(p => p.Card.User.Username == x.Username
                    && p.Type.ToString() == storeType).Sum(p => p.Game.Price)
                })
                .Where(u => u.Purchases.Length > 0)
                .OrderByDescending(x => x.TotalSpent)
                .ThenBy(x => x.Username)
                .ToList();

            var xml = XmlConverter.Serialize(userPurchases, "Users");

            return xml;
		}
	}
}