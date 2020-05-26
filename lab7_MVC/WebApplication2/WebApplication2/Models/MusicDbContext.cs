using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.Models;

namespace WebApplication2.Models
{
    public class MusicDbContext : DbContext
    {
        // pkt 26
        public DbSet<Song> Songs { get; set; }

        public DbSet<Genre> Genres { get; set; }

    }
}