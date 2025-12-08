<template>
  <div class="child_footer_info">
    <div class="child_footer_link">
      <Button
        :label="t('language')" unstyled class="language-button" @click="(e) => op.toggle(e)">
        <template #icon>
          <IconTranslate />
        </template>
      </Button>
      <Popover ref="op">
        <div class="language-popover-content">
          <Button
            v-for="lang in Object.keys(LANGUAGE_DISPLAY_NAMES)"
            :label="LANGUAGE_DISPLAY_NAMES[lang]"
            variant="text"
            @click="() => handleLanguageChange(lang)"
          />
        </div>
      </Popover>
      <span>|</span>
      <a href="https://github.com/loongson-community/loongfans" target="_blank">{{ t('siteSource') }}</a>
      <span>|</span>
      <a href="https://github.com/loongson-community/loongfans/issues/new" target="_blank">{{ t('reportIssue') }}</a>
      <span>|</span>
      <a :href="`${basePath}/pages/about`">{{ t('aboutCommunity') }}</a>
    </div>

    <div class="copyright_info">
      <span>{{ t('copyright') }} &copy; 2024-{{ copyrightYear }}</span><span>{{ t('communityName') }}</span>
      <a href="https://beian.miit.gov.cn" target="_blank">鄂ICP备2022017735号-12</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useData, useRouter } from 'vitepress';
import { useI18n } from 'vue-i18n';
import { Button, Popover } from "primevue";
import IconTranslate from '~icons/material-symbols/translate'
import { getLocalePrefix, getLocaleUrl, setStoredLanguage, LANGUAGE_DISPLAY_NAMES } from '../.vitepress/utils/language';

const { t } = useI18n();
const { localeIndex, lang } = useData();
const router = useRouter();
const basePath = computed(() => getLocalePrefix(localeIndex.value));
const op = ref();

let year = new Date().getFullYear();
const copyrightYear = ref(year);

function handleLanguageChange(language) {
  op.value.hide()
  if(language !== lang.value)
    setStoredLanguage(language)
    router.go(getLocaleUrl(language, router.route.path))
}
</script>

<style scoped>
.child_footer_info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  clear: both;
  width: 100%;
  max-width: var(--content-max-width);
  height: auto;
  line-height: 30px;
  overflow: hidden;
  margin: 0px auto;
  margin-top: 60px;
  padding-bottom: 10px;
}

.child_footer_info > * {
  margin-inline: auto;
}

.child_footer_link,
.copyright_info {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: auto;
  line-height: 30px;
  overflow: hidden;
  font-size: 16px;
  color: #000000;
}

.copyright_info {
  text-align: center;
}

.language-button,
.child_footer_info a {
  font-size: 16px;
  color: #000000;
  text-decoration: none;
}

.child_footer_info a:hover {
  color: #e60013;
}

.language-button {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.language-button svg {
  margin-right: 0.5em;
}

.language-button:hover {
  color: #e60013;
}

.language-popover-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.p-popover-content button {
  display: block;
  color: unset;
}

/*响应式处理-开始*/
@media (max-width: var(--content-max-width)) {
  .child_footer_info {
    width: 100%;
    max-width: 100%;
    padding-left: 30px;
    padding-right: 30px;
  }
}
@media (max-width: 850px) {
  .child_footer_info {
    flex-direction: column;
    justify-content: center;
    line-height: 30px;
    font-size: 14px;
    gap: 0;
    padding: 10px;
  }

  .language-button,
  .child_footer_info a {
    font-size: 14px;
  }
  .copyright_info {
    flex-direction: column;
    justify-content: center;
    gap: 0;
    line-height: 30px;
    font-size: 14px;
  }
}
</style>
