type BiweeklyLinkInfo = {
  slides?: string
}

const biweeklyLinkInfo = {
  [1]: { slides: "coh66fsMG3lG" },
  [2]: { slides: "cgJyg8x8yfcU" },
  [3]: { slides: "chg109JA5kGw" },
  [4]: { slides: "cplKxlMpWWdJ" },
  [5]: { slides: "csRB8SRQ0vVX" },
  [6]: { slides: "ciib1cwuGm4x" },
  [7]: { slides: "cu5YcynNNwFh" },
  [8]: { slides: "cqsR8Ut5qAO1" },
  [9]: { slides: "cs7xRY67jYTd" },
  [10]: { slides: "coNmT7su7YKI" },
  [11]: { slides: "chuz0m3UnC0r" },
  [12]: { slides: "cpPeXkjn45HE" },
  [13]: { slides: "cvNjbrvhokDK" },
  [14]: { slides: "cscztXyg0mgA" },
  [15]: { slides: "cu5nk64ZLAsC" },
  [16]: { slides: "ceDV2Ka5Yg7O" },
  [17]: { slides: "coPdArr3JG3Q" },
  [18]: { slides: "cbwWxnmGjXdb" },
  [19]: { slides: "ciGH8lFsd4wu" },
  [20]: { slides: "csHEMvBSvp74" },
  [21]: { slides: "cgJrHy6VhDcg" },
  [22]: { slides: "ckWohaHccijB" },
  [23]: { slides: "cvDcDShgrCDs" },
  [24]: { slides: "cvLkhLGCkEgF" },
  [25]: { slides: "cfAPKbmKNidG" },
  [26]: { slides: "ctfV9YLds9og" },
  [27]: { slides: "cdBJQLY01QZU" },
  [28]: { slides: "cvOZnsjUeuxC" },
}

export function getBiweeklySlideLink(index: number): string | null {
  // www.kdocs.cn is the canonical domain for WPS Docs links
  // bare kdocs.cn links will just 302 to www.kdocs.cn so save our users a
  // round-trip
  const kdocsID = biweeklyLinkInfo[index]?.slides
  return kdocsID ? `https://kdocs.cn/l/${kdocsID}` : null
}
