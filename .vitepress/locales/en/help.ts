export default {
    basic: {
        series: "Product Series refers to the family to which this product belongs.",
        market: "Market Segment refers to the cost and applications as recommended by Loongson Technology. Please note that it does not reflect the actual applications and scenarios where products based on this chip is used."
    },
    cpu: {
        voltage: "Typical Voltage refers to the typical core voltage as required for stable operation at the rated frequency.",
        tpc: `Typical Power Consumption refers to the normative power consumption under normal workload.

        Note: Typical Power Consumption does not reflect the power consumption for each specific use case.`,
        tdp: `Thermal Design Power refers to the maximal heat output under extreme load.

        Note: Thermal Design Power does not reflect the actual power consumption of this chip.`
    },
    memory: {
        ecc: `ECC memory modules are capable to detecting and correcting internal data corruption and are known to be effective in enhancing system stability and reliability. ECC takes extra 8 bits to store checksums on each 64 bits of data stored and, when said data were read, they were verified against the aforementioned checksum to detect and repair corrupted data, preventing bad data from reaching the processor.
        
        Note: ECC memory support is implemented on the motherboard and firmware level. Please contact your device manufacturer for details.`
    },
    exp: {
        io_name: "I/O Interface refer to the channel through which the processor exchanges data with peripherals.",
        io_rev: `I/O Interface Revision refers to the version at which the main I/O interface operates at.
                
        Note: PCI Express 4.0 support is implemented on the motherboard and firmware level. PLease contact your device manufacturer for details.`,
        d2d_name: `Die-to-Die Connection refers to the technology with which multiple processor dies interconnect.

        Loongson Coherent Link is an in-house die-to-die connection, bringing lower latency and higher bandwidth than HyperTransport 3.0. HyperTransport is a high-speed, low-latency, and point-to-point serial/parallel bus, usually used to form connections between processors, chipsets, memory controllers, and I/O peripherals.`
    },
    package: {
        temperature: "Case Temperature refers to the range of temperature the surface of the chip package is allowed to reach.",
        t_case: " (Case Temperature) refers to the maximal temperature the surface of the chip temperature is allowed to reach.\n\nNote: ",
        t_junction: "(Junction Temperature) refers to the maximal temperature the internals of the chip (and transistors) are allowed to operate under.\n\nNote: ",
        t_notice: "dictates the performance requirements for the cooling devices and ambient requirements required for this chip."
    },
    power: {
        clock_gating: "Clock Gating is a form of power conservation technology which disables clock signals to idle circuitries to minimise unnecessary dynamic power consumption.",
        frequency_scaling: "Dynamic Frequency Scaling is the ability for the processor to adjust its clock frequency based on real-time load and power requirements.",
        voltage_scaling: "Adaptive Voltage Scaling is the ability for the processor to adjust its core voltage (within rated range) based on current clock frequency and load."
    },
    tech: {
        isa: {
            info: "Instruction Set refers to the baseline set of commands and instructions that the processor can understand and execute.",
            extensions: "ISA Extensions refer to the additional instructions implemented on top of the baseline instruction set.",
            LBT: "Loongson Binary Translation\n\nA set of extended instructions to improve execution performance of foreign-architecture code. The LBT extension implements non-privileged and privileged instructions.",
            LVZ: "Loongson VirtualiZation\n\nA set of extended instructions to implement hardware acceleration for system-level virtualization. The LVZ extension implements mostly privileged instructions, useful for controlling status registers, as well as implementing additional functions for exceptions, interrupts, and storage management.",
            LSX: "Loongson SIMD eXtension\n\nA set of extended instructions to implement single-instruction, multiple-data. The LSX extension is implemented on special registers to accelerate computational intensive tasks. The LSX extension operates at 128-bit vector width.",
            LASX: "Loongson Advanced SIMD eXtension\n\nSimilar to LSX, but operates at 256-bit vector width."
        }
    }
}