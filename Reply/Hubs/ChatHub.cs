using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Reply.Models;

namespace Reply.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly ConnectionMapper<string> ChatConnections = new ConnectionMapper<string>();

        private readonly object locker = new object();
        private static List<Message> messages = new List<Message>();

        public void SendMessage(string what)
        {
            var message = new Message
            {
                Id = Guid.NewGuid(),
                Who = Context.QueryString["user"],
                What = what,
                When = DateTimeOffset.Now
            };

            lock (locker)
            {
                messages.Add(message);
                if (messages.Count > 50)
                    messages = new List<Message>(messages.Take(50));
            }

            Clients.All.ReceiveMessage(message);
        }

        public void Login()
        {
            var user = Context.QueryString["user"];

            var existingConnections = ChatConnections.GetConnections(user);

            var unused = !existingConnections.Any();

            if (unused)
            {
                ChatConnections.Add(user, Context.ConnectionId);
                Clients.AllExcept(Context.ConnectionId).UserJoined(user);
                Clients.Client(Context.ConnectionId).LoggedIn();
            }
            else
            {
                Clients.Client(Context.ConnectionId).UsernameTaken();
            }
        }

        public void GetHistory()
        {
            Clients.Client(Context.ConnectionId).ReceiveMessageHistory(messages);
        }

        public void GetUsers()
        {
            var users = ChatConnections.GetAll();

            Clients.Client(Context.ConnectionId).UserList(users);
        }

        public void Rejoin()
        {
            var user = Context.QueryString["user"];
            ChatConnections.Add(user, Context.ConnectionId);
            Clients.AllExcept(Context.ConnectionId).UserJoined(user);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            ChatConnections.Remove(Context.QueryString["user"], Context.ConnectionId);
            return Task.FromResult((string)null);
        }
    }
}