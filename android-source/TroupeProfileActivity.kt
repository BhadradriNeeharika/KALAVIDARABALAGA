package in.kalavidara.balaga

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import in.kalavidara.balaga.databinding.ActivityTroupeProfileBinding
import com.google.firebase.firestore.FirebaseFirestore

class TroupeProfileActivity : AppCompatActivity() {

    private lateinit var binding: ActivityTroupeProfileBinding
    private val db = FirebaseFirestore.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityTroupeProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val troupeId = intent.getStringExtra("TROUPE_ID") ?: return
        loadTroupeDetails(troupeId)
    }

    private fun loadTroupeDetails(id: String) {
        db.collection("troupes").document(id).get()
            .addOnSuccessListener { doc ->
                val troupe = doc.toObject(Troupe::class.java) ?: return@addOnSuccessListener
                bindData(troupe)
            }
    }

    private fun bindData(troupe: Troupe) {
        binding.tvName.text = troupe.name
        binding.tvArtForm.text = troupe.artForm
        binding.tvLead.text = "Lead: ${troupe.leadContact}"
        binding.tvEquipment.text = troupe.equipment.joinToString("\n• ")

        // StaggeredGridLayout for Gallery as requested
        binding.rvGallery.layoutManager = StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL)
        binding.rvGallery.adapter = GalleryAdapter(troupe.performancePhotos)

        // Call Feature using Intents
        binding.btnCall.setOnClickListener {
            val callIntent = Intent(Intent.ACTION_DIAL).apply {
                data = Uri.parse("tel:${troupe.contactPhone}")
            }
            startActivity(callIntent)
        }
    }
}
