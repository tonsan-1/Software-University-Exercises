namespace VaporStore.DataProcessor
{
	using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Globalization;
    using System.Linq;
    using System.Text;
    using Data;
    using Newtonsoft.Json;
    using VaporStore.Data.Models;
    using VaporStore.Data.Models.Enums;
    using VaporStore.DataProcessor.Dto.Import;

    public static class Deserializer
	{
		public static string ImportGames(VaporStoreDbContext context, string jsonString)
		{
			var sb = new StringBuilder();

			var games = new List<Game>();
			var developers = new List<Developer>();
			var genres = new List<Genre>();
			var tags = new List<Tag>();

			var gamesDto = JsonConvert.DeserializeObject<IEnumerable<GamesImportModel>>(jsonString);

			foreach (var game in gamesDto)
			{
				if (!IsValid(game))
                {
					sb.AppendLine("Invalid Data");
					continue;
                }

				DateTime releaseDate;
				var isValidReleaseDate = DateTime.TryParseExact(game.ReleaseDate, "yyyy-MM-dd",
					CultureInfo.InvariantCulture, DateTimeStyles.None, out releaseDate);

                if (!isValidReleaseDate)
                {
					sb.AppendLine("Invalid Data");
					continue;
                }

				var newGame = new Game
				{
					Name = game.Name,
					Price = game.Price,
					ReleaseDate = releaseDate
				};

                var developer = developers.FirstOrDefault(x => x.Name == game.Developer);

                if (developer == null)
                {
					var newDev = new Developer
					{
						Name = game.Developer
					};

					developers.Add(newDev);

					newGame.Developer = newDev;

                }
				else
                {
					newGame.Developer = developer;
                }

				var genre = genres.FirstOrDefault(x => x.Name == game.Genre);

                if (genre == null)
                {
					var newGenre = new Genre
					{
						Name = game.Genre
					};

					genres.Add(newGenre);

					newGame.Genre = newGenre;
                }
				else
                {
					newGame.Genre = genre;
                }

                foreach (var tagName in game.Tags)
                {
                    if (String.IsNullOrEmpty(tagName))
                    {
						continue;
                    }

					var gameTag = tags.FirstOrDefault(x => x.Name == tagName);

					if (gameTag == null)
                    {
						var newTag = new Tag
						{
							Name = tagName
						};

						tags.Add(newTag);

						newGame.GameTags.Add(new GameTag()
						{
							Game = newGame,
							Tag = newTag
						});
                    }
					else
                    {
						newGame.GameTags.Add(new GameTag()
						{
							Game = newGame,
							Tag = gameTag
						});
					}
                }
				if (newGame.GameTags.Count == 0)
				{
					sb.AppendLine("Invalid Data");
					continue;
				}

				games.Add(newGame);

				sb.AppendLine($"Added {newGame.Name} ({newGame.Genre.Name}) with {newGame.GameTags.Count} tags");
			}
			context.Games.AddRange(games);
			context.SaveChanges();

			return sb.ToString().TrimEnd();
		}

		public static string ImportUsers(VaporStoreDbContext context, string jsonString)
		{
			var sb = new StringBuilder();

			var users = new List<User>();

			var usersDto = JsonConvert.DeserializeObject<IEnumerable<UsersImportModel>>(jsonString);

			foreach (var userDto in usersDto)
			{
				if (!IsValid(userDto) || !userDto.Cards.All(IsValid))
                {
					sb.AppendLine("Invalid Data");
					continue;
                }

				var user = new User
				{
					FullName = userDto.FullName,
					Username = userDto.Username,
					Email = userDto.Email,
					Age = userDto.Age,
					Cards = userDto.Cards.Select(x => new Card
					{
						Number = x.Number,
						Cvc = x.Cvc,
						Type = Enum.Parse<CardType>(x.Type)
					})
					.ToList()
				};

				users.Add(user);

				sb.AppendLine($"Imported {user.Username} with {user.Cards.Count} cards");
            }

			context.Users.AddRange(users);
			context.SaveChanges();

			return sb.ToString().TrimEnd();
		}

		public static string ImportPurchases(VaporStoreDbContext context, string xmlString)
		{
			var sb = new StringBuilder();

			var purchases = new List<Purchase>();

			var purchasesDto = XmlConverter.Deserializer<PurchaseImportModel>(xmlString, "Purchases");

            foreach (var currPurchase in purchasesDto)
            {
                if (!IsValid(currPurchase))
                {
					sb.AppendLine("Invalid Data");
					continue;
                }

				DateTime date;
				var isDateValid = DateTime.TryParseExact(currPurchase.Date, "dd/MM/yyyy HH:mm",
					CultureInfo.InvariantCulture, DateTimeStyles.None, out date);

                if (!isDateValid)
                {
					sb.AppendLine("Invalid Data");
					continue;
				}

				var card = context.Cards.FirstOrDefault(x => x.Number == currPurchase.Card);
				var game = context.Games.FirstOrDefault(x => x.Name == currPurchase.GameName);

                if (card == null || game == null)
                {
					sb.AppendLine("Invalid Data");
					continue;
				}

				var purchase = new Purchase
				{
					Type = Enum.Parse<PurchaseType>(currPurchase.Type),
					ProductKey = currPurchase.ProductKey,
					Card = card,
					Date = date,
					Game = game
				};

				purchases.Add(purchase);

				sb.AppendLine($"Imported {game.Name} for {card.User.Username}");
			}

			context.Purchases.AddRange(purchases);
			context.SaveChanges();

			return sb.ToString().TrimEnd();
		}

		private static bool IsValid(object dto)
		{
			var validationContext = new ValidationContext(dto);
			var validationResult = new List<ValidationResult>();

			return Validator.TryValidateObject(dto, validationContext, validationResult, true);
		}
	}
}