using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Extensions;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;

[assembly: OwinStartup(typeof(Reply.Startup))]
namespace Reply
{
    public class Startup
    {
        private const string fileSystemRoot = ".\\wwwroot";

        public void Configuration(IAppBuilder appBuilder)
        {
            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            appBuilder.UseWebApi(config);

            appBuilder.MapSignalR(new HubConfiguration
            {
                EnableDetailedErrors = true
            });

            appBuilder.UseDefaultFiles();

            IFileSystem fileSystem = new PhysicalFileSystem(fileSystemRoot);
            appBuilder.UseFileServer(new FileServerOptions
            {
                FileSystem = fileSystem,
                RequestPath = new PathString("")
            });

            appBuilder.Map("/login", spa =>
            {
                spa.UseFileServer(new FileServerOptions
                {
                    FileSystem = fileSystem,
                    RequestPath = new PathString("")
                });
            });

            appBuilder.UseStageMarker(PipelineStage.MapHandler);
        }
    }
}
