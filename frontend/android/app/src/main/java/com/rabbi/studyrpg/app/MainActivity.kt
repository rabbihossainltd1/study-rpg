package com.rabbi.studyrpg.app

import android.content.Intent
import android.os.Bundle
import com.getcapacitor.BridgeActivity
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth

class MainActivity : BridgeActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(GoogleAuth::class.java)
        super.onCreate(savedInstanceState)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
    }
}
