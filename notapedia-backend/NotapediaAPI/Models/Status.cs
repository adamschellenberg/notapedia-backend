using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotapediaAPI.Models
{
    public class Status
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StatusEffectId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Effect { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }
    }
}