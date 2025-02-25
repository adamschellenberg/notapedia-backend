using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace NotapediaAPI.Models
{
    public class User : IdentityUser
    {
        [MaxLength(255)]
        public string ProfileImage { get; set; } = "masquiti-follower.png";
        public string Username { get; set; }

        public string Discriminator { get; set; } = "User";
        public virtual List<UserCapturedNotamon> CapturedNotamons { get; set; }
    }
}