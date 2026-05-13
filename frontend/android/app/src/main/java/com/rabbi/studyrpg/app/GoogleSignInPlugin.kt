package com.rabbi.studyrpg.app

import android.app.Activity
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
        startActivityForResult(call, client.signInIntent, "onSignInResult")
    }

    @ActivityCallback
    private fun onSignInResult(call: PluginCall, result: androidx.activity.result.ActivityResult) {
        try {
            val account = GoogleSignIn.getSignedInAccountFromIntent(result.data)
                .getResult(ApiException::class.java)
            val ret = JSObject()
            ret.put("idToken", account.idToken ?: "")
            ret.put("email", account.email ?: "")
            ret.put("displayName", account.displayName ?: "")
            call.resolve(ret)
        } catch (e: ApiException) {
            call.reject("Google Sign-In failed code: ${e.statusCode}")
        }
    }
}
