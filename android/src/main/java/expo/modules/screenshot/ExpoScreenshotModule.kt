package expo.modules.screenshot

import android.graphics.Bitmap
import android.graphics.Rect
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Base64
import android.view.PixelCopy
import android.view.View
import androidx.annotation.RequiresApi
import androidx.core.graphics.createBitmap
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.ByteArrayOutputStream

class ExpoScreenshotModule : Module() {
    @RequiresApi(Build.VERSION_CODES.O)
    override fun definition() = ModuleDefinition {
        Name("ExpoScreenshot")

        AsyncFunction("makeScreenshot") { viewTag: Int, screenshotOptions: ScreenshotOptions?, promise: Promise ->
            val options = screenshotOptions ?: ScreenshotOptions()
            val activity = appContext.throwingActivity

            val view = getViewByTag(viewTag)
            val viewRect = getViewRect(view)

            val bitmap = createBitmap(viewRect.width(), viewRect.height(), Bitmap.Config.ARGB_8888)
            PixelCopy.request(
                activity.window, viewRect, bitmap,
                { copyResult ->
                    if (copyResult == PixelCopy.SUCCESS) {
                        promise.resolve(getResultsFromBitmap(bitmap, options))
                    } else {
                        throw TakingScreenshotException()
                    }
                    bitmap.recycle()
                },
                Handler(Looper.getMainLooper())
            )
        }
    }

    private fun getViewByTag(viewTag: Int): View {
        val activity = appContext.throwingActivity
        return activity.findViewById(viewTag) ?: throw ViewNotFoundException(viewTag)
    }

    private fun getViewRect(view: View): Rect {
        val rect = Rect()
        view.getGlobalVisibleRect(rect)
        return rect
    }

    private fun getResultsFromBitmap(bitmap: Bitmap, options: ScreenshotOptions): String {
        return when (options.output) {
            Output.BASE64 -> bitmapToBase64(bitmap)
            Output.DATA_URI -> "data:image/png;base64," + bitmapToBase64(bitmap)
            else -> throw UnsupportedOutputException(options.output)
        }
    }

    private fun bitmapToBase64(bitmap: Bitmap): String {
        val byteArrayOutputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
        val byteArray = byteArrayOutputStream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.NO_WRAP)
    }
}
