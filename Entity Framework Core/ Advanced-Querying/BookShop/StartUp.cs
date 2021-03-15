namespace BookShop
{
    using BookShop.Models.Enums;
    using Data;
    using Initializer;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Globalization;
    using System.Linq;
    using System.Text;

    public class StartUp
    {
        public static void Main()
        {
            using var db = new BookShopContext();
            //DbInitializer.ResetDatabase(db);

            Console.WriteLine(RemoveBooks(db));
        }
        public static int RemoveBooks(BookShopContext context)
        {
            var booksToDelete = context.Books
                .Where(x => x.Copies < 4200)
                .ToList();

            context.Books.RemoveRange(booksToDelete);

            context.SaveChanges();

            return booksToDelete.Count();
        }
        public static void IncreasePrices(BookShopContext context)
        {
            var books = context.Books
                .Where(x => x.ReleaseDate.Value.Year < 2010)
                .ToList();

            foreach (var book in books)
            {
                book.Price += 5;
            }

            context.SaveChanges();
        }
        public static string GetMostRecentBooks(BookShopContext context)
        {
            var categories = context.Categories
                .Select(x => new
                {
                    Category = x.Name,
                    Books = x.CategoryBooks.Select(x => new
                    {
                        BookName = x.Book.Title,
                        Released = x.Book.ReleaseDate
                    })
                    .OrderByDescending(x => x.Released)
                    .Take(3)
                    .ToList()
                })
                .OrderBy(x => x.Category)
                .ToList();

            var sb = new StringBuilder();

            foreach (var c in categories)
            {
                sb.AppendLine($"--{c.Category}");

                foreach (var book in c.Books)
                {
                    sb.AppendLine($"{book.BookName} ({book.Released.Value.Year})");
                }
            }

            return sb.ToString().TrimEnd();
        }
        public static string GetTotalProfitByCategory(BookShopContext context)
        {
            var categories = context.Categories
                .Select(x => new
                {
                    Category = x.Name,
                    TotalProfit = x.CategoryBooks.Select(y => new
                    {
                        profit = y.Book.Price * y.Book.Copies
                    }).Sum(x => x.profit)
                })
                .OrderByDescending(x => x.TotalProfit)
                .ThenBy(x => x.Category)
                .ToArray();

            var sb = new StringBuilder();

            foreach (var c in categories)
            {
                sb.AppendLine($"{c.Category} ${c.TotalProfit:f2}");
            }

            return sb.ToString().TrimEnd();

        }
        public static string CountCopiesByAuthor(BookShopContext context)
        {
            var authorCopies = context.Authors
                .Select(x => new
                {
                    fullName = x.FirstName + " " + x.LastName,
                    totalCopies = x.Books.Sum(x => x.Copies)
                })
                .OrderByDescending(x => x.totalCopies)
                .ToArray();

            var sb = new StringBuilder();

            foreach (var ac in authorCopies)
            {
                sb.AppendLine($"{ac.fullName} - {ac.totalCopies}");
            }

            return sb.ToString().TrimEnd();
        }
        public static int CountBooks(BookShopContext context, int lengthCheck)
        {
            var booksCount = context.Books.Count(x => x.Title.Length > lengthCheck);

            return booksCount;
        }
        public static string GetBooksByAuthor(BookShopContext context, string input)
        {
            var charStart = input.ToLower();

            var books = context.Books
                .Where(x => x.Author.LastName.ToLower().StartsWith(charStart))
                .Select(x => new
                {
                    x.Title,
                    x.BookId,
                    AuthorFullName = x.Author.FirstName + " " + x.Author.LastName
                })
                .OrderBy(x => x.BookId)
                .ToList();

            var sb = new StringBuilder();

            foreach (var b in books)
            {
                sb.AppendLine($"{b.Title} ({b.AuthorFullName})");
            }

            return sb.ToString().TrimEnd();
        }
        public static string GetBookTitlesContaining(BookShopContext context, string input)
        {
            var containingChars = input.ToLower();

            var books = context.Books
                .Where(x => x.Title.ToLower().Contains(containingChars))
                .Select(x => x.Title)
                .OrderBy(x => x)
                .ToArray();


            var sb = new StringBuilder();

            foreach (var b in books)
            {
                sb.AppendLine($"{b}");
            }

            return sb.ToString().TrimEnd();
        }
        public static string GetAuthorNamesEndingIn(BookShopContext context, string input)
        {
            var chars = input.ToLower();

            var authors = context.Authors
                .Where(x => x.FirstName.EndsWith(chars))
                .Select(x => new
                {
                    FullName = x.FirstName + " " + x.LastName
                })
                .OrderBy(x => x.FullName)
                .ToList();

            var sb = new StringBuilder();

            foreach (var a in authors)
            {
                sb.AppendLine($"{a.FullName}");
            }

            return sb.ToString().TrimEnd();
        }
        public static string GetBooksReleasedBefore(BookShopContext context, string date)
        {
            var desiredDate = DateTime.ParseExact(date, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            var books = context.Books
                .Where(x => x.ReleaseDate < desiredDate)
                .Select(x => new
                {
                    x.Title,
                    x.EditionType,
                    x.ReleaseDate,
                    x.Price
                })
                .OrderByDescending(x => x.ReleaseDate)
                .ToArray();

            var sb = new StringBuilder();

            foreach (var book in books)
            {
                sb.AppendLine($"{book.Title} - {book.EditionType} - ${book.Price:f2}");
            }

            return sb.ToString().TrimEnd();

        }
        public static string GetBooksByCategory(BookShopContext context, string input)
        {
            var categories = input.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Select(x => x.ToLower())
                .ToArray(); 

            var books = context.Books
                .Include(x => x.BookCategories)
                .ThenInclude(x => x.Category)
                .Where(x => x.BookCategories.Any(c => categories.Contains(c.Category.Name.ToLower())))
                .Select(x => x.Title)
                .OrderBy(title => title)
                .ToArray();

            var result = string.Join(Environment.NewLine, books);

            return result;
        }
        public static string GetBooksNotReleasedIn(BookShopContext context, int year)
        {
            var books = context.Books
                .Where(x => x.ReleaseDate.Value.Year != year)
                .Select(x => new
                {
                    x.BookId,
                    x.Title
                })
                .OrderBy(x => x.BookId)
                .ToList();

            var sb = new StringBuilder();

            foreach (var book in books)
            {
                sb.AppendLine(book.Title);
            }

            return sb.ToString().TrimEnd();

        }
        public static string GetBooksByPrice(BookShopContext context)
        {
            var books = context.Books
                .Where(x => x.Price > 40)
                .Select(x => new
                {
                    x.Title,
                    x.Price
                })
                .OrderByDescending(x => x.Price)
                .ToArray();

            var result = string.Join(Environment.NewLine, books.Select(x => $"{x.Title} - ${x.Price:f2}"));

            return result;
        }
        public static string GetGoldenBooks(BookShopContext context)
        {
            var goldEdition = Enum.Parse<EditionType>("gold", true);

            var books = context.Books
                .Where(x => x.EditionType == goldEdition && x.Copies < 5000)
                .Select(x => new
                {
                    x.BookId,
                    x.Title
                })
                .OrderBy(x => x.BookId)
                .ToList();

            var sb = new StringBuilder();

            foreach (var book in books)
            {
                sb.AppendLine(book.Title);
            }

            return sb.ToString().TrimEnd();
        }
        public static string GetBooksByAgeRestriction(BookShopContext context, string command)
        {
            var restriction = Enum.Parse<AgeRestriction>(command, true);

            var books = context.Books
                .Where(x => x.AgeRestriction == restriction)
                .Select(x => new
                {
                    x.Title
                })
                .OrderBy(x => x.Title)
                .ToList();

            var sb = new StringBuilder();

            foreach (var book in books)
            {
                sb.AppendLine(book.Title);
            }

            return sb.ToString().TrimEnd();
        }
    }
}
