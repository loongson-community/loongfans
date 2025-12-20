export default {
    basic: {
        series: "产品系列指当前产品所在的系列",
        market: "市场定位指当前产品所适合的定位，不代表最终实际用途"
    },
    cpu: {
        voltage: "典型电压指处理器在标定频率下，稳定运行所需的常规工作电压。",
        tpc: `典型功耗指处理器在正常工作状态下的平均功耗。

        请注意：典型功耗不代表处理器的实际功耗。`,
        tdp: `热设计功耗指处理器在极限负载下产生的最大热量值。

        请注意：热设计功耗不代表处理器的实际功耗。`
    },
    memory: {
        ecc: `ECC 内存是一种可检测并纠正常见内部损坏数据的系统内存，用于提升系统的稳定性和可靠性。每存储 64 位数据，会额外占用 8 位来存储校验码。当数据被读取时，系统会通过校验码自动检测单位数据错误并立即纠正，防止错误数据被处理器使用。
        
        请注意：ECC 内存的支持与主板相关，需联系相关厂商询问是否支持`
    },
    exp: {
        io_name: "I/O 通信接口是处理器与外部设备进行数据交换的总线接口。包含 HyperTransport 总线和 PCI Express 控制器",
        io_rev: `I/O 通信修订版是处理器支持的 I/O 通信接口所支持的版本。
        
        请注意：对于 PCI Express 4.0 的支持取决于主板和对应固件的支持，若有疑问请联系相关厂商`,
        d2d: "片间互联是指",
        d2d_name: `片间互联技术指处理器所支持的互联技术名称。

        龙链 (Loongson Coherent Link)：是由龙芯自研的片间互联技术，相比 HyperTransport 3.0，延迟更低，带宽更高
        HyperTransport：是一种高速、低延迟、点对点的串行/并行总线技术，主要用于连接计算机内部的处理器、芯片组、内存控制器和 I/O 设备。`
    },
    package: {
        temperature: "壳温范围指处理器外壳表面被允许达到的温度区间。",
        t_case: " (Case Temperature) 是指处理器外壳表面被允许达到的最高温度。\n\n请注意：",
        t_junction: "(Junction Temperature) 是指处理器芯片内部、晶体管单元的最高工作温度。\n\n请注意：",
        t_notice: "温度不代表 CPU 运行时的实际温度，取决于所使用散热器的性能。"
    },
    power: {
        shutdown_of_the_clocks: "",
        frequency_scaling: "",
        voltage_scaling: ""
    },
    technologies: {
        set: "",
        set_extensions: ""
    }
}