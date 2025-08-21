import ExpoModulesCore

internal final class ViewNotFoundException: GenericException<String?> {
  override var reason: String {
    "View with tag \(param ?? "unknown") not found"
  }
}

internal final class UnsupportedOutputException: GenericException<String?> {
  override var reason: String {
    "Unsupported output format: \(param ?? "unknown")"
  }
}

internal final class TakingScreenshotException: Exception {
  override var reason: String {
    "An error occurred while taking a screenshot. Please rise an issue about it with a reproducible example."
  }
}
