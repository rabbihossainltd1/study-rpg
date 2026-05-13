package com.rabbi.studyrpg.app

import android.content.Intent
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.JSObject
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException

@CapacitorPlugin(name = "GoogleSignIn")
class GoogleSignInPlugin : Plugin() {

    private var pendingCall: PluginCall? = null
    private val RC_SIGN_IN = 9001

    @PluginMethod
    fun signIn(call: PluginCall) {
        pendingCall = call
        val webClientId = call.getString("webClientId") ?: run {
            call.reject("webClientId required")
            return
        }
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(webClientId)
            .requestEmail()
            .build()
        val client = GoogleSignIn.getClient(activity, gso)
        client.signOut().addOnCompleteListener {
            val signInIntent = client.signInIntent
            startActivityForResult(call, signInIntent, RC_SIGN_IN)
        }
    }

    override fun handleOnActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.handleOnActivityResult(requestCode, resultCode, data)
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            try {
                val account = task.getResult(ApiException::class.java)
                val result = JSObject()
                result.put("idToken", account.idToken)
                result.put("email", account.email)
                result.put("displayName", account.displayName)
                pendingCall?.resolve(result)
            } catch (e: ApiException) {
                pendingCall?.reject("Google Sign-In failed: ${e.statusCode}", e)
            }
            pendingCall = null
        }
    }
}
