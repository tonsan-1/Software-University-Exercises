namespace MusicHub
{
    using System;
    using System.Linq;
    using System.Text;
    using Data;
    using Initializer;

    public class StartUp
    {
        public static void Main(string[] args)
        {
            MusicHubDbContext context =
                new MusicHubDbContext();

            DbInitializer.ResetDatabase(context);

            var result = ExportSongsAboveDuration(context, 4);

            Console.WriteLine(result);
        }

        public static string ExportAlbumsInfo(MusicHubDbContext context, int producerId)
        {
            var albumsInfo = context.Producers
                .FirstOrDefault(x => x.Id == producerId)
                .Albums
                .Select(x => new
                {
                    AlbumName = x.Name,
                    ReleaseDate = x.ReleaseDate,
                    ProducerName = x.Producer.Name,
                    Songs = x.Songs.Select(s => new
                    {
                        SongName = s.Name,
                        Price = s.Price,
                        SongWriterName = s.Writer.Name
                    })
                    .OrderByDescending(x => x.SongName)
                    .ThenBy(x => x.SongWriterName)
                    .ToList(),
                    AlbumPrice = x.Price
                })
                .OrderByDescending(x => x.AlbumPrice)
                .ToList();


            var sb = new StringBuilder();

            foreach (var album in albumsInfo)
            {
                sb.AppendLine($"-AlbumName: {album.AlbumName}")
                .AppendLine($"-ReleaseDate: {album.ReleaseDate:MM/dd/yyyy}")
                .AppendLine($"-ProducerName: {album.ProducerName}")
                .AppendLine($"-Songs:");

                var num = 1;

                foreach (var song in album.Songs)
                {
                    sb.AppendLine($"---#{num++}")
                      .AppendLine($"---SongName: {song.SongName}")
                      .AppendLine($"---Price: {song.Price:f2}")
                      .AppendLine($"---Writer: {song.SongWriterName}");
                }

                sb.AppendLine($"-AlbumPrice: {album.AlbumPrice:f2}");
            }

            return sb.ToString().TrimEnd();
        }

        public static string ExportSongsAboveDuration(MusicHubDbContext context, int duration)
        {
            var songs = context.Songs
                .Where(x => x.Duration.TotalSeconds >= duration)
                .Select(x => new
                {
                    Name = x.Name,
                    PerformerFullName = x.SongPerformers.Select(x => new
                    {
                        FullName = x.Performer.FirstName + " " + x.Performer.LastName
                    }),
                    WriterName = x.Writer.Name,
                    AlbumProducer = x.Album.Producer.Name,
                    Duration = x.Duration
                })
                .OrderBy(x => x.Name)
                .ThenBy(x => x.WriterName)
                .ThenBy(x => x.PerformerFullName)
                .ToList();

            return null;
        }
    }
}
