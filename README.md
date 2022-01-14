# buy-me-a-beer
Buy me a beer experiment

## Steps

Create a PWA. It must pass in Lighthouse audit.

You may use [PWABuilder](https://www.pwabuilder.com/) to tune your manifest.

Utils: https://realfavicongenerator.net/, https://maskable.app/.

Publish it to the final URL.

Install [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap/tree/main/packages/cli). Use it to create and build an TWA Android project, based on the manifest.

Validation: 
```
bubblewrap validate --url https://ermogenes.github.io/buy-me-a-beer/
```

Result:
```
,-----.        ,--.  ,--.  ,--.
|  |) /_,--.,--|  |-.|  |-.|  |,---.,--.   ,--,--.--.,--,--.,---.
|  .-.  |  ||  | .-. | .-. |  | .-. |  |.'.|  |  .--' ,-.  | .-. |
|  '--' '  ''  | `-' | `-' |  \   --|   .'.   |  |  \ '-'  | '-' '
`------' `----' `---' `---'`--'`----'--'   '--`--'   `--`--|  |-'
                                                           `--'
validate Validating URL:  https://ermogenes.github.io/buy-me-a-beer/
validate
validate Check the full PageSpeed Insights report at:
validate - https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fermogenes.github.io%2Fbuy-me-a-beer%2F
validate
validate
validate Quality Criteria scores
validate Lighthouse Performance score: ................... 94
validate Lighthouse PWA check: ........................... YES
validate
validate Web Vitals
validate Largest Contentful Paint (LCP) .................. 2.5 s
validate Maximum Potential First Input Delay (Max FID) ... 16 ms
validate Cumulative Layout Shift (CLS) ................... 0.03
validate
validate Other scores
validate Lighthouse Accessibility score................... 100
validate
validate Summary
validate Overall result: ................................. PASS
```

Build:

```
bubblewrap build
```

You now have an Android Project, with you local credentials (`android.keystore`), and your releases (`.apk` and `.aab`).

You may not versioning this files. You can regenerate anytime.

Create a [Google Developer Account](https://play.google.com/intl/pt-BR/console/about/) ($25, one time).

Create a project, configure it for internal testing, and upload your `.aab`. Wait for aproval (3-4 days).

Now, your project is available from the URL and from the store.

Create your Digital Asset Links file and upload to `.well-known/assetlinks.json`, to assert the link between site and app. You can use [this tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool) to create it ([_it's safe_](https://web.dev/using-a-pwa-in-your-android-app/)).
