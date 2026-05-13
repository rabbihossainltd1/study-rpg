package com.rabbi.studyrpg.app

import android.content.Intent
import android.util.Log
import com.getcapacitor.BridgeActivity
import ee.forgr.capacitor.social.login.GoogleProvider
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin
import ee.forgr.capacitor.social.login.SocialLoginPlugin

class MainActivity : BridgeActivity(), ModifiedMainActivityForSocialLoginPlugin {
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (
            requestCode >= GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MIN &&
            requestCode < GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MAX
        ) {
            val pluginHandle = bridge?.getPlugin("SocialLogin")

            if (pluginHandle == null) {
                Log.i("GoogleActivityResult", "SocialLogin plugin handle is null")
                return
            }

            val plugin = pluginHandle.instance

            if (plugin !is SocialLoginPlugin) {
                Log.i("GoogleActivityResult", "SocialLogin plugin instance is not SocialLoginPlugin")
                return
            }

            plugin.handleGoogleLoginIntent(requestCode, data)
        }
    }

    override fun IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {
        // Required by @capgo/capacitor-social-login.
    }
}
