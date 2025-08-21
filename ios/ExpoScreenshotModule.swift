import ExpoModulesCore

public class ExpoScreenshotModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoScreenshot")

    AsyncFunction("makeScreenshot") { (viewTag: Int, options: ScreenshotOptions) in
      guard let view = appContext?.findView(withTag: viewTag, ofType: UIView.self) else {
        throw ViewNotFoundException(String(viewTag))
      }

      guard let window = view.window else {
        return try getEmptyImage(options: options)
      }

      let viewFrameInWindow = view.superview?.convert(view.frame, to: window) ?? view.frame
      let windowBounds = window.bounds
      let visibleRect = viewFrameInWindow.intersection(windowBounds)

      if visibleRect.isEmpty {
        return try getEmptyImage(options: options)
      }

      let visibleRectInView = view.superview?.convert(visibleRect, from: window) ?? visibleRect
      let localVisibleRect = CGRect(
        x: visibleRectInView.origin.x - view.frame.origin.x,
        y: visibleRectInView.origin.y - view.frame.origin.y,
        width: visibleRectInView.width,
        height: visibleRectInView.height
      )
      
      let rendererFormat = UIGraphicsImageRendererFormat()
      rendererFormat.scale = view.window?.screen.scale ?? UIScreen.main.scale

      let renderer = UIGraphicsImageRenderer(bounds: localVisibleRect, format: rendererFormat)
      let image = renderer.image { context in
        // Translate the context to draw only the visible portion
        context.cgContext.translateBy(x: -localVisibleRect.origin.x, y: -localVisibleRect.origin.y)
        view.drawHierarchy(in: view.bounds, afterScreenUpdates: false)
      }

      return try getResultsFromImage(image, options: options)
    }.runOnQueue(.main)
  }

  private func getResultsFromImage(_ image: UIImage, options: ScreenshotOptions) throws -> String {
    guard let imageData = image.pngData() else {
      throw TakingScreenshotException()
    }

    let base64EncodedString = imageData.base64EncodedString(options: .endLineWithLineFeed)

    switch options.output {
    case .base64:
      return base64EncodedString
    case .dataUri:
      return "data:image/png;base64," + base64EncodedString
    case .file:
      throw UnsupportedOutputException(options.output.rawValue)
    }
  }

  private func getEmptyImage(options: ScreenshotOptions) throws -> String {
    let emptyImage = UIGraphicsImageRenderer(size: CGSize(width: 1, height: 1)).image { _ in }
    return try getResultsFromImage(emptyImage, options: options)
  }
}
