package expo.modules.screenshot

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.types.Enumerable

enum class Output(val value: String) : Enumerable {
    FILE("file"),
    BASE64("base64"),
    DATA_URI("dataUri");
}

data class ScreenshotOptions(
    @Field val output: Output = Output.DATA_URI
) : Record