import { getPageInsights } from "../index"

const _ = console.log
const PASS = `\x1b[42m[PASS]\x1b[0m`
const FAIL = `\x1b[41m[FAIL]\x1b[0m`

_("")
;(async () => {
  const TEST_CASE = "Test fake page insights"
  let pass = true

  try {
    const { pageInsights } = await getPageInsights(1582722098684919)
    _("[getPageInsights]", pageInsights)
    if (!pageInsights) return (pass = false)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`${PASS} ${TEST_CASE}`) : _(`${FAIL} ${TEST_CASE}`)
  }
})()
