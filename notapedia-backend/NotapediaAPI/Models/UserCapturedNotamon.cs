using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotapediaAPI.Models
{
    public class UserCapturedNotamon
    {
        [Key]
        public int CaptureId { get; set; }

        [Required]
        public string UserId {get; set;}

        [Required]
        public int NotamonId { get; set; }

        public DateTime CaptureDate { get; set; } = DateTime.UtcNow;
        
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("NotamonId")]
        public virtual Notamon Notamon { get; set; }
    }
}