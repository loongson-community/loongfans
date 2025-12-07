export default {
    type: "chipset",
    basic: {
        name: 'name',
        series: 'series',
        market: 'market'
    },
    chipset: {
        interface: 'interface'
    },
    gpu: {
        available: 'available',
        name: 'name'
    },
    exp: {
        io_name: 'io_name',
        io_rev: 'io_rev',
        lanes: 'lanes',
        usb_5gbps: 'usb_5gbps',
        usb2: 'usb2',
        sata: 'sata',
        eth: 'eth',
        spi: 'spi',
        uart: 'uart',
        i2c: 'i2c',
        avs: 'avs',
        gpio: 'gpio',
        other: 'other'
    },
    package: {
        socket: 'socket',
        temperature: 'temperature',
        size: 'size'
    }
}