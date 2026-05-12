package in.kalavidara.balaga

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import in.kalavidara.balaga.databinding.ActivityMainBinding

/**
 * Kalavidara Balaga - Main Landing Screen
 * Mission: Connecting rural folk artists with urban event markets.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Vibrant UI setup (Traditional textures handled in XML)
        setupClickListeners()
    }

    private fun setupClickListeners() {
        binding.btnExplore.setOnClickListener {
            startActivity(Intent(this, ArtistDirectoryActivity::class.java))
        }

        binding.btnAbout.setOnClickListener {
            // Show mission dialog or activity
        }
    }
}
