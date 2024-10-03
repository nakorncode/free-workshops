function isJson(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export function withErrorHandling(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args)
    } catch (error) {
      console.error(error)
      return new Response(
        JSON.stringify({
          message:
            error instanceof Error
              ? isJson(error.message)
                ? JSON.parse(error.message)
                : error.message
              : 'Unexpected error',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }
}
