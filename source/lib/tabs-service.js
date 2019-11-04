import { isChrome } from './util'

export const emptyTabUrls = isChrome()
  ? ['chrome://newtab/', 'chrome-search://local-ntp/local-ntp.html']
  : []

export async function createTab(url) {
  return browser.tabs.create({ url })
}

export async function updateTab(tabId, options) {
  return browser.tabs.update(tabId, options)
}

export async function queryTabs(urlList) {
  const currentWindow = true
  return browser.tabs.query({ currentWindow, url: urlList })
}

export async function openTab(url) {
  const matchingUrls = [url]

  const existingTabs = await queryTabs(matchingUrls)

  if (existingTabs && existingTabs.length > 0) {
    return updateTab(existingTabs[0].id, { url, active: true })
  }

  const emptyTabs = await queryTabs(emptyTabUrls)

  if (emptyTabs && emptyTabs.length > 0) {
    return updateTab(emptyTabs[0].id, { url, active: true })
  }

  await createTab(url)
}
