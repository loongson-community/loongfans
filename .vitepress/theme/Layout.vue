<template>
    <!-- 必须包裹容器 -->
    <div class="vp-doc">
        <Content />
    </div>
</template>

<style type="text/css">
html,
body {
    height: 100%;
    margin: 0;
}

.body_content {
    display: block;
    clear: both;
    width: auto;
    max-width: 1200px;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
}

@media (max-width: 1280px) {
    .body_content {
        width: 100%;
        max-width: 100%;
        padding: 0px 30px;
    }
}
</style>