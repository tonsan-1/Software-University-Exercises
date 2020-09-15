using System;

namespace _02.Articles
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] articleTokens = Console.ReadLine().Split(", ");

            Article myArticle = new Article(articleTokens[0], articleTokens[1], articleTokens[2]);

            var count = int.Parse(Console.ReadLine());

            for (int i = 0; i < count; i++)
            {
                var splitInput = Console.ReadLine().Split(": ");
                var command = splitInput[0];

                if (command == "Edit")
                {
                    myArticle.Edit(splitInput[1]);
                }
                else if (command == "ChangeAuthor")
                {
                    myArticle.ChangeAuthor(splitInput[1]);
                }
                else
                {
                    myArticle.Rename(splitInput[1]);
                }
            }
            Console.WriteLine(myArticle);
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

        public void Edit(string content)
        {
            this.Content = content;
        }
        public void ChangeAuthor(string author)
        {
            this.Author = author;
        }
        public void Rename(string newTitle)
        {
            this.Title = newTitle;
        }
        public override string ToString()
        {
            return $"{Title} - {Content}: {Author}";
        }
    }
}
