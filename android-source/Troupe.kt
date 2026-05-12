package in.kalavidara.balaga

data class Troupe(
    val id: String = "",
    val name: String = "",
    val artForm: String = "",
    val leadContact: String = "",
    val contactPhone: String = "",
    val district: String = "",
    val bio: String = "",
    val instruments: List<String> = emptyList(),
    val equipment: List<String> = emptyList(),
    val performancePhotos: List<String> = emptyList(),
    val videoLinks: List<String> = emptyList(),
    val ownerId: String = ""
)
