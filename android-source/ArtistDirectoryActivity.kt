package in.kalavidara.balaga

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import in.kalavidara.balaga.databinding.ActivityArtistDirectoryBinding
import com.google.firebase.firestore.FirebaseFirestore

class ArtistDirectoryActivity : AppCompatActivity() {

    private lateinit var binding: ActivityArtistDirectoryBinding
    private lateinit var adapter: TroupeAdapter
    private val db = FirebaseFirestore.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityArtistDirectoryBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupRecyclerView()
        setupFilters()
        fetchTroupes()
    }

    private fun setupRecyclerView() {
        adapter = TroupeAdapter { troupe ->
            val intent = Intent(this, TroupeProfileActivity::class.java).apply {
                putExtra("TROUPE_ID", troupe.id)
            }
            startActivity(intent)
        }
        binding.rvTroupes.layoutManager = LinearLayoutManager(this)
        binding.rvTroupes.adapter = adapter
    }

    private fun setupFilters() {
        // District Filter
        val districts = arrayOf("All Districts", "Shivamogga", "Tumakuru", "Udupi", "Mysuru")
        val districtAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, districts)
        binding.spinnerDistrict.adapter = districtAdapter

        // Art Type Filter
        val artTypes = arrayOf("All Art Forms", "Dollu Kunitha", "Pooja Kunitha", "Yakshagana")
        val artAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, artTypes)
        binding.spinnerArtType.adapter = artAdapter
    }

    private fun fetchTroupes() {
        db.collection("troupes")
            .get()
            .addOnSuccessListener { result ->
                val list = result.toObjects(Troupe::class.java)
                adapter.submitList(list)
            }
            .addOnFailureListener {
                // Handle error
            }
    }
}
