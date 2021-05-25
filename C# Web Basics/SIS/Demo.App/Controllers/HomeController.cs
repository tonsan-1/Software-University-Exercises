using SIS.HTTP.Requests.Contracts;
using SIS.HTTP.Responses.Contracts;
using SIS.WebServer.Result;

namespace Demo.App.Controllers
{
    public class HomeController : BaseController
    {
        public IHttpResponse Home(IHttpRequest httpRequest)
        {
            var content = "<h1> Hey there, Stranger !</h1>";

            return new HtmlResult(content, SIS.HTTP.Enums.HttpResponseStatusCode.Ok);
        }
    }
}
