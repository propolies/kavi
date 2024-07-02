function createRequest(url: URL, data: unknown = null) {
  return new Request(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export {
  createRequest
}