type BiweeklyLinkInfo = {
  slides?: string
  bvid?: string
}

const biweeklyLinkInfo = {
  [1]: { slides: "coh66fsMG3lG", bvid: "BV1yvrKYBE9k" },
  [2]: { slides: "cgJyg8x8yfcU" },
  [3]: { slides: "chg109JA5kGw", bvid: "BV1TMrNYMEXL" },
  [4]: { slides: "cplKxlMpWWdJ", bvid: "BV1g3wzedEzG" },
  [5]: { slides: "csRB8SRQ0vVX", bvid: "BV1KJAVeEEy4" },
  [6]: { slides: "ciib1cwuGm4x", bvid: "BV1m39bYiExY" },
  [7]: { slides: "cu5YcynNNwFh", bvid: "BV1UqQhYzEnv" },
  [8]: { slides: "cqsR8Ut5qAO1", bvid: "BV1xWZqYNEvb" },
  [9]: { slides: "cs7xRY67jYTd", bvid: "BV1d9d6YWEKw" },
  [10]: { slides: "coNmT7su7YKI", bvid: "BV1cnjwzvEB9" },
  [11]: { slides: "chuz0m3UnC0r", bvid: "BV1Q4EMzrEdt" },
  [12]: { slides: "cpPeXkjn45HE", bvid: "BV13jjgzgEqE" },
  [13]: { slides: "cvNjbrvhokDK", bvid: "BV1XdTXzgEX1" },
  [14]: { slides: "cscztXyg0mgA", bvid: "BV1SmNRzqEdV" },
  [15]: { slides: "cu5nk64ZLAsC", bvid: "BV17bGuzBE4x" },
  [16]: { slides: "ceDV2Ka5Yg7O", bvid: "BV1Dpb1zKEJy" },
  [17]: { slides: "coPdArr3JG3Q", bvid: "BV1mDtMztESS" },
  [18]: { slides: "cbwWxnmGjXdb", bvid: "BV1eYeFz8E6c" },
  [19]: { slides: "ciGH8lFsd4wu", bvid: "BV1YUhkzBEvP" },
  [20]: { slides: "csHEMvBSvp74", bvid: "BV1PfHZzyEL5" },
  [21]: { slides: "cgJrHy6VhDcg", bvid: "BV16bn9zREsP" },
  [22]: { slides: "ckWohaHccijB", bvid: "BV16J4CzkEev" },
  [23]: { slides: "cvDcDShgrCDs", bvid: "BV1nesUzDE3o" },
  [24]: { slides: "cvLkhLGCkEgF", bvid: "BV1vxCcBiEAK" },
  [25]: { slides: "cfAPKbmKNidG", bvid: "BV1o9UTBuEX2" },
  [26]: { slides: "ctfV9YLds9og", bvid: "BV1NY2fBZEqc" },
  [27]: { slides: "cdBJQLY01QZU", bvid: "BV1JaBHBsEJ9" },
  [28]: { slides: "cvOZnsjUeuxC", bvid: "BV195iiBjEPZ" },
}

export function getBiweeklySlideLink(index: number): string | null {
  // www.kdocs.cn is the canonical domain for WPS Docs links
  // bare kdocs.cn links will just 302 to www.kdocs.cn so save our users a
  // round-trip
  const kdocsID = biweeklyLinkInfo[index]?.slides
  return kdocsID ? `https://kdocs.cn/l/${kdocsID}` : null
}

export function getBiweeklyBilibiliLink(index: number): string | null {
  const bvid = biweeklyLinkInfo[index]?.bvid
  return bvid ? `https://www.bilibili.com/video/${bvid}/` : null
}
