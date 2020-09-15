using System;
using System.Collections.Generic;
using System.Linq;

namespace _03.Articles_2._0
{
    class Program
    {
        static void Main(string[] args)
        {
            int count = int.Parse(Console.ReadLine());
            List<Article> list = new List<Article>();

            for (int i = 0; i < count; i++)
            {
                var splitInput = Console.ReadLine()
                    .Split(", ");

                Article myArticle = new Article(splitInput[0], splitInput[1], splitInput[2]);

                list.Add(myArticle);
            }

            var criteria = Console.ReadLine();
            List<Article> sortedArticle = new List<Article>();

            if (criteria == "title")
            {
                sortedArticle = list.OrderBy(a => a.Title).ToList();
            }
            else if (criteria == "author")
            {
                sortedArticle = list.OrderBy(a => a.Author).ToList();
            }
            else
            {
                sortedArticle = list.OrderBy(a => a.Content).ToList();
            }

            sortedArticle.ForEach(x => Console.WriteLine(x));
        }
    }
    class Article
    {
        public Article(string title, string content, string author)
        {
            this.Title = title;
            this.Content = content;
            this.Author = author;
        }
        public string Title { get; set; }

        public string Content { get; set; }

        public string Author { get; set; }

        public override string ToString()
        {
            return $"{Title} - {Content}: {Author}";
        }
    }
}