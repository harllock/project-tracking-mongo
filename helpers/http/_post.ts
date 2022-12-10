import { root } from "../root"

export default async (url: string, data: {}) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) throw new Error("network problem, check fetch response")

    const result = await res.json()
    return result
  } catch (error: any) {
    root.logError({
      section: "root/http",
      summary: "could not post data to the api",
      where: "helpers/http/_post.js",
      stack: error,
    })
  }
}
