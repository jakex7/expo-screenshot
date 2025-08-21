import ExpoModulesCore

internal enum Output: String, Enumerable {
  case file
  case base64
  case dataUri
}

internal struct ScreenshotOptions: Record {
  @Field
  var output: Output = Output.dataUri
}
