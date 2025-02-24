using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotapediaAPI.Models
{
    public class TypeEffectiveness
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TypeEffectivenessId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Type { get; set; }

        public int Normal { get; set; }
        public int Fire { get; set; }
        public int Water { get; set; }
        public int Plant { get; set; }
        public int Wind { get; set; }
        public int Electric { get; set; }
        public int Mineral { get; set; }
        public int Ghost { get; set; }
        public int Psychic { get; set; }
    }
}