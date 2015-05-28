using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Reply.Controllers
{
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [Route]
        public HttpResponseMessage Post(string user)
        {
            var existingConnections = ConnectionMapper<string>.ChatConnections.GetConnections(user);

            if (existingConnections.Any())
                return Request.CreateResponse(HttpStatusCode.Conflict);

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
