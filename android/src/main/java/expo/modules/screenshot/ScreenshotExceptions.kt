package expo.modules.screenshot

import expo.modules.kotlin.exception.CodedException

internal class ViewNotFoundException(viewTag: Int) :
    CodedException("View with tag $viewTag not found")
internal class UnsupportedOutputException(format: Output) :
    CodedException("Unsupported output format: $format")
internal class TakingScreenshotException :
    CodedException("An error occurred while taking a screenshot. Please rise an issue about it with a reproducible example.")
