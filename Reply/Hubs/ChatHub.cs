using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace Reply.Hubs
{
    public class ChatHub : Hub
    {
        public void SendMessage(string message)
        {
            Clients.All.ReceiveMessage(Guid.NewGuid(), Context.QueryString["user"], message, DateTimeOffset.Now);
        }

        public void Login()
        {
            var user = Context.QueryString["user"];

            var existingConnections = ConnectionMapper<string>.ChatConnections.GetConnections(user);

            var unused = !existingConnections.Any();

            if (unused)
                ConnectionMapper<string>.ChatConnections.Add(user, Context.ConnectionId);

            Clients.Client(Context.ConnectionId).LoggedIn(unused);

            Clients.AllExcept(Context.ConnectionId).UserJoined(user);
        }

        public void GetUsers()
        {
            var users = ConnectionMapper<string>.ChatConnections.GetAll();

            Clients.Client(Context.ConnectionId).UserList(users);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            ConnectionMapper<string>.ChatConnections.Remove(Context.QueryString["user"], Context.ConnectionId);
            return Task.FromResult((string)null);
        }
    }
}