package com.rabbi.studyrpg.app

import android.app.Activity
import android.content.Intent
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.ActivityCallback
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.JSObject
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException

@CapacitorPlugin(name = "GoogleSignIn")
class GoogleSignInPlugin : Plugin() {

    @PluginMethod
    fun signIn(call: PluginCall) {
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
            startActivityForResult(call, signInIntent, "handleSignInResult")
        }
    }

    @ActivityCallback
    private fun handleSignInResult(call: PluginCall, result: com.getcapacitor.plugin.util.HttpRequestHandler.HttpURLConnectionBuilder?) {
        // unused - handled below
    }

    @ActivityCallback
    fun handleSignInResult(call: PluginCall, result: androidx.activity.result.ActivityResult) {
        if (result.resultCode == Activity.RESULT_OK) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(result.data)
            try {
                val account = task.getResult(ApiException::class.java)
                val ret = JSObject()
                ret.put("idToken", account.idToken ?: "")
                ret.put("email", account.email ?: "")
                ret.put("displayName", account.displayName ?: "")
                call.resolve(ret)
            } catch (e: ApiException) {
                call.reject("Sign in failed: ${e.statusCode}")
            }
        } else {
            call.reject("Sign in cancelled")
        }
    }
}
