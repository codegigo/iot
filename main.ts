input.onButtonPressed(Button.A, function () {
    MQTT.connect()
})
input.onButtonPressed(Button.B, function () {
    MQTT.b2MQTT("temp :" + input.temperature())
})
MQTT.onEsp32DataReceived(function (data) {
    // รับข้อมูลจากหน้า Message
    if (data == "ok") {
        basic.showIcon(IconNames.Heart)
        basic.pause(1000)
        basic.clearScreen()
    }
    // รับการสั่งงานจากหน้า
    // Pin Control
    MQTT.setPinIfMatch(MQTT.PinChannel.P0, data)
    // รับการสั่งงานจากหน้า
    // Pin Control
    MQTT.setPinIfMatch(MQTT.PinChannel.P13, data)
    // รับการสั่งงานจากหน้า
    // Pin Control
    MQTT.setPinIfMatch(MQTT.PinChannel.P15, data)
})
let irsensor = 0
// set ขาเชื่อมต่อ
// ของGigo บนซ้ายเป็น Tx ล่างซ้ายเป็น Rx
MQTT.initializeUART(SerialPin.P1, SerialPin.P2)
// ตั้ง uniqueId ใช้ตั้งกับ web
MQTT.setConnectionInfo("microbit-control", "InwO", "11222222")
basic.pause(2000)
// สำหรับใช้แยก เช่น ใช้ปุ่ม A ในการเริ่มการเชื่อมต่อ
MQTT.connect()
basic.forever(function () {
    irsensor = pins.digitalReadPin(DigitalPin.P14)
    if (irsensor == 1) {
        MQTT.b2MQTT("Find Object")
        basic.pause(1000)
    }
})
