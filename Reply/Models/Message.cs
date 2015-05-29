using System;

namespace Reply.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Who { get; set; }
        public string What { get; set; }
        public DateTimeOffset When { get; set; }
    }
}